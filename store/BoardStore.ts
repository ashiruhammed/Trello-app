import { create } from "zustand";
import { Board, Column, Todo, TypedColumn } from "../typing";
import { getTodosGroupByColumn } from "@/lib/getTodosGroupedByColumn";
import { databases, storage } from "@/appwrite";
interface BoardState {
  board: Board;
  getBoard: () => void;
  setBoard: (board: Board) => void;
  searchString: string;
  setSearchString: (searchString: string) => void;
  updateTodoInDb: (todo: Todo, columnId: TypedColumn) => void;
  deleteTask: (taskIndex: number, todoId: Todo, id: TypedColumn) => void;
}

const useBoardStore = create<BoardState>((set, get) => ({
  board: {
    columns: new Map<TypedColumn, Column>(),
  },
  searchString: "",
  setSearchString: (searchString) => set({ searchString }),
  getBoard: async () => {
    const board = await getTodosGroupByColumn();
    set({ board });
  },

  updateTodoInDb: async (todo, columnId) => {
    await databases.updateDocument(
      process.env.NEXT_PUBLIC_DATABASE_ID!,
      process.env.NEXT_PUBLIC_TODOS_COLLECTION_ID!,
      todo.$id,
      {
        title: todo.$title,
        status: columnId,
      }
    );
  },
  deleteTask: async (taskIndex: number, todo: Todo, id: string) => {
    const newColumns = new Map(get().board.columns);

    console.log(todo, taskIndex);
    newColumns.get(todo.$status)?.todos.splice(taskIndex, 1);

    set({ board: { columns: newColumns } });

    if (todo.image) {
      await storage.deleteFile(todo.image.buckedtId, todo.image.fileId);
    }

    await databases.deleteDocument(
      process.env.NEXT_PUBLIC_DATABASE_ID!,
      process.env.NEXT_PUBLIC_TODOS_COLLECTION_ID!,
      todo.$id
    );
  },

  setBoard: (board) => set({ board }),
}));

export default useBoardStore;
