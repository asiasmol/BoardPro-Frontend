import React, {useContext, useEffect, useState} from "react";
import AddNewCardList from "../cardList/AddNewCardList";
import { BoardContext } from "../../context/BoardContext";
import {
    closestCorners,
    DndContext,
    DragEndEvent,
    DragStartEvent,
    TouchSensor,
    useSensor,
    useSensors
} from "@dnd-kit/core";
import {CardResponse} from "../../api/apiModels/CardResponse";
import {rectSortingStrategy, SortableContext, sortableKeyboardCoordinates} from "@dnd-kit/sortable";
import {CardListResponse} from "../../api/apiModels/CardListResponse";
import SortableCardList from "./SortableCardList";
import {KeyboardSensor, MouseSensor} from "../MyPointerSensor";
import CardList from "../cardList/CardList";

const Board = () => {
    const context = useContext(BoardContext)
    const [cards, setCards] = useState<CardResponse[]>([]);
    const [activeItem, setActiveItem] = useState<CardResponse>()
    const sensors = useSensors(
        useSensor(MouseSensor),
        useSensor(TouchSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );
    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

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

        if (!context.currentBoard?.cardLists){
            return;
        }

        let targetList = findCardListContainer(context.currentBoard?.cardLists, over.id as string);
        const overCardIndex = cards.findIndex(card => card.id !== undefined && card.id.toString() === over.id);

        if (targetList) {
            if (!targetList.cards.some(card => card.id === removedCard.id)) {
                if (overCardIndex !== -1) {
                    targetList.cards.splice(overCardIndex, 0, removedCard);
                } else {
                    targetList.cards.push(removedCard);
                }
                updateListWithNewCards(targetList, targetList.cards);
            }
            return;
        }

        targetList = context.currentBoard?.cardLists.find(list => list.cards.length === 0);
        if (targetList && !targetList.cards.some(card => card.id === removedCard.id)) {
            if (overCardIndex !== -1) {
                targetList.cards.splice(overCardIndex, 0, removedCard);
            } else {
                targetList.cards.push(removedCard);
            }
            updateListWithNewCards(targetList, targetList.cards);
        }
    };

    const findCardListContainer = (
        cardLists: CardListResponse[],
        id: string
    ) => {
        return cardLists.find((list) => list.cards.some((card) => card.id.toString() === id));
    };

    const updateListWithNewCards = (list: CardListResponse, newCards: CardResponse[]) => {
        if (context.currentBoard) {
            const updatedCardList = context.currentBoard.cardLists.map(existingList => {
                if (existingList.id === list.id) {
                    return {...existingList, cards: newCards};
                } else {
                    return existingList;
                }
            });
            console.log(updatedCardList)
            context.updateCardLists(updatedCardList);

            if (context.currentCardList && list.id === context.currentCardList.id) {
                context.currentCardListModifier({...context.currentCardList, cards: newCards});
            }
        }
    }
    const handleDragStart = (event: DragStartEvent) => {
        const { active } = event
        setActiveItem(cards.find((item) => item.id === active.id))
    }

    useEffect(() => {
        setCards(context.currentCardList?.cards || []);
    }, [context.currentCardList]);

    return (
        <>
            <div style={{ display: "flex", gap: "1rem", justifyContent: "start" }}>
                <DndContext sensors={sensors} collisionDetection={closestCorners} onDragEnd={handleDragEnd} onDragStart={handleDragStart}>
                    <SortableContext items={cards.map(card => card.id.toString())} strategy={rectSortingStrategy}>
                        <div style={{ display: 'flex', gap: '1rem' }}>
                            {context.currentBoard?.cardLists.sort((a, b) => a.id - b.id).map((cardList, index) => (
                                <SortableCardList cardList={cardList} key={cardList.id}/>
                            ))}
                            <AddNewCardList />
                        </div>
                    </SortableContext>
                </DndContext>
            </div>

        </>
    );
};

export default Board;
