import React, {createContext, useState} from "react";
import {BoardContextType} from "../models/BoardContextType";
import {Board} from "../models/Board";

const defalutSettings: BoardContextType={
    currentBoard: null,
    currentBoardModifier: ( board: Board| null) =>{}
}

export const BoardContext = createContext<BoardContextType>(defalutSettings)

export const BoardContextProvider = ({children}: React.PropsWithChildren) => {
    const [currentBoard, setCurrentBoard] = useState<Board | null>(null);
    const currentBoardModifier = ( board: Board | null) => {
        setCurrentBoard(board)
    }

    return(
        <BoardContext.Provider value={{currentBoard, currentBoardModifier}}>{children}</BoardContext.Provider>
    )

}