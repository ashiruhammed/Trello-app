import { TypedColumn } from "@/typing";
import React from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";

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
                className={`p-2 rounded-2xl ${
                  snapshot.isDraggingOver ? "bg-green-200" : "bg-white/50"
                }    }`}
                {...provided.droppableProps}
                ref={provided.innerRef}>
                <h2>
                  {idToColumnText[id as TypedColumn]}
                  <span>{todos.length}</span>
                </h2>
              </div>
            )}
          </Droppable>
        </div>
      )}
    </Draggable>
  );
}

export default Column;
