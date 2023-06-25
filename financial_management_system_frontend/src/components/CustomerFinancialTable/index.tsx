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
import { asyncGetCustomerTableDataSource, getCustomerTotalArrears } from './utils';
import { ProjectInterface } from '../../interfaces/ProjectInterface';
import { initCustomer, initProject, projectDateToDayjs } from '../../utils/ModelUtil';
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

const customerTableBottomRowClassName = 'customer_table_bottom_row';

export const CustomerFinancialTable: FC = () => {
	const { render } = useRender();
	const themeStyleData = theme.useToken().token as unknown as ThemeStyleDataInterface;
	const columnSearchInputRef = useRef<InputRef>(null);
	const { dataSource: tableDataSource, setDataSource: setTableDataSource, isLoading, error, reload } = useCustomerDataSource();

	const tableColumnSearchProps = getTableColumnSearchPropsFunction(columnSearchInputRef);

	const successMassage = (context: string) => {
		FunctionCaller.call(FC_KEY_successMassage, context);
	};
	const errorMassage = (context: string) => {
		FunctionCaller.call(FC_KEY_errorMassage, context);
	};

	// const [tableDataSource, setTableDataSource] = useState<CustomerTableDataType[]>(dataSource);
	const [editingCustomerInfo, setEditingCustomerInfo] = useState<CustomerInterface | undefined>();
	const [editingCustomerInfoFormType, setEditingCustomerInfoFromType] = useState<EditingCustomerInfoFormType | undefined>();
	const [editingProjectInfoFormType, setEditingProjectInfoFormType] = useState<EditingProjectInfoFormType | undefined>();
	const [editingProjectInfo, setEditingProjectInfo] = useState<ProjectInterface | undefined>();

	useEffect(() => {
		// if (count === 0) {
		// 	updateCustomerTableDataSource();
		// }
		if (error !== null) {
			errorMassage("customer data loading error!");
		}
		window.addEventListener('resize', render);
		return () => {
			window.removeEventListener('resize', render);
		};
	});

	// const updateCustomerTableDataSource = () => {
	// 	setTableLoading(true);
	// 	asyncGetCustomerTableDataSource((tableDataSource) => {
	// 		setTableDataSource(tableDataSource);
	// 		setTableLoading(false);
	// 		setCount(count + 1);
	// 	});
	// };

	const downloadExcelReport = () => {
		let downloadExcelDataset: DownloadExcelDatasetInterface = {
			ID: [],
			客戶名稱: [],
			統一編號: [],
			電話: [],
			傳真: [],
			欠款總額: [],
			專案數量: [],
			描述: [],
		};
		tableDataSource.forEach((tableData) => {
			const { id, name, unifiedBusinessNumber, telephoneNumber, faxNumber, description, totalArrears, projectList } = tableData;
			downloadExcelDataset['ID'].push('' + id);
			downloadExcelDataset['客戶名稱'].push(name);
			downloadExcelDataset['統一編號'].push(unifiedBusinessNumber);
			downloadExcelDataset['電話'].push(telephoneNumber);
			downloadExcelDataset['傳真'].push(faxNumber);
			downloadExcelDataset['欠款總額'].push(`$${totalArrears}`.replace(/\B(?=(\d{3})+(?!\d))/g, ','));
			downloadExcelDataset['專案數量'].push('' + projectList.length);
			downloadExcelDataset['描述'].push(description);
		});
		downloadExcel(downloadExcelDataset, '客戶帳務清單');
	};

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
			onOk: () => {
				deleteCustomerById(customerId)
					.then(() => {
						setTableDataSource((pre) => {
							return pre.filter((item) => customer.id !== item.id);
						});
						successMassage('刪除完成');
					})
					.catch((error) => {
						const { data: errorInfo } = error.response;
						console.error(errorInfo);
						errorMassage('刪除失敗');
					});
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
			onOk: () => {
				deleteProjectById(deleteProjectId)
					.then(() => {
						// update view table
						setTableDataSource((pre) => {
							return pre.map((customerTableDataType) => {
								const { id: customerId, projectList } = customerTableDataType;
								if (customerId === deleteCustomerId) {
									customerTableDataType.projectList = projectList.filter((project) => {
										const { id: projectId } = project;
										return projectId !== deleteProjectId;
									});
									customerTableDataType.totalArrears = getCustomerTotalArrears(customerTableDataType);
								}
								return customerTableDataType;
							});
						});
						successMassage('刪除完成');
					})
					.catch((error) => {
						const { data: errorInfo } = error.response;
						console.error(errorInfo);
						errorMassage('刪除失敗');
					});
			},
		});
	};

	const editingCustomerInfoFormSubmitHandler = (formType: EditingCustomerInfoFormType, newCustomerInfo: CustomerInterface) => {
		// const newCustomerInfo = editingCustomerInfoFormValues; // error test
		let requestFunc: Promise<AxiosResponse<CustomerInterface, any>> = new Promise((resolve, reject) => { });
		switch (formType) {
			case EditingCustomerInfoFormType.create:
				requestFunc = addCustomer(newCustomerInfo);
				requestFunc.then((response) => {
					const { data } = response;
					setTableDataSource((pre) => {
						return [
							...pre,
							{
								...newCustomerInfo,
								...data,
								totalArrears: 0,
							},
						];
					});
					successMassage('新增完成');
					scrollIntoView(document.querySelector(`.${customerTableBottomRowClassName}`) as HTMLElement, {
						align: {
							top: 0,
						},
					});
				});
				break;
			case EditingCustomerInfoFormType.update:
				requestFunc = updateCustomer(newCustomerInfo);
				requestFunc.then((response) => {
					const { data: newCustomerData } = response;
					setTableDataSource((pre) => {
						return pre.map((item) => {
							return newCustomerData.id === item.id
								? {
									...newCustomerData,
									totalArrears: getCustomerTotalArrears(newCustomerData),
								}
								: item;
						});
					});
					successMassage('變更完成');
				});
				break;
		}
		requestFunc
			.catch((error) => {
				const { data } = error.response;
				console.error(data);
				errorMassage('失敗');
			})
			.finally(() => {
				editingCustomerInfoFormCancelHandler();
				reload()
			});
	};

	const editingCustomerInfoFormCancelHandler = () => {
		setEditingCustomerInfo(undefined);
		setEditingCustomerInfoFromType(undefined);
	};

	const editingProjectInfoFormSubmitHandler = (formType: EditingProjectInfoFormType, newProjectInfo: ProjectInterface) => {
		let requestFunc: Promise<AxiosResponse<ProjectInterface, any>> = new Promise((resolve, reject) => { });

		const { id: newProjectCustomerId } = newProjectInfo.customer;
		switch (formType) {
			case EditingProjectInfoFormType.create:
				requestFunc = addProject(newProjectInfo);
				requestFunc.then((response) => {
					let { data: newProjectData } = response;
					newProjectData = projectDateToDayjs(newProjectData);
					setTableDataSource((customerTableDataTypeList) => {
						return customerTableDataTypeList.map((customerTableDataType) => {
							const { id } = customerTableDataType;
							if (id === newProjectCustomerId) {
								customerTableDataType.projectList.push(newProjectData);
								customerTableDataType.totalArrears = getCustomerTotalArrears(customerTableDataType);
							}
							return customerTableDataType;
						});
					});
					successMassage('成功');
				});
				break;
			case EditingProjectInfoFormType.update:
				requestFunc = updateProjectById(newProjectInfo);
				requestFunc.then((response) => {
					let { data: newProjectData } = response;
					newProjectData = projectDateToDayjs(newProjectData);
					setTableDataSource((customerTableDataTypeList) => {
						return customerTableDataTypeList.map((customerTableDataType) => {
							const { id, projectList } = customerTableDataType;
							if (id === newProjectCustomerId) {
								customerTableDataType.projectList = projectList.map((project) => {
									return newProjectData.id === project.id ? newProjectData : project;
								});
								customerTableDataType.totalArrears = getCustomerTotalArrears(customerTableDataType);
							}
							return customerTableDataType;
						});
					});
					successMassage('成功');
				});
				break;
		}
		requestFunc
			.catch((response) => {
				const { data } = response;
				console.error(data);
				errorMassage('失敗');
			})
			.finally(() => {
				editingProjectInfoFormCancelHandler();
				reload()
			});
	};

	const editingProjectInfoFormCancelHandler = () => {
		setEditingProjectInfo(undefined);
		setEditingProjectInfoFormType(undefined);
	};

	const tableColumns: ColumnsType<CustomerTableDataType> = [
		{
			title: 'ID',
			dataIndex: 'id',
			align: 'right',
			width: 58,
		},
		{
			title: '客戶名稱',
			dataIndex: 'name',
			width: 250,
			sorter: (a, b) => {
				return a.name.localeCompare(b.name, 'zh-TW');
			},
			...tableColumnSearchProps('name'),
		},
		{
			title: '統一編號',
			dataIndex: 'unifiedBusinessNumber',
			width: 105,
			...tableColumnSearchProps('unifiedBusinessNumber'),
		},
		{
			title: '電話',
			dataIndex: 'telephoneNumber',
			width: 150,
			...tableColumnSearchProps('telephoneNumber'),
		},
		{
			title: '傳真',
			dataIndex: 'faxNumber',
			width: 150,
			responsive: ['xl'],
			...tableColumnSearchProps('faxNumber'),
		},
		{
			title: '欠款總額',
			dataIndex: 'totalArrears',
			align: 'right',
			width: 110,
			sorter: (a, b) => a.totalArrears - b.totalArrears,
			render: (value: any, record: any) => {
				let textStyle = { color: themeStyleData.colorText };
				if (value < 0) {
					textStyle.color = themeStyleData.errorColor;
				}
				return <span style={textStyle}>{`$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</span>;
			},
		},
		{
			title: '描述',
			dataIndex: 'description',
			responsive: ['xl'],
		},
		{
			title: '操作',
			dataIndex: 'action',
			width: 125,
			align: 'center',
			render: (_, customerTableDataType) => {
				return (
					<>
						<EditOutlined
							style={{ color: themeStyleData.successColor, fontSize: 20 }}
							onClick={() => {
								editCustomer(customerTableDataType);
							}}
						/>
						<DeleteOutlined
							style={{ color: themeStyleData.errorColor, marginLeft: 15, fontSize: 20 }}
							onClick={() => {
								deleteCustomer(customerTableDataType);
							}}
						/>
						<AppstoreAddOutlined
							style={{ color: themeStyleData.otherColor1, marginLeft: 15, fontSize: 20 }}
							onClick={() => {
								addNewCustomerProject(customerTableDataType);
							}}
						/>
					</>
				);
			},
		},
	];

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
								downloadExcelReport();
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
						return index === tableDataSource.length - 1 ? customerTableBottomRowClassName : '';
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
					loading={isLoading}
					columns={tableColumns}
					dataSource={tableDataSource}
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
