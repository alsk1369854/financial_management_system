import React, { useEffect, useState } from 'react'
import * as CustomerService from '../../../services/CustomerService'
import { CustomerTableDataType, UseCustomerDataSourceInterface } from '../interfaces';
import { getCustomerTotalArrears } from '../utils';
import { ErrorResponseInterface } from '../../../interfaces/ErrorResponsInterface';

export const useCustomerDataSource = (): UseCustomerDataSourceInterface => {
    const [dataSource, setDataSource] = useState<CustomerTableDataType[]>([]);
    const [error, setError] = useState<ErrorResponseInterface | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const getDataSource = () => {
        setIsLoading(true);
        CustomerService.getAllCustomer().then((response) => {
            const customerList = response.data;
            const tableDataSource: CustomerTableDataType[] = customerList.map((customer) => {
                return {
                    ...customer,
                    totalArrears: getCustomerTotalArrears(customer),
                }
            })
            setDataSource(tableDataSource);
        }).catch((error: ErrorResponseInterface) => {
            setError(error);
        }).finally(() => {
            setIsLoading(false);
        })
    }

    useEffect(() => {
        getDataSource();
    }, [])

    const reload = () => {
        getDataSource()
    }


    return { dataSource, setDataSource, isLoading, error, reload }
}