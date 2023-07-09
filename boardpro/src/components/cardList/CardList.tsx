import React, {useContext, useState} from "react";
import {CardListResponse} from "../../models/api/CardListResponse";
import { BoardContext } from "../../context/BoardContext";
import {toast} from "react-toastify";
import {CardApi} from "../../api/CardApi";
import {Button, CardActions, CardContent, CardMedia, TextField, Typography} from "@mui/material";
import {Container, StyledCard, StyledTextField} from "./CardList.styles";
import CardComponent from "../card/CardComponent";
import AddNewCard from "../card/AddNewCard";


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
        <Container>
            <StyledCard>
                <CardContent>
                    {isEditing ? ( <StyledTextField id="outlined-basic" label="Outlined" variant="outlined" value={newTitle} onChange={handleInputChange}/>
                    ) : (
                        <Typography gutterBottom component="div" onClick={handleHeaderClick}>
                            {cardList.title}
                        </Typography>
                    )}

                </CardContent>

                {cardList.cards.map((card, index) => (
                    <CardComponent key={index}  text={card.title}/>
                ))}
                <CardActions>
                    <AddNewCard cardListId={cardList.id}/>
                </CardActions>
            </StyledCard>
        </Container>
    )
}

export default CardList;