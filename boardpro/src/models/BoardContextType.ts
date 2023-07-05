import {Board} from "./Board";

export type  BoardContextType = {
    currentBoard: Board |null
    currentBoardModifier: (board: Board | null ) => void
}