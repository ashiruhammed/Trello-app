import { create } from "zustand";
import { Board, Column, TypedColumn } from "../typing";
import { getTodosGroupByColumn } from "@/lib/getTodosGroupedByColumn";
interface BoardState {
  board: Board;
  getBoard: () => void;
  setBoard: (board: Board) => void;
}

const useBoardStore = create<BoardState>((set) => ({
  board: {
    columns: new Map<TypedColumn, Column>(),
  },
  getBoard: async () => {
    const board = await getTodosGroupByColumn();
    set({ board });
  },

  setBoard: (board) => set({ board }),
}));

export default useBoardStore;
