import React, { FC, useRef } from 'react'
import { InputRef, theme } from 'antd';
import { getTableColumnSearchPropsFunction } from '../../../../utils/AntDesignUtil';
import { ProjectInterface } from '../../../../interfaces/ProjectInterface';
import Table, { ColumnsType } from 'antd/es/table';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import DateFormatConfig from '../../../../configs/DateFormatConfig';
import { compareDate } from '../../../../utils/SortUtil';
import { getProjectTableDataSource } from './utils';
import { ProjectTableDataType } from './interfaces';
import { EditingProjectInfoFormType } from '../EditingProjectInfoModal/enums';
import dayjs from 'dayjs';
import { ThemeStyleDataInterface } from '../../../../interfaces/ThemeStyleInterface';
import { getProjectTableColumnsConfig } from './configs';


export enum EditingProjectFormType {
    update = "更新",
    create = "創建",
}

interface ProjectFinancialTablePropsInterface {
    projectList: ProjectInterface[],
    customerId: number,
    deleteCustomerProject: (project: ProjectInterface) => void,
    setEditingProjectInfo: (project: ProjectInterface) => void,
    setEditingProjectInfoFormType: (editingProjectInfoFormType: EditingProjectInfoFormType) => void
}

export const ProjectFinancialTable: FC<ProjectFinancialTablePropsInterface> = ({
    customerId,
    projectList,
    deleteCustomerProject,
    setEditingProjectInfo,
    setEditingProjectInfoFormType
}) => {

    const themeStyleData = theme.useToken().token as unknown as ThemeStyleDataInterface;

    const searchInput = useRef<InputRef>(null);
    const tableColumnSearchProps = getTableColumnSearchPropsFunction(searchInput);

    // const [count, setCount] = useState<number>(0);
    // const render = () => setCount(count + 1)

    const projectTableDataSource = getProjectTableDataSource(projectList, customerId);

    const editProject = (project: ProjectTableDataType) => {
        setEditingProjectInfoFormType(EditingProjectInfoFormType.update);
        setEditingProjectInfo(project);
    }

    const projectTableColumnsConfig = getProjectTableColumnsConfig(
        editProject,
        deleteCustomerProject
    )

    return (
        <>
            <Table
                style={{ borderColor: themeStyleData.colorBorder }}
                bordered
                rowKey="id"
                pagination={false}
                columns={projectTableColumnsConfig}
                dataSource={projectTableDataSource}
            />
        </>
    )
}
