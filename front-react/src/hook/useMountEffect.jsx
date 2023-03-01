import { useEffect } from "react";

export const useMountEffect = (callback) =>
    useEffect(() => {
        callback();
        return;
    }, [])

