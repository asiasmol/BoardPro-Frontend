import React, {useContext, useEffect, useState} from "react";
import AddNewCardList from "../cardList/AddNewCardList";
import { BoardContext } from "../../context/BoardContext";
import {closestCorners, DndContext, DragEndEvent, DragOverEvent, DragOverlay, DragStartEvent, TouchSensor, useSensor, useSensors} from "@dnd-kit/core";
import {CardResponse} from "../../api/apiModels/CardResponse";
import {SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy} from "@dnd-kit/sortable";
import {CardListResponse} from "../../api/apiModels/CardListResponse";
import {KeyboardSensor, MouseSensor} from "../MyPointerSensor";
import CardComponent from "../card/CardComponent";
import NavbarBoard from "./NavbarBoard";
import SortableCardList from "./SortableCardList";
import CardList from "../cardList/CardList";
import {CardSwapRequest} from "../../api/apiModels/CardSwapRequest";
import {CardApi} from "../../api/CardApi";
import {Body} from "./Board.styles";

const Board = () => {
    const context = useContext(BoardContext)
    const [cards, setCards] = useState<CardResponse[]>([]);
    const [activeItem, setActiveItem] = useState<CardResponse>()
    const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor), useSensor(KeyboardSensor, {coordinateGetter: sortableKeyboardCoordinates,}));
    const [isDragging, setIsDragging] = useState(false);
    const [previousList, setPreviousList] = useState<CardListResponse | null>(null);

    const handleDragStart = (event: DragStartEvent) => {
        setIsDragging(true)
        context.isDraggingModifier(true)
        const { active } = event
        setActiveItem(cards.find((item) => item.id === active.id))
        if(context.currentBoard) {
            const currentList = findCardListContainer(context.currentBoard?.cardLists, event.active.id as string);
            if(currentList) {
                setPreviousList(currentList);
            }
        }
    }
    const handleDragOver = ({ active, over }: DragOverEvent) => {
        if (!context.currentBoard?.cardLists) {
            return;
        }
        const activeList = findCardListContainer(context.currentBoard.cardLists, active.id as string);
        if (!activeList) {
            return;
        }
        let overList = over ? findCardListContainer(context.currentBoard.cardLists, over.id as string) : null;
        if (!overList) {
            overList = context.currentBoard.cardLists.find(list => list.cards.length === 0);
        }
        if (!overList || activeList === overList) {
            return;
        }
        const activeIndex = activeList.cards.findIndex(card => card.id !== undefined && card.id.toString() === active.id);
        if (activeIndex === -1) {
            return;
        }
        const removedCard = activeList.cards[activeIndex];
        const newActiveListCards = [...activeList.cards.filter((_, index) => index !== activeIndex)];
        const overIndex = over ? overList.cards.findIndex(card => card.id !== undefined && card.id.toString() === over.id) : overList.cards.length;
        const newOverListCards = [
            ...overList.cards.slice(0, overIndex),
            removedCard,
            ...overList.cards.slice(overIndex)
        ];
        const updatedActiveList = { ...activeList, cards: newActiveListCards };
        const updatedOverList = { ...overList, cards: newOverListCards };
        const updatedCardList = context.currentBoard.cardLists.map(existingList => {
            if (existingList.id === activeList.id) {
                return updatedActiveList;
            } else if (overList && existingList.id === overList.id) {
                return updatedOverList;
            } else {
                return existingList;
            }
        });
        context.updateCardLists(updatedCardList);
        if (context.currentCardList && (activeList.id === context.currentCardList.id || overList.id === context.currentCardList.id)) {
            context.currentCardListModifier(updatedActiveList.id === context.currentCardList.id ? updatedActiveList : updatedOverList);
        }
    };
    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        setIsDragging(false);
        context.isDraggingModifier(false);

        if(context.currentBoard && over) {
            let targetList = findCardListContainer(context.currentBoard?.cardLists, over.id as string);
            if(!active || !over || active.id === over.id && previousList != targetList){
                if(targetList && previousList) {
                    const activeCardIndex = previousList.cards.findIndex(card => card.id !== undefined && card.id.toString() === active.id);
                    const [removedCard] = previousList.cards.splice(activeCardIndex, 1);
                    removedCard.cardList = targetList;
                    previousList.cards.forEach((card, index) => {
                        card.orderNumber = index + 1;
                    });
                    targetList.cards.forEach((card, index) => {
                        card.orderNumber = index + 1;
                    });
                    swapCards(targetList.cards, targetList)
                    swapCards(previousList.cards, previousList);
                }
            }

            if (!active || !over || active.id === over.id) {
                return;
            }

            const originalList = context.currentBoard?.cardLists.find(list => list.cards.some(card => card.id.toString() === active.id));
            if (!originalList) {
                return;
            }

            const activeCardIndex = originalList.cards.findIndex(card => card.id !== undefined && card.id.toString() === active.id);
            if (activeCardIndex === -1) {
                return;
            }

            const [removedCard] = originalList.cards.splice(activeCardIndex, 1);
            updateListWithNewCards(originalList, originalList.cards);

            if (!context.currentBoard?.cardLists) {
                return;
            }


            const overCardIndex = cards.findIndex(card => card.id !== undefined && card.id.toString() === over.id);
            if (targetList) {
                if (!targetList.cards.some(card => card.id === removedCard.id)) {
                    if (overCardIndex !== -1) {
                        if (activeCardIndex - overCardIndex <= 0) {
                            // DOWN
                            let overCard = targetList.cards[overCardIndex];
                            removedCard.orderNumber = overCard.orderNumber + 1
                            targetList.cards.splice(overCardIndex + 1, 0, removedCard);
                            targetList.cards.forEach((card, index) => {
                                card.orderNumber = index + 1;
                            });
                            swapCards(targetList.cards, targetList)
                        } else {
                            // UP
                            let overCard = targetList.cards[overCardIndex];
                            removedCard.orderNumber = overCard.orderNumber - 1
                            targetList.cards.splice(overCardIndex, 0, removedCard);
                            targetList.cards.forEach((card, index) => {
                                card.orderNumber = index + 1;
                            });
                            swapCards(targetList.cards, targetList)
                        }
                    } else {
                        targetList.cards.push(removedCard);
                        removedCard.orderNumber = targetList.cards.length
                        console.log(context.currentBoard.cardLists)
                    }
                    updateListWithNewCards(targetList, targetList.cards);
                }
                return;
            }

            targetList = context.currentBoard?.cardLists.find(list => list.cards.length === 0);
            if (previousList && targetList && !targetList.cards.some(card => card.id === removedCard.id)) {
                if (overCardIndex !== -1) {
                    targetList.cards.splice(overCardIndex, 0, removedCard);
                } else {
                    targetList.cards.push(removedCard);
                    removedCard.cardList = targetList;
                    previousList.cards.forEach((card, index) => {
                        card.orderNumber = index + 1;
                    });
                    targetList.cards.forEach((card, index) => {
                        card.orderNumber = index + 1;
                    });
                    swapCards(targetList.cards, targetList)
                    swapCards(previousList.cards, previousList);
                }
                updateListWithNewCards(targetList, targetList.cards);
            }
        }
    };
    const swapCards = async (cards: CardResponse[], cardList: CardListResponse) => {
        console.log(cards)
        const requests: CardSwapRequest[] = cards.map(card => ({
            id: card.id,
            cardListId: cardList.id,
            orderNumber: card.orderNumber
        }));

        await CardApi.swapCard(requests, context.currentBoard?.id);
    }
    const updateListWithNewCards = (list: CardListResponse, newCards: CardResponse[]) => {
        if (context.currentBoard) {
            const updatedCardList = context.currentBoard.cardLists.map(existingList => {
                if (existingList.id === list.id) {
                    return {...existingList, cards: newCards};
                } else {
                    return existingList;
                }
            });
            context.updateCardLists(updatedCardList);
            if (context.currentCardList && list.id === context.currentCardList.id) {
                context.currentCardListModifier({...context.currentCardList, cards: newCards});
            }
        }
    }
    const findCardListContainer = (
        cardLists: CardListResponse[],
        id: string
    ) => {
        return cardLists.find((list) => list.cards.some((card) => card.id.toString() === id));
    };

    // const updateBoard = async () => {
    //     try {
    //         if (context.currentBoard) {
    //             const cardLists = context.currentBoard.cardLists
    //             console.log(cardLists)
    //             const boardRequest: BoardRequest = {
    //                 title: context.currentBoard.title,
    //                 cardLists: cardLists
    //             }
    //
    //             await BoardApi.updateBoard(boardRequest, context.currentBoard.id);
    //
    //             toast.success("Board updated successfully");
    //         }
    //     } catch (error) {
    //         toast.error("Something went wrong");
    //     }
    // }

    useEffect(() => {
        setCards(context.currentCardList?.cards || []);
    }, [context.currentCardList]);


    return (
        <Body backgroundImage={context.currentBoard?.imagePath || ''}>
            <NavbarBoard/>
            <div style={{ display: "flex", gap: "1rem", justifyContent: "start" }}>

                <DndContext sensors={sensors} collisionDetection={closestCorners} onDragEnd={handleDragEnd} onDragStart={handleDragStart} onDragOver={handleDragOver}>
                    <SortableContext items={
                        context.currentBoard
                            ? context.currentBoard.cardLists.flatMap(cardList => cardList.cards.map(card => card.id.toString()))
                            : []
                    } strategy={verticalListSortingStrategy}>
                        <div style={{ display: 'flex'}}>
                            {context.currentBoard?.cardLists.sort((a, b) => a.id - b.id).map((cardList, index) => (
                            <div key={`div-${cardList.id}`} style={{ margin: '-1rem'}}>
                                {
                                    context.isDragging ?
                                        <SortableCardList cardList={cardList} key={cardList.id}/> :
                                        <CardList cardList={cardList} key={cardList.id}/>
                                }
                            </div>
                            ))}
                            <AddNewCardList />
                        </div>
                    </SortableContext>
                    <DragOverlay>
                        {isDragging && context.currentCard && context.currentCardList ? (
                            <CardComponent card={context.currentCard} cardList={context.currentCardList}/>
                        ): null}
                    </DragOverlay>
                </DndContext>
            </div>

        </Body>
    );
};

export default Board;
