import {CardActions, CardContent, CardHeader} from "@mui/material";
import React, {useContext, useEffect, useState} from "react";
import {CardListResponse} from "../../api/apiModels/CardListResponse";
import {BoardContext} from "../../context/BoardContext";
import {toast} from "react-toastify";
import AddNewCard from "../card/AddNewCard";
import SortableCard from "./SortableCard";
import {Container, StyledCard, StyledTextField} from "./CardList.styles";
import {CardListApi} from "../../api/CardListApi";
import {sendMessage} from "../message/MessageSender";

interface Props {
    cardList: CardListResponse
}


const CardList = ({cardList}: Props) => {
    const context = useContext(BoardContext)
    const [isEditing, setIsEditing] = useState(false);
    const [newTitle, setNewTitle] = useState(cardList.title);
    const [cards, setCards] = useState(cardList.cards || []);
    const handleHeaderClick = () => {
        setIsEditing(true);
    };

    const handleInputChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setNewTitle(event.target.value);
    };

    const handleBlur = async () => {
        try {
            await CardListApi.changeTitle({
                title: newTitle
            }, context.currentBoard?.id, cardList.id);

            if (context.currentBoard) {
                const updatedCardList = context.currentBoard.cardLists.map(list => {
                    if (list.id === cardList.id) {
                        return {...list, title: newTitle};
                    } else return list
                })

                context.currentBoardModifier({
                    ...context.currentBoard,
                    cardLists: updatedCardList,
                });
                sendMessage(context.currentBoard.id.toString())
            }
            toast.success("Card title updated");
        } catch (error) {
            toast.error("Something went wrong");
        }
        setIsEditing(false);
    };

    useEffect(() => {
        setCards(cardList.cards || []);
    }, [cardList]);

    return (
        <div>
            <Container>
                <StyledCard>
                    <CardHeader
                        data-no-dnd="true"
                        onClick={handleHeaderClick}
                        title={
                            isEditing ? (
                                <StyledTextField
                                    onChange={handleInputChange}
                                    onBlur={handleBlur}
                                    type="text"
                                    variant="outlined"
                                    value={newTitle}
                                    autoFocus
                                />
                            ) : (
                                cardList.title
                            )
                        }
                    />

                    <CardContent>
                        {cards.sort((a, b) => a.orderNumber - b.orderNumber).map((card, index) => (
                            card.id
                                ? <SortableCard key={card.id.toString()} id={card.id.toString()} cardList={cardList} card={card}/>
                                : <></>
                        ))}
                    </CardContent>

                    <CardActions data-no-dnd="true">
                        <AddNewCard cardList={cardList} data-no-dnd="true"/>
                    </CardActions>
                </StyledCard>
            </Container>
        </div>
    )
}

export default CardList;
