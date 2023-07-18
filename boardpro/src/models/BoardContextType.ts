import {Board} from "./Board";
import {CardListResponse} from "../api/apiModels/CardListResponse";

export type  BoardContextType = {
    currentBoard: Board | null
    currentBoardModifier: (board: Board | null ) => void
    currentCardList: CardListResponse | null
    currentCardListModifier: (cardList: CardListResponse | null ) => void
    updateCardLists: (newCardLists: CardListResponse[]) => void
}