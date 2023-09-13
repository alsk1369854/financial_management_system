import React, { useEffect, useState } from 'react'
import * as CustomerService from '../../../services/CustomerService'
import { CustomerTableDataType, UseCustomerDataSourceInterface } from '../interfaces';
import { getCustomerTotalArrears } from '../utils';
import { ErrorResponseInterface } from '../../../interfaces/ErrorResponseInterface';

export const useCustomerDataSource = (): UseCustomerDataSourceInterface => {
    const [customerDataSource, setCustomerDataSource] = useState<CustomerTableDataType[]>([]);
    const [errorOfCustomerDataSource, setErrorOfCustomerDataSource] = useState<ErrorResponseInterface | null>(null);
    const [isLoadingCustomerDataSource, setIsLoadingCustomerDataSource] = useState<boolean>(false);

    const getCustomerDataSource = async () => {
        setIsLoadingCustomerDataSource(true);
        try {
            const { data: customerList } = await CustomerService.getAllCustomer()
            const newTableDataSource: CustomerTableDataType[] = customerList.map((customer) => {
                return {
                    ...customer,
                    totalArrears: getCustomerTotalArrears(customer),
                }
            })
            setCustomerDataSource(newTableDataSource);
        } catch (error: any) {
            setErrorOfCustomerDataSource(error.response);
        } finally {
            setIsLoadingCustomerDataSource(false);
        }
    }

    useEffect(() => {
        getCustomerDataSource();
    }, [])

    const reloadCustomerDataSource = () => {
        getCustomerDataSource()
    }


    return { customerDataSource, setCustomerDataSource, isLoadingCustomerDataSource, errorOfCustomerDataSource, reloadCustomerDataSource }
}