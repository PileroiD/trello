import { axiosWithAuth } from "@/api/interceptors";
import { useAddIndexes } from "@/hooks/useAddIndexes";
import { ITaskResponse, TypeTaskFormState } from "@/types/task.types";

class TaskService {
    private BASE_URL = "/user/tasks";

    async getTasks() {
        const response = await axiosWithAuth.get<ITaskResponse[]>(
            this.BASE_URL
        );

        const indexedTasks = useAddIndexes(response.data);

        return indexedTasks;
    }

    async createTask(data: TypeTaskFormState) {
        const response = await axiosWithAuth.post<ITaskResponse>(
            this.BASE_URL,
            data
        );
        return response;
    }

    async updateTask(id: string, data: TypeTaskFormState) {
        const response = await axiosWithAuth.put<ITaskResponse>(
            `${this.BASE_URL}/${id}`,
            data
        );
        return response;
    }

    async updateTasksOrder(taskOrder: { id: string; index: number }[]) {
        const response = await axiosWithAuth.post(
            `${this.BASE_URL}/update-order`,
            taskOrder
        );
        return response;
    }

    async deleteTask(id: string) {
        const response = await axiosWithAuth.delete(`${this.BASE_URL}/${id}`);
        return response;
    }
}

export const taskService = new TaskService();
