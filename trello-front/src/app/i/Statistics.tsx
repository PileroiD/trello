"use client";

import Loader from "@/components/ui/Loader";
import { useTasks } from "./tasks/hooks/useTasks";
import { useGetProperStatistics } from "@/hooks/useGetProperStatistics";

export function Statistics() {
    const { items, isLoading } = useTasks();
    const { statistics } = useGetProperStatistics(items);

    return isLoading ? (
        <Loader />
    ) : (
        <div className="grid grid-cols-4 gap-12 mt-7">
            {statistics?.length ? (
                statistics?.map((item) => (
                    <div
                        className="bg-border/5 rounded p-layout text-center hover:-translate-y-2 transition-transform duration-200"
                        key={item?.label}
                    >
                        <div className="text-xl">{item?.label}</div>
                        <div className="text-3xl font-semibold">
                            {item?.value}
                        </div>
                    </div>
                ))
            ) : (
                <div>Statistics not loaded!</div>
            )}
        </div>
    );
}
