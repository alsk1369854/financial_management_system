import React, { useRef } from 'react'
import { CustomerTableDataType } from '../interfaces';
import { ColumnsType } from 'antd/es/table';
import { InputRef, theme } from 'antd';
import { ThemeStyleDataInterface } from '../../../interfaces/ThemeStyleInterface';
import { getTableColumnSearchPropsFunction } from '../../../utils/AntDesignUtil';
import { EditOutlined, DeleteOutlined, AppstoreAddOutlined } from '@ant-design/icons';


export const getCustomerTableColumnsConfig = (
    editCustomer:(customerTableData :CustomerTableDataType)=>void,
    deleteCustomer:(customerTableData :CustomerTableDataType)=>void,
    addNewCustomerProject:(customerTableData :CustomerTableDataType)=>void,
):ColumnsType<CustomerTableDataType>  =>{
	const themeStyleData = theme.useToken().token as unknown as ThemeStyleDataInterface;
	const columnSearchInputRef = useRef<InputRef>(null);
    const tableColumnSearchProps = getTableColumnSearchPropsFunction(columnSearchInputRef);
    return [
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

}