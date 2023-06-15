import React from 'react'
import { Button, Input, InputRef, Space, } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { ColumnType } from 'antd/es/table';


/*
// Example
const searchInput = useRef<InputRef>(null);
const tableColumnSearchProps = getTableColumnSearchPropsFunction(searchInput);
const tableColumns: ColumnsType<ProjectTableDataType> = [
    {
        title: '工程名稱',
        dataIndex: 'name',
        ...tableColumnSearchProps('name')
    },
    ....
]
*/
export const getTableColumnSearchPropsFunction = (searchInputRef: React.RefObject<InputRef>) => {

    return (dataIndex: string): ColumnType<any> => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
            <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
                <Input
                    ref={searchInputRef}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => {
                        setSelectedKeys(e.target.value ? [e.target.value] : [])
                        confirm({ closeDropdown: false })
                    }}
                    style={{ marginBottom: 8, display: 'block' }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => {
                            clearFilters && clearFilters()
                            confirm({ closeDropdown: false })
                        }}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Reset
                    </Button>
                    <Button
                        size="small"
                        style={{ width: 90 }}
                        onClick={() => {
                            close();
                        }}
                    >
                        close
                    </Button>
                </Space>
            </div >
        ),
        filterIcon: (filtered: boolean) => (
            <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
        ),
        onFilter: (value, record) =>
            record[dataIndex]
                .toString()
                .toLowerCase()
                .includes((value as string).toLowerCase()),
        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInputRef.current?.select(), 100);
            }
        }
    });
}