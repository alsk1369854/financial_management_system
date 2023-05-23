
import { ThemeStyleDataInterface } from "../../interfaces/ThemeStyleInterface";

export const lightThemeStyleData: ThemeStyleDataInterface = {
    // custom
    bodyBgColor: "rgb(255,255,255)",
    scrollBgColor: "rgba(0,0,0,0.3)",
    errorColor: "rgb(255, 77, 79)",
    successColor: "rgb(22, 119, 255)",
    otherColor1: "rgb(42, 169, 176)",
    navTitleTextColor: "rgb(245, 245, 245)",
    navBgColor: "RGB(0, 21, 41)",

    // ant design
    boxShadow: 'none',
    colorIcon: 'rgba(0,0,0,0.70)',
    colorText: 'black',
    colorTextPlaceholder: 'rgba(0, 0, 0, 0.25)',
    colorFillAlter: 'rgba(0, 0, 0, 0.3)',
    colorFillSecondary: 'rgba(0, 0, 0, 0.3)',
    colorBorder: 'rgb(0, 21, 41)',
    colorBgContainer: 'white',
    colorBgElevated: 'white',
};

export const darkThemeStyleData: ThemeStyleDataInterface = {
    // custom
    bodyBgColor: "rgb(0,0,0)",
    scrollBgColor: "rgba(255,255,255,0.3)",
    errorColor: "rgb(255, 77, 79)",
    successColor: "rgb(22, 119, 255)",
    otherColor1: "rgb(42, 169, 176)",
    navTitleTextColor: "rgb(245, 245, 245)",
    navBgColor: "RGB(0, 21, 41)",

    // ant design
    boxShadow: 'none',
    colorIcon: 'rgba(255,255,255,0.70)',
    colorText: 'rgba(255, 255, 255, 0.85)',
    colorTextPlaceholder: 'rgba(255, 255, 255, 0.35)',
    colorFillAlter: 'rgba(0, 0, 0, 0.4)',
    colorFillSecondary: 'rgba(0, 0, 0, 0.4)',
    colorBorder: 'rgba(255, 255, 255, 0.85)',
    colorBgContainer: '#3b3e45',
    colorBgElevated: '#3b3e45',

};

export const defaultThemeStyleData = darkThemeStyleData;