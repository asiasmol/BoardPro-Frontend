import "./AddNewCard.css"
import {Card, Form} from "react-bootstrap";
import HoverableCardText from "../board/HoverableCardText";
import AddNewCard from "./AddNewCard";
import React, {useContext, useState} from "react";
import {CardListResponse} from "../../models/api/CardListResponse";
import { BoardContext } from "../../context/BoardContext";
import {CardListApi} from "../../api/CardListApi";
import {toast} from "react-toastify";
import {CardApi} from "../../api/CardApi";
import {CardResponse} from "../../models/api/CardResponse";


interface Props{
    cardList: CardListResponse,
}
const CardList = ({cardList}:Props) => {
    const context = useContext(BoardContext)
    const [isEditing, setIsEditing] = useState(false);
    const [newTitle, setNewTitle] = useState(cardList.title);

    const handleHeaderClick = () => {
        setIsEditing(true);
    };

    const handleInputChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setNewTitle(event.target.value);
    };


    const handleBlur = async () => {
        try {
            await CardApi.createCard({
                title: newTitle
            }, context.currentBoard?.id, cardList.id);


            if(context.currentBoard) {
                const updatedCardList = context.currentBoard.cardLists.map(list => {
                    if (list.id === cardList.id) {
                        return {...list, title: newTitle};
                    }
                    else return list
                })

                context.currentBoardModifier({
                    ...context.currentBoard,
                    cardLists: updatedCardList,
                });

            toast.success("Card title updated");
            }
        }
        catch (error) {
            toast.error("Something went wrong");
        }
        setIsEditing(false);
    };

    return (
        <Card bg="dark" text="white" style={{ width: '18rem', borderRadius: '0.5rem' }} className="mb-3">
            <Card.Header onClick={handleHeaderClick}>
                {isEditing ? (
                    <Form.Control
                        style={{ border: "none", backgroundColor: "transparent", color: "white", height: "1rem" }}
                        type="text"
                        value={newTitle}
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        autoFocus
                    />
                ) : (
                    cardList.title
                )}
            </Card.Header>
            <Card.Body>
                {cardList.cards.map((card, index) => (
                    <HoverableCardText key={index} text={card.title} />
                    ))}
                <AddNewCard cardListId={cardList.id}/>
            </Card.Body>
        </Card>
    )
}

export default CardList;