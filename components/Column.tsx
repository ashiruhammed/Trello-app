import { TypedColumn } from "@/typing";
import React from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import TodoCard from "./TodoCard";
import { PlusCircleIcon } from "@heroicons/react/20/solid";

type Props = {
  id: string;
  todos: [];
  index: number;
};

const idToColumnText: {
  [key in TypedColumn]: string;
} = {
  todo: "To Do",
  inprogress: "In Progress",
  done: "Done",
};

function Column({ id, todos, index }: Props) {
  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}>
          <Droppable droppableId={index.toString()} type="card">
            {(provided, snapshot) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className={`p-2 rounded-2xl ${
                  snapshot.isDraggingOver ? "bg-green-200" : "bg-white/50"
                }    }`}>
                <h2 className="flex justify-between font-bold text-xl p-2">
                  {idToColumnText[id as TypedColumn]}
                  <span className="text-gray-500 bg-gray-200 rounded-full px-2 text-sm font-normal">
                    {todos.length}
                  </span>
                </h2>

                <div className="space-y-2">
                  {todos.map((todo: any, index: number) => {
                    return (
                      <Draggable
                        key={todo.$id}
                        draggableId={todo.$id}
                        index={index}>
                        {(provided) => (
                          <TodoCard
                            todo={todo}
                            index={index}
                            id={todo.$id}
                            innerRef={provided.innerRef}
                            draggableProps={provided.draggableProps}
                            draggableHandleProps={provided.dragHandleProps}
                          />
                        )}
                      </Draggable>
                    );
                  })}
                  {provided.placeholder}

                  <div className="flex justify-end p-2">
                    <button className="text-green-500 hover:text-green-600">
                      <PlusCircleIcon className="h-10 w-10 " />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </Droppable>
        </div>
      )}
    </Draggable>
  );
}

export default Column;
