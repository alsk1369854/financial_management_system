import { ThemeEnum } from "../../enums/ThemeStyle";

export interface UseThemeStyleInterface {
    themeStyleData: ThemeStyleDataInterface,
    setThemeStyle: (theme: ThemeEnum) => void,
    theme: ThemeEnum
}

export interface ThemeStyleDataInterface {
    // custom
    bodyBgColor: string;
    scrollBgColor: string;
    errorColor: string;
    successColor: string;
    otherColor1: string;
    navTitleTextColor: string;
    navBgColor: string;

    // ant design
    boxShadow: string;
    colorIcon: string; // Icon顏色
    colorText: string; // 文字顏色
    colorTextPlaceholder: string; // 輸入框預設文字顏色
    colorFillAlter: string; // 表頭遮罩顏色
    colorFillSecondary: string; // 表頭遮罩按下後顏色
    colorBorder: string; // 外框顏色
    colorBgContainer: string; // 整體背景顏色
    colorBgElevated: string; // 浮動視窗顏色
}