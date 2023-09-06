import React, {useContext, useEffect, useState} from "react";
import {toast} from "react-toastify";
import {CardListApi} from "../../api/CardListApi";
import {BoardContext} from "../../context/BoardContext";
import {CardListResponse} from "../../api/apiModels/CardListResponse";
import {Box, Button, Grid} from "@mui/material";
import {ButtonContainer, StyledTextField} from "./AddNewCardList.styles";
import {sendMessage} from "../message/MessageSender";



const AddNewCardList = () => {

    const [showForm, setShowForm] = useState(false);
    const [title, setTitle] = useState('');
    const context = useContext(BoardContext)
    const [cardListAdded, setCardListAdded] = useState(false);

    const createCardList = async (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        try {
            const newCardListResponse =  await CardListApi.createCardList({
                title: title
            }, context.currentBoard?.id);

            const newCardList: CardListResponse = {
                id: newCardListResponse.data.id,
                title: newCardListResponse.data.title,
                cards: []
            };

            if (context.currentBoard) {
                const updatedCardLists = [...context.currentBoard.cardLists, newCardList];

                context.currentBoardModifier({
                    ...context.currentBoard,
                    cardLists: updatedCardLists
                });
            }
            setCardListAdded(true)
            toast.success("Card Added");
            if (context.currentBoard){
                sendMessage(context.currentBoard?.id.toString())
            }
        } catch {
            toast.error("Error server");
        }
    };


    const handleButtonClick = () => {
        setShowForm(true);
    };

    const handleCancelClick = () => {
        setShowForm(false);
    }

    const handleInputChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setTitle(event.target.value);
    };

    useEffect(() => {
        if (cardListAdded) {
            setShowForm(false);
            setTitle("");
            setCardListAdded(false);
        }
    }, [cardListAdded]);


    return (
        <ButtonContainer>
            <Box>
                {!showForm && (
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleButtonClick}
                        sx={{ width: '18rem', marginLeft: "0.5rem", borderRadius: '0.5rem'}}
                    >
                        + Add new list
                    </Button>
                )}
                {showForm && (
                    <Box component="form" onSubmit={createCardList} sx={{ marginLeft: '1rem', width: '18rem' }}>
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
            </Box>
        </ButtonContainer>
    )
}

export default AddNewCardList;
