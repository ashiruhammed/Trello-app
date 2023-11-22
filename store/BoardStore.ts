import { create } from "zustand";
import { Board, Column, Todo, TypedColumn } from "../typing";
import { getTodosGroupByColumn } from "@/lib/getTodosGroupedByColumn";
import { databases } from "@/appwrite";
interface BoardState {
  board: Board;
  getBoard: () => void;
  setBoard: (board: Board) => void;
  searchString: string;
  setSearchString: (searchString: string) => void;
  updateTodoInDb: (todo: Todo, columnId: TypedColumn) => void;
}

const useBoardStore = create<BoardState>((set) => ({
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

  setBoard: (board) => set({ board }),
}));

export default useBoardStore;
