import { useState } from "react";


export interface UseRenderInterface {
    render: () => void;
}

export const useRender = (): UseRenderInterface => {
    const [count, setCount] = useState<number>(0);

    const render = () => {
        setCount((pre) => pre + 1);
    }

    return { render }
}