import { initCustomer } from ".";
import DateFormatConfig from "../../configs/DateFormatConfig";
import { ProjectInterface } from "../../interfaces/ProjectInterface";
import dayjs from "dayjs";

export const initProject: ProjectInterface = {
  id: null,
  name: "",
  address: "",
  startDate: null,
  endDate: null,
  invoiceCreateDate: null,
  description: "",
  customer: { ...initCustomer },
  accountingItemList: [],
};

// export const generalProject = (project: ProjectInterface): ProjectInterface => {
//   const {
//     startDate,
//     endDate,
//     invoiceCreateDate,
//     paymentDeadlineDate,
//     accountingItemList,
//   } = project;

//   if (startDate)
//     project.startDate = dayjs(startDate).format(DateFormatConfig.API_DATE_TIME);
//   if (endDate)
//     project.endDate = dayjs(endDate).format(DateFormatConfig.API_DATE_TIME);
//   if (invoiceCreateDate)
//     project.invoiceCreateDate = dayjs(invoiceCreateDate).format(
//       DateFormatConfig.API_DATE_TIME
//     );
//   if (paymentDeadlineDate)
//     project.paymentDeadlineDate = dayjs(paymentDeadlineDate).format(
//       DateFormatConfig.API_DATE_TIME
//     );

//   project.accountingItemList = accountingItemList.map((accountingItem) => {
//     if (accountingItem.id === null) {
//       accountingItem.createDateTime = dayjs().format(
//         DateFormatConfig.API_DATE_TIME
//       );
//     }
//     return accountingItem;
//   });
//   return project;
// };

// // export const projectDateToDayjs = (
// //   project: ProjectInterface
// // ): ProjectInterface => {
// //   const { startDate, endDate, invoiceCreateDate, paymentDeadlineDate } =
// //     project;
// //   if (startDate)
// //     project.startDate = dayjs(startDate, DateFormatConfig.API_DATE_TIME);
// //   if (endDate) project.endDate = dayjs(endDate, DateFormatConfig.API_DATE_TIME);
// //   if (invoiceCreateDate)
// //     project.invoiceCreateDate = dayjs(
// //       invoiceCreateDate,
// //       DateFormatConfig.API_DATE_TIME
// //     );
// //   if (paymentDeadlineDate)
// //     project.paymentDeadlineDate = dayjs(
// //       paymentDeadlineDate,
// //       DateFormatConfig.API_DATE_TIME
// //     );

// //   return project;
// // };
