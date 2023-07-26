import React, {createContext, useState} from "react";
import {BoardContextType} from "../models/BoardContextType";
import {Board} from "../models/Board";
import {CardListResponse} from "../api/apiModels/CardListResponse";
import {CardResponse} from "../api/apiModels/CardResponse";

const defaultSetting: BoardContextType = {
    currentBoard: null,
    currentCardList: null,
    currentCard: null,
    isDragging: false,
    currentBoardModifier: (board: Board | null) => {},
    updateCardLists: (newCardLists: CardListResponse[] | null) => {},
    currentCardListModifier: (cardList: CardListResponse | null) => {},
    currentCardModifier: (card: CardResponse | null) => {},
    isDraggingModifier : (isDragging : boolean) => {},
}

export const BoardContext = createContext<BoardContextType>(defaultSetting)

export const BoardContextProvider = ({ children }: React.PropsWithChildren) => {
    const [currentBoard, setCurrentBoard] = useState<Board | null>(null)
    const [currentCardList, setCurrentCardlist] = useState<CardListResponse | null>(null)
    const [currentCard, setCurrentCard] = useState<CardResponse | null>(null)
    const [isDragging, setIsDragging] = useState(false)
    const currentBoardModifier = (board: Board | null) => {
        setCurrentBoard(board)
    }
    const currentCardListModifier = (cardList: CardListResponse | null) => {
        setCurrentCardlist(cardList)
    }
    const currentCardModifier = (card: CardResponse | null) => {
        setCurrentCard(card)
    }

    const isDraggingModifier = (isDragging: boolean) => {
        setIsDragging(isDragging)
    }
    const updateCardLists = (newCardLists: CardListResponse[]) => {
        if (currentBoard) {
            const updatedBoard = { ...currentBoard };
            updatedBoard.cardLists = newCardLists;
            setCurrentBoard(updatedBoard);
        }
    }

    return (
        <BoardContext.Provider value={{ currentBoard, currentBoardModifier, updateCardLists, currentCardList, currentCardListModifier, currentCard, currentCardModifier, isDragging, isDraggingModifier}}> {children} </BoardContext.Provider>
    )
}