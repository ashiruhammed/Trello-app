"use client";
import useBoardStore from "@/store/BoardStore";
import { useEffect } from "react";
import React from "react";
import { DragDropContext, DropResult, Droppable } from "react-beautiful-dnd";

import { Column as IColumn } from "@/typing";
import Column from "./Column";
import { start } from "repl";

function Board() {
  const [board, getBoard, setBoard, updateTodoInDb] = useBoardStore((state) => [
    state.board,
    state.getBoard,
    state.setBoard,
    state.updateTodoInDb,
  ]);
  useEffect(() => {
    getBoard();
  }, [getBoard]);

  const handleOnDragEnd = (result: DropResult) => {
    const { source, destination, type } = result;

    if (!destination) return;
    if (type === "column") {
      const entries = Array.from(board.columns.entries());
      const [removed] = entries.splice(source.index, 1);

      entries.splice(destination.index, 0, removed);
      setBoard({ ...board, columns: new Map(entries) });
      console.log(entries);
    }
    const columns = Array.from(board.columns);
    const startColIndex = columns[Number(source.droppableId)];
    const finishColIndex = columns[Number(destination.droppableId)];
    console.log(startColIndex, finishColIndex);
    const startCol: IColumn = {
      id: startColIndex?.[0],
      todos: startColIndex[1]?.todos,
    };

    const finishCol: IColumn = {
      id: finishColIndex[0],
      todos: finishColIndex[1].todos,
    };

    if (!startCol || !finishCol) return;
    if (source.index === destination.index && startCol === finishCol) return;
    console.log(source.index, destination.index);

    const newTodos = startCol.todos;
    const [todoMoved] = newTodos.splice(source.index, 1);
    if (startCol.id === finishCol.id) {
      newTodos.splice(destination.index, 0, todoMoved);

      const newCol = {
        id: startCol.id,
        todos: newTodos,
      };

      const newColumns = new Map(board.columns);
      newColumns.set(startCol.id, newCol);

      setBoard({ ...board, columns: newColumns });
    } else {
      const finishTodos = Array.from(finishCol.todos);
      finishTodos.splice(destination.index, 0, todoMoved);

      const newColumns = new Map(board.columns);
      const newCol = {
        id: startCol.id,
        todos: newTodos,
      };

      newColumns.set(startCol.id, newCol);
      newColumns.set(finishCol.id, {
        id: finishCol.id,
        todos: finishTodos,
      });

      updateTodoInDb(todoMoved, finishCol.id);
      setBoard({ ...board, columns: newColumns });
    }
  };

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable droppableId="board" direction="horizontal" type="column">
        {(provided) => (
          <div
            className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-7xl mx-auto"
            {...provided.droppableProps}
            ref={provided.innerRef}>
            {Array.from(board.columns.entries()).map(
              ([id, column]: [string, any], index: number) => (
                <Column key={id} id={id} todos={column.todos} index={index} />
              )
            )}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default Board;
