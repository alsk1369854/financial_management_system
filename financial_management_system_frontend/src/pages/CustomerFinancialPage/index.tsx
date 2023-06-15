import React, { FC } from 'react';
import { HeaderLayout } from '../layout/HeaderLayout';
import { CustomerFinancialTable } from '../../components/CustomerFinancialTable';
import { Row } from 'antd';


export const CustomerFinancialPage: FC = () => {

	return (
		<div>
			<HeaderLayout />
			<Row
				justify="center"
				align="middle"
			>
				<CustomerFinancialTable />
			</Row>
		</div>
	);
};
