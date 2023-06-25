import React, { useEffect, useState } from 'react'
import * as CustomerService from '../../../services/CustomerService'
import { CustomerTableDataType, UseCustomerDataSourceInterface } from '../interfaces';
import { getCustomerTotalArrears } from '../utils';
import { ErrorResponseInterface } from '../../../interfaces/ErrorResponseInterface';

export const useCustomerDataSource = (): UseCustomerDataSourceInterface => {
    const [dataSource, setDataSource] = useState<CustomerTableDataType[]>([]);
    const [error, setError] = useState<ErrorResponseInterface | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const getDataSource = async () => {
        setIsLoading(true);
        try {
            const { data: customerList } = await CustomerService.getAllCustomer()
            const newTableDataSource: CustomerTableDataType[] = customerList.map((customer) => {
                return {
                    ...customer,
                    totalArrears: getCustomerTotalArrears(customer),
                }
            })
            setDataSource(newTableDataSource);
        } catch (error: any) {
            setError(error);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        getDataSource();
    }, [])

    const reload = () => {
        getDataSource()
    }


    return { dataSource, setDataSource, isLoading, error, reload }
}