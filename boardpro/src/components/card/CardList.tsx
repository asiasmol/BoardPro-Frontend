import "./AddNewCard.css"
import {Card} from "react-bootstrap";
import HoverableCardText from "../board/HoverableCardText";
import AddNewCard from "./AddNewCard";
import React from "react";
import {CardListResponse} from "../../models/api/CardListResponse";

interface Props{
    cardList: CardListResponse,
    boardId : number | undefined
}
const CardList = ({cardList, boardId}:Props) => {

    return (
        <Card bg="dark" text="white" style={{ width: '18rem', borderRadius: '0.5rem' }} className="mb-3">
            <Card.Header>{cardList.title}</Card.Header>
            <Card.Body>
                {cardList.cards.map((card, index) => (
                    <HoverableCardText key={index} text={card.title} />
                    ))}
                <AddNewCard boardId={boardId} cardListId={cardList.id}/>
            </Card.Body>
        </Card>
    )
}

export default CardList;