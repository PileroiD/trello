import { ITaskResponse } from "@/types/task.types";

export const useAddIndexes = (items: ITaskResponse[]) => {
    return {
        data: items.map((item, index) => {
            return { ...item, index };
        }),
    };
};
