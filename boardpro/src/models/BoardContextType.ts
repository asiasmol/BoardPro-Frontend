import {Board} from "./Board";
import {CardListResponse} from "../api/apiModels/CardListResponse";
import {CardResponse} from "../api/apiModels/CardResponse";

export type BoardContextType = {
    currentBoard: Board | null
    currentCardList: CardListResponse | null
    currentCard: CardResponse | null
    isDragging: boolean
    currentBoardModifier: (board: Board | null) => void
    updateCardLists: (newCardLists: CardListResponse[]) => void
    currentCardListModifier: (cardList: CardListResponse | null) => void
    currentCardModifier: (card: CardResponse | null) => void
    isDraggingModifier: (isDragging: boolean) => void
}