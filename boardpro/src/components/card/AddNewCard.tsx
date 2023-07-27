import React, {useContext, useEffect, useState} from "react";
import {toast} from "react-toastify";
import {CardApi} from "../../api/CardApi";
import {BoardContext} from "../../context/BoardContext";
import {CardResponse} from "../../api/apiModels/CardResponse";
import {Box, Grid, Button} from "@mui/material";
import {StyledTextField} from "./AddNewCard.styles";

interface Props{
    cardListId: number
}
const AddNewCard = ({cardListId}: Props) => {

    const [showForm, setShowForm] = useState(false);
    const [title, setTitle] = useState('');
    const context = useContext(BoardContext)
    const [cardAdded, setCardAdded] = useState(false);

    const createCard = async (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        try {
            const newCardResponse = await CardApi.createCard({
                title: title,
                cardListId: cardListId,
                description: null,
            }, context.currentBoard?.id, cardListId);

            const newCard: CardResponse = {
                id:newCardResponse.data.id,
                title: newCardResponse.data.title,
                description: newCardResponse.data.description,
                executors: newCardResponse.data.executors
            };

            if(context.currentBoard) {
                const updatedCardList = context.currentBoard.cardLists.map(list => {
                    if (list.id === cardListId) {
                        return {...list, cards: [...list.cards, newCard]};
                    }
                    else return list
                })

                context.currentBoardModifier({
                    ...context.currentBoard,
                    cardLists: updatedCardList,
                });
            }
            setCardAdded(true)
            toast.success("Dodano Karte");
        } catch {
            toast.error("Błąd serwera tutaj");
        }
    };


    const handleButtonClick = () => {
        setShowForm(true);
    };

    const handleInputChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setTitle(event.target.value);
    };

    const handleCancelClick = () => {
        setShowForm(false);
    }

    useEffect(() => {
        if (cardAdded) {
            setShowForm(false);
            setTitle("");
            setCardAdded(false);
        }
    }, [cardAdded]);


    return (
        <>
            {!showForm && (
                <Button onClick={handleButtonClick} style={{ width: '16rem', borderRadius: '0.5rem'}}>
                    + Dodaj karte
                </Button>
            )}
            {showForm && (
                <Box component="form" onSubmit={createCard} sx={{ width: '17rem' }}>
                    <Box mb={3}>
                        <StyledTextField
                            type="text"
                            placeholder="Title"
                            value={title}
                            onChange={handleInputChange}
                        />
                    </Box>
                    <Grid container justifyContent="space-between">
                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                            sx={{ width: '7rem', borderRadius: '0.5rem' }}
                        >
                            Submit
                        </Button>
                        <Button
                            variant="outlined"
                            color="warning"
                            onClick={handleCancelClick}
                            sx={{ width: '7rem', borderRadius: '0.5rem'}}
                        >
                            Cancel
                        </Button>
                    </Grid>
                </Box>
            )}
        </>
    )
}

export default AddNewCard;
