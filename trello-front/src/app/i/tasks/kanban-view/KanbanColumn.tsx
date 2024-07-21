import { Draggable, Droppable } from "@hello-pangea/dnd";
import type { Dispatch, SetStateAction } from "react";

import type { ITaskResponse } from "@/types/task.types";

import { FILTERS } from "../columns.data";
import { filterTasks } from "../filter-tasks";

import { KanbanAddCardInput } from "./KanbanAddCardInput";
import { KanbanCard } from "./KanbanCard";
import styles from "./KanbanView.module.scss";

interface IKanbanColumn {
    value: string;
    label: string;
    items: ITaskResponse[] | undefined;
    setItems: Dispatch<SetStateAction<ITaskResponse[] | undefined>>;
}

export function KanbanColumn({ value, items, label, setItems }: IKanbanColumn) {
    const filteredTasks = filterTasks(items, value);

    return (
        <Droppable droppableId={value}>
            {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                    <div className={styles.column}>
                        <div className={styles.columnHeading}>{label}</div>

                        {!filteredTasks?.length ? (
                            <div className="opacity-30 mt-6">Nothing yet</div>
                        ) : (
                            filteredTasks?.map((item, index) => (
                                <Draggable
                                    key={item.id}
                                    draggableId={item.id || ""}
                                    index={index}
                                >
                                    {(provided) => (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                        >
                                            <KanbanCard
                                                key={item.id}
                                                item={item}
                                                setItems={setItems}
                                            />
                                        </div>
                                    )}
                                </Draggable>
                            ))
                        )}

                        {provided.placeholder}

                        {value !== "completed" &&
                            !items?.some((item) => !item.id) && (
                                <KanbanAddCardInput
                                    setItems={setItems}
                                    filterDate={
                                        FILTERS[value]
                                            ? FILTERS[value].format()
                                            : undefined
                                    }
                                />
                            )}
                    </div>
                </div>
            )}
        </Droppable>
    );
}
