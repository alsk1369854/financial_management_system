import React, { useState, useEffect } from "react";
import { ThemeStyleDataInterface, UseThemeStyleInterface } from "../../interfaces/ThemeStyleInterface";
import { darkThemeStyleData, lightThemeStyleData } from "../../configs/ThemeStyleConfig";
import { ThemeEnum } from "../../enums/ThemeStyle";



export const useThemeStyle = (
    defaultTheme: ThemeEnum = ThemeEnum.dark
): UseThemeStyleInterface => {

    const [themeStyleData, setThemeStyleData] = useState<ThemeStyleDataInterface>(darkThemeStyleData);
    const [theme, setTheme] = useState<ThemeEnum>(defaultTheme);


    const setGlobalCssStyle = (themeStyleData: ThemeStyleDataInterface) => {
        const html = document.documentElement;
        html.style.setProperty('--body-bg-color', themeStyleData.bodyBgColor);
        html.style.setProperty('--scroll-bg-color', themeStyleData.scrollBgColor);
    }

    const setThemeStyle = (theme: ThemeEnum) => {
        let newThemeStyleData = themeStyleData
        switch (theme) {
            case ThemeEnum.light:
                newThemeStyleData = lightThemeStyleData;
                break;
            case ThemeEnum.dark:
                newThemeStyleData = darkThemeStyleData;
                break;
        }
        setTheme(theme);
        setThemeStyleData(newThemeStyleData);
        setGlobalCssStyle(newThemeStyleData);
    }

    useEffect(() => {
        setThemeStyle(theme);
    })

    return { themeStyleData, setThemeStyle, theme }
}