import React, { FC, useEffect, useRef, useState } from 'react';
import { Button, Col, InputRef, Modal, Row, Space, Table, message, theme } from 'antd';
import { UserAddOutlined, VerticalAlignBottomOutlined, EditOutlined, DeleteOutlined, AppstoreAddOutlined } from '@ant-design/icons';
import { ColumnsType } from 'antd/es/table';
import { addCustomer, deleteCustomerById, updateCustomer } from '../../services/CustomerService';
import { getTableColumnSearchPropsFunction } from '../../utils/AntDesignUtil';
import { CustomerInterface } from '../../interfaces/CustomerInterface';
import { AxiosResponse } from 'axios';
import { EditingCustomerInfoModal } from './components/EditingCustomerInfoModal';
import { EditingCustomerInfoFormType } from './components/EditingCustomerInfoModal/enums';
import scrollIntoView from 'scroll-into-view';
import { CustomerTableDataType } from './interfaces';
import { ProjectFinancialTable } from './components/ProjectFinancialTable';
import { asyncGetCustomerTableDataSource, downloadExcelReport, getCustomerTotalArrears } from './utils';
import { ProjectInterface } from '../../interfaces/ProjectInterface';
import { initCustomer, initProject } from '../../utils/ModelUtil';
import { EditingProjectInfoModal } from './components/EditingProjectInfoModal';
import { EditingProjectInfoFormType } from './components/EditingProjectInfoModal/enums';
import { addProject, deleteProjectById, updateProjectById } from '../../services/ProjectService';
import { ProjectIdNullException } from '../../exceptions/ProjectException';
import { CustomerIdNullException } from '../../exceptions/CustomerException';
import { DownloadExcelDatasetInterface } from '../../interfaces/DownloadUtilInterface';
import { downloadExcel } from '../../utils/DownloadUtil';
import { ThemeStyleDataInterface } from '../../interfaces/ThemeStyleInterface';
import { useCustomerDataSource } from './hooks';
import FunctionCaller from 'function-caller';
import { FC_KEY_errorMassage, FC_KEY_successMassage } from '../Message';
import { useRender } from '../../hooks/Render';
import { getCustomerTableColumnsConfig } from './configs';

const customerTableBottomRowClassName = 'customer_table_bottom_row';

export const CustomerFinancialTable: FC = () => {
	const { render } = useRender();
	const themeStyleData = theme.useToken().token as unknown as ThemeStyleDataInterface;
	const { customerDataSource,isLoadingCustomerDataSource,errorOfCustomerDataSource,reloadCustomerDataSource } = useCustomerDataSource();

	const successMassage = (context: string) => {
		FunctionCaller.call(FC_KEY_successMassage, context);
	};

	// const [customerDataSource, setTableDataSource] = useState<CustomerTableDataType[]>(dataSource);
	const [editingCustomerInfo, setEditingCustomerInfo] = useState<CustomerInterface | undefined>();
	const [editingCustomerInfoFormType, setEditingCustomerInfoFromType] = useState<EditingCustomerInfoFormType | undefined>();
	const [editingProjectInfoFormType, setEditingProjectInfoFormType] = useState<EditingProjectInfoFormType | undefined>();
	const [editingProjectInfo, setEditingProjectInfo] = useState<ProjectInterface | undefined>();

	useEffect(() => {
		if (errorOfCustomerDataSource !== null) {
			FunctionCaller.call(FC_KEY_errorMassage, "customer data loading error!");
		}
		window.addEventListener('resize', render);
		return () => {
			window.removeEventListener('resize', render);
		};
	});


	const addNewCustomer = () => {
		setEditingCustomerInfoFromType(EditingCustomerInfoFormType.create);
		setEditingCustomerInfo({ ...initCustomer });
	};

	const deleteCustomer = (customer: CustomerInterface) => {
		const { id: customerId } = customer;
		if (customerId === null) throw new CustomerIdNullException();
		Modal.confirm({
			title: '確定要刪除這個 "客戶" 的所有訊息嗎?',
			okText: '確認',
			okType: 'danger',
			onOk: async () => {
				try{
					await deleteCustomerById(customerId);
					reloadCustomerDataSource();
					successMassage('刪除完成');
				}catch(error :any){
					console.error(error.response);
					FunctionCaller.call(FC_KEY_errorMassage, "刪除失敗");
				}
			},
		});
	};

	const editCustomer = (customer: CustomerInterface) => {
		const { id: customerId } = customer;
		if (customerId === null) throw new CustomerIdNullException();
		setEditingCustomerInfoFromType(EditingCustomerInfoFormType.update);
		setEditingCustomerInfo(customer);
	};

	const addNewCustomerProject = (customer: CustomerInterface) => {
		const { id: customerId } = customer;
		if (customerId === null) throw new CustomerIdNullException();
		let defaultNewProjectInfo = { ...initProject };
		defaultNewProjectInfo.customer.id = customerId;
		setEditingProjectInfo(defaultNewProjectInfo);
		setEditingProjectInfoFormType(EditingProjectInfoFormType.create);
	};

	const deleteCustomerProject = (project: ProjectInterface) => {
		const { id: deleteProjectId, customer } = project;
		const { id: deleteCustomerId } = customer;
		if (deleteProjectId === null) throw new ProjectIdNullException();
		if (deleteCustomerId === null) throw new CustomerIdNullException();
		Modal.confirm({
			title: '確定要刪除這個 "工程" 的所有訊息嗎?',
			okText: '確認',
			okType: 'danger',
			onOk: async () => {
				try{
					await deleteProjectById(deleteProjectId);
					reloadCustomerDataSource();
					successMassage('刪除完成');
				}catch(error: any){
					console.error(error.response);
					FunctionCaller.call(FC_KEY_errorMassage, "刪除失敗");
				}
			},
		});
	};

	const editingCustomerInfoFormSubmitHandler = async (formType: EditingCustomerInfoFormType, newCustomerInfo: CustomerInterface) => {
		// const newCustomerInfo = editingCustomerInfoFormValues; // error test
		try{
			switch (formType) {
				case EditingCustomerInfoFormType.create:
					await addCustomer(newCustomerInfo);
					reloadCustomerDataSource();
					successMassage('新增完成');
					scrollIntoView(document.querySelector(`.${customerTableBottomRowClassName}`) as HTMLElement, {
						align: {
							top: 0,
						},
					})
					break;
				case EditingCustomerInfoFormType.update:
					await updateCustomer(newCustomerInfo);
					reloadCustomerDataSource();
					successMassage('變更完成');
					break;
			}
		}catch(error: any){
			console.error(error.response);
			FunctionCaller.call(FC_KEY_errorMassage, "失敗");
		}finally{
			editingCustomerInfoFormCancelHandler();
		}
		
	};

	const editingCustomerInfoFormCancelHandler = () => {
		setEditingCustomerInfo(undefined);
		setEditingCustomerInfoFromType(undefined);
	};

	const editingProjectInfoFormSubmitHandler = async (formType: EditingProjectInfoFormType, newProjectInfo: ProjectInterface) => {
		let requestFunc: Promise<AxiosResponse<ProjectInterface, any>> = new Promise((resolve, reject) => { });

		const { id: newProjectCustomerId } = newProjectInfo.customer;
		try {
		switch (formType) {
			case EditingProjectInfoFormType.create:
					await addProject(newProjectInfo);
					successMassage('成功');
				break;
			case EditingProjectInfoFormType.update:
				await updateProjectById(newProjectInfo);
				successMassage('成功');
				break;
		}
	}catch(error: any){
		console.error(error.response);
		FunctionCaller.call(FC_KEY_errorMassage, "失敗");
	}finally{
		reloadCustomerDataSource();
	}
		requestFunc
			.catch((response) => {
				const { data } = response;
				console.error(data);
				FunctionCaller.call(FC_KEY_errorMassage, "失敗");
			})
			.finally(() => {
				editingProjectInfoFormCancelHandler();
				reloadCustomerDataSource()
			});
	};

	const editingProjectInfoFormCancelHandler = () => {
		setEditingProjectInfo(undefined);
		setEditingProjectInfoFormType(undefined);
	};

	const customerTableColumnsConfig =  getCustomerTableColumnsConfig(
		addCustomer,
		deleteCustomer,
		addNewCustomerProject
	)

	return (
		<div
			style={{
				width: '100%',
			}}
		>
			<Row
				justify="space-between"
				style={{
					padding: '10px 20px',
				}}
			>
				<Col>
					<span
						style={{
							fontSize: 25,
							fontWeight: 'bold',
							color: themeStyleData.colorText,
						}}
					>
						客戶帳務清單
					</span>
				</Col>
				<Col>
					<Space>
						<Button
							style={{ backgroundColor: themeStyleData.successColor }}
							type="primary"
							size="large"
							icon={<UserAddOutlined />}
							onClick={() => {
								addNewCustomer();
							}}
						>
							新增客戶訊息
						</Button>
						<Button
							style={{ backgroundColor: themeStyleData.otherColor1 }}
							type="primary"
							size="large"
							icon={<VerticalAlignBottomOutlined />}
							onClick={() => {
								downloadExcelReport(customerDataSource);
							}}
						>
							下載報表
						</Button>
					</Space>
				</Col>
			</Row>
			<Row
				style={{
					width: '100%',
				}}
			>
				<Table
					rowClassName={(record, index) => {
						return index === customerDataSource.length - 1 ? customerTableBottomRowClassName : '';
					}}
					style={{ width: '100%' }}
					expandable={{
						expandedRowRender: (CustomerTableDataType) => {
							const { projectList, id: customerId } = CustomerTableDataType;
							return customerId ? (
								<ProjectFinancialTable
									customerId={customerId}
									projectList={[...projectList]}
									deleteCustomerProject={deleteCustomerProject}
									setEditingProjectInfo={setEditingProjectInfo}
									setEditingProjectInfoFormType={setEditingProjectInfoFormType}
								/>
							) : (
								<></>
							);
						},
						rowExpandable: (record) => record.name !== 'Not Expandable',
					}}
					scroll={{ y: window.innerHeight - 165 }}
					bordered
					rowKey="id"
					pagination={false}
					loading={isLoadingCustomerDataSource}
					columns={customerTableColumnsConfig}
					dataSource={customerDataSource}
				/>
			</Row>
			{editingCustomerInfoFormType ? (
				<EditingCustomerInfoModal
					formType={editingCustomerInfoFormType}
					defaultFormValues={editingCustomerInfo}
					submitCallbackFunc={editingCustomerInfoFormSubmitHandler}
					cancelCallbackFunc={editingCustomerInfoFormCancelHandler}
				/>
			) : (
				<></>
			)}
			{editingProjectInfoFormType ? (
				<EditingProjectInfoModal
					formType={editingProjectInfoFormType}
					defaultProjectInfo={editingProjectInfo}
					submitCallbackFunc={editingProjectInfoFormSubmitHandler}
					cancelCallbackFunc={editingProjectInfoFormCancelHandler}
				/>
			) : (
				<></>
			)}
		</div>
	);
};
