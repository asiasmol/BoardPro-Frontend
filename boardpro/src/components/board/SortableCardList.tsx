import React from 'react';
import { CSS } from '@dnd-kit/utilities';
import { useSortable } from '@dnd-kit/sortable';
import CardList from "../cardList/CardList";
import { CardListResponse } from "../../api/apiModels/CardListResponse";

interface SortableCardListProps {

    cardList: CardListResponse;
}

const SortableCardList: React.FC<SortableCardListProps> = ({ cardList }) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: cardList.id });

    const style = {
        transform: CSS.Translate.toString(transform),
        transition,
        zIndex: isDragging ? 2 : 1,
        opacity: isDragging ? 0.5 : 1,
    }

    return (
        <div ref={setNodeRef} style={style} {...attributes} {...listeners} >
            <CardList cardList={cardList}></CardList>
        </div>
    );
};

export default SortableCardList;
