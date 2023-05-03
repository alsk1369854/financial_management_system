import { SizeType } from "antd/es/config-provider/SizeContext";

export default class AntDesignConfig {
    static readonly ConfigProviderLocal = require('antd/locale/zh_TW');
    static readonly DatePickerLocal = require('antd/es/date-picker/locale/zh_CN');

    static readonly InputSize:SizeType = "large";
    static readonly DatePickerSize: SizeType = "large";
}