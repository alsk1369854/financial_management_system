import moment from "moment";
import { initCustomer } from ".";
import DateFormatConfig from "../../configs/DateFormatConfig";
import { ProjectInterface } from "../../interfaces/ProjectInterface";

export const initProject: ProjectInterface = {
    id: null,
    name: "",
    address: "",
    startDate: "",
    endDate: "",
    invoiceCreateDate: "",
    paymentDeadlineDate: "",
    description: "",
    customer: { ...initCustomer },
    accountingItemList: []
}

export const generalProject = (
    project: ProjectInterface
): ProjectInterface => {
    const { startDate, endDate, invoiceCreateDate, paymentDeadlineDate, accountingItemList } = project;
    if (startDate !== initProject.startDate) {
        project.startDate = moment(startDate).format(DateFormatConfig.API_DATE_TIME);
    }
    if (endDate !== initProject.endDate) {
        project.endDate = moment(endDate).format(DateFormatConfig.API_DATE_TIME);
    }
    if (invoiceCreateDate !== initProject.invoiceCreateDate) {
        project.invoiceCreateDate = moment(invoiceCreateDate).format(DateFormatConfig.API_DATE_TIME);
    }
    if (paymentDeadlineDate !== initProject.paymentDeadlineDate) {
        project.paymentDeadlineDate = moment(paymentDeadlineDate).format(DateFormatConfig.API_DATE_TIME);
    }
    project.accountingItemList = accountingItemList.map((accountingItem) => {
        const { id } = accountingItem;
        if (id === null) {
            accountingItem.createDateTime = moment().format(DateFormatConfig.API_DATE_TIME);
        }
        return accountingItem;
    })
    return project;
}



export const projectDateToMomentJs = (
    project: ProjectInterface
): ProjectInterface => {
    const { startDate, endDate, invoiceCreateDate, paymentDeadlineDate } = project;
    if (startDate === null) {
        project.startDate = moment();
    } else {
        project.startDate = moment(startDate, DateFormatConfig.API_DATE_TIME);
    }
    if (endDate === null) {
        project.endDate = moment();
    } else {
        project.endDate = moment(endDate, DateFormatConfig.API_DATE_TIME);
    }
    if (invoiceCreateDate === null) {
        project.invoiceCreateDate = moment();
    } else {
        project.invoiceCreateDate = moment(invoiceCreateDate, DateFormatConfig.API_DATE_TIME);
    }
    if (paymentDeadlineDate === null) {
        project.paymentDeadlineDate = moment();
    } else {
        project.paymentDeadlineDate = moment(paymentDeadlineDate, DateFormatConfig.API_DATE_TIME);
    }
    return project;
}

