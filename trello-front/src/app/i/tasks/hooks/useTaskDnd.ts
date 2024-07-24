import { FILTERS } from "../columns.data";
import { useUpdateTask } from "./useUpdateTask";
import { DropResult } from "@hello-pangea/dnd";
import { ITaskResponse } from "@/types/task.types";
import { taskService } from "@/services/task.service";
import { Dispatch, SetStateAction } from "react";

const setIndexes = (
    tasks: ITaskResponse[],
    draggableId: string,
    dropId: number
): ITaskResponse[] => {
    const taskIndex = tasks.findIndex((task) => task.id === draggableId);

    const [draggableTask] = tasks.splice(taskIndex, 1);

    tasks.splice(dropId, 0, draggableTask);

    return tasks.map((task, index) => ({
        ...task,
        index,
    }));
};

export function useTaskDnd() {
    const { updateTask } = useUpdateTask();

    const onDragEnd = async (
        result: DropResult,
        tasks: ITaskResponse[] | undefined,
        setTasks: Dispatch<SetStateAction<ITaskResponse[] | undefined>>
    ) => {
        if (!result.destination) return;

        const destinationColumnId = result.destination.droppableId;

        if (destinationColumnId === result.source.droppableId) {
            if (tasks) {
                const tasksWithIndex: ITaskResponse[] = setIndexes(
                    tasks,
                    result.draggableId,
                    result.destination.index
                );

                const taskOrder = tasksWithIndex.map((task) => ({
                    id: task.id,
                    index: task.index,
                }));

                const items = await taskService.updateTasksOrder(taskOrder);
                setTasks(items?.data);
            }
        }

        if (destinationColumnId === "completed") {
            updateTask({
                id: result.draggableId,
                data: {
                    isCompleted: true,
                },
            });
            return;
        }

        const newCreatedAt = FILTERS[destinationColumnId].format();

        updateTask({
            id: result.draggableId,
            data: {
                createdAt: newCreatedAt,
                isCompleted: false,
            },
        });
    };

    return { onDragEnd };
}
