import React, { FC, useEffect, useState } from 'react';
import { HeaderLayout } from '../layout/HeaderLayout';
import { CustomerFinancialTable } from '../../components/CustomerFinancialTable';
import { ConfigProvider, Row } from 'antd';
import functionCaller from 'function-caller/dist/FunctionCaller';

export const FC_KEY_CUSTOMERFINANCIALPAGE_setThemeData = 'FC_KEY_CUSTOMERFINANCIALPAGE_setThemeData';

type ThemeData = {
	boxShadow: string;
	colorText: string; // 文字顏色
	colorTextPlaceholder: string; // 輸入框預設文字顏色
	colorFillAlter: string; // 表頭遮罩顏色
	colorFillSecondary: string; // 表頭遮罩按下後顏色
	colorBorder: string; // 外框顏色
	colorBgContainer: string; // 整體背景顏色
	colorBgElevated: string; // 浮動視窗顏色
};

const lightThemeData: ThemeData = {
	boxShadow: 'none',
	colorText: 'black',
	colorTextPlaceholder: 'rgba(0, 0, 0, 0.25)',
	colorFillAlter: 'rgba(0, 0, 0, 0.3)',
	colorFillSecondary: 'rgba(0, 0, 0, 0.3)',
	colorBorder: 'rgb(0, 21, 41)',
	colorBgContainer: 'white',
	colorBgElevated: 'white',
};

const darkThemeData: ThemeData = {
	boxShadow: 'none',
	colorText: 'rgba(255, 255, 255, 0.85)',
	colorTextPlaceholder: 'rgba(255, 255, 255, 0.35)',
	colorFillAlter: 'rgba(0, 0, 0, 0.4)',
	colorFillSecondary: 'rgba(0, 0, 0, 0.4)',
	colorBorder: 'rgba(255, 255, 255, 0.85)',
	colorBgContainer: '#3b3e45',
	colorBgElevated: '#3b3e45',
};

export const CustomerFinancialPage: FC = () => {
	const [themeData, setThemeData] = useState<ThemeData>(lightThemeData);

	const switchOnChange = () => {
		setThemeData((prevThemeData) => (prevThemeData === lightThemeData ? darkThemeData : lightThemeData));
		if (themeData === darkThemeData) {
			document.documentElement.style.setProperty('--body-bg-color', 'rgb(255,255,255)');
		} else {
			document.documentElement.style.setProperty('--body-bg-color', 'rgb(0,0,0)');
		}
	};

	useEffect(() => {
		functionCaller.set(FC_KEY_CUSTOMERFINANCIALPAGE_setThemeData, switchOnChange);
		return () => {
			functionCaller.remove(FC_KEY_CUSTOMERFINANCIALPAGE_setThemeData);
		};
	});

	return (
		<div>
			<HeaderLayout />
			<Row
				justify="center"
				align="middle"
				style={{
					padding: '20px 20px',
				}}
			>
				<ConfigProvider theme={{ token: themeData }}>
					<CustomerFinancialTable />
				</ConfigProvider>
			</Row>
		</div>
	);
};
