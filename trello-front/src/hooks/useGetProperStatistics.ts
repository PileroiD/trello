import { filterTasks } from "@/app/i/tasks/filter-tasks";
import { ITaskResponse } from "@/types/task.types";

export const useGetProperStatistics = (items: ITaskResponse[] | undefined) => {
    const filteredTasksTotal = items?.length;
    const filteredTasksToday = filterTasks(items, "today");
    const filteredTasksCompleted = filterTasks(items, "completed");
    const filteredTasksWeek = filterTasks(items, "on-this-week");

    return {
        statistics: [
            { label: "Total", value: filteredTasksTotal },
            { label: "Completed tasks", value: filteredTasksCompleted?.length },
            { label: "Today tasks", value: filteredTasksToday?.length },
            { label: "Week tasks", value: filteredTasksWeek?.length },
        ],
    };
};
