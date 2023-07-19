import React, {createContext, useState} from "react";
import {BoardContextType} from "../models/BoardContextType";
import {Board} from "../models/Board";
import {CardListResponse} from "../api/apiModels/CardListResponse";
import {CardList} from "../models/CardList"

const defaultSettings: BoardContextType= {
    currentBoard: null,
    currentBoardModifier: (board: Board | null) => {},
    currentCardList: null,
    currentCardListModifier: (board: CardListResponse | null) => {},
    updateCardLists: (newCardList: CardListResponse[] | null) => {},
}

export const BoardContext = createContext<BoardContextType>(defaultSettings)

export const BoardContextProvider = ({children}: React.PropsWithChildren) => {
    const [currentBoard, setCurrentBoard] = useState<Board | null>(null);
    const [currentCardList, setCurrentCardList] = useState<CardList | null>(null)


    const currentBoardModifier = ( board: Board | null) => {
        setCurrentBoard(board)
    }
    const currentCardListModifier = ( cardList: CardList | null) => {
        setCurrentCardList(cardList)
    }

    const updateCardLists = (newCardLists: CardListResponse[]) => {
        if (currentBoard) {
            const updatedBoard = { ...currentBoard };
            updatedBoard.cardLists = newCardLists;
            setCurrentBoard(updatedBoard);
        }
    }


    return(
        <BoardContext.Provider value={{currentBoard, currentBoardModifier, currentCardList, currentCardListModifier, updateCardLists}}>{children}</BoardContext.Provider>
    )

}