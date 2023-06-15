import { message } from 'antd';
import functionCaller from 'function-caller/dist/FunctionCaller';
import React, { FC, useEffect } from 'react'

export const FC_KEY_successMassage = "FC_KEY_successMassage";
export const FC_KEY_errorMassage = "FC_KEY_errorMassage";

export const Message: FC = () => {
    const [messageApi, messageContextHolder] = message.useMessage();
    const successMassage = (context: string) => {
        messageApi.open({
            type: 'success',
            content: context,
        });
    };
    const errorMassage = (context: string) => {
        messageApi.open({
            type: 'error',
            content: context,
        });
    };

    useEffect(() => {
        functionCaller.set(FC_KEY_successMassage, successMassage);
        functionCaller.set(FC_KEY_errorMassage, errorMassage);
        return () => {
            functionCaller.remove(FC_KEY_successMassage);
            functionCaller.remove(FC_KEY_errorMassage);
        };
    })
    return (
        <>
            {messageContextHolder}
        </>
    )
}
