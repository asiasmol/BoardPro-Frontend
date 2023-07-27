import React, {useContext, useState} from "react";
import {Avatar, Modal, Typography} from "@mui/material";
import {
    Container,
    StyledBox,
    StyledCard,
    StyledTextareaAutosize,
    StyledCardContent,
    StyledTypography,
    TitleContainer,
    BodyContainer,
    ListTypography,
    StyledCloseIcon,
    StyledTextField,
    StyledCDeleteForeverIcon
} from "./CardComponent.styles";
import {CardListResponse} from "../../api/apiModels/CardListResponse";
import { CardApi } from "../../api/CardApi";
import {CardResponse} from "../../api/apiModels/CardResponse";
import {BoardContext} from "../../context/BoardContext";
import {ThemeContext} from "../../context/ThemeContext";
import {toast} from "react-toastify";
import MenuIcon from '@mui/icons-material/Menu';
import SubtitlesIcon from '@mui/icons-material/Subtitles';
import CommentIcon from '@mui/icons-material/Comment';
import PeopleIcon from '@mui/icons-material/People';




interface Props {
    card: CardResponse
    cardList: CardListResponse
}

const CardComponent = ({card, cardList}: Props) => {

    const context = useContext(BoardContext)
    const theme = useContext(ThemeContext)
    const [hover, setHover] = useState(false );
    const [open, setOpen] = useState(false);
    const [isEditingTitle, setIsEditingTitle] = useState(false);
    const [isEditingDescription, setIsEditingDescription] = useState(false);
    const [newTitle, setNewTitle] = useState(card.title);
    const [newDescription, setNewDescription] = useState(card.description)
    const handleInputChange = (event: { target: { value: React.SetStateAction<string>; }; }) => setNewTitle(event.target.value);
    const handleDescriptionChange = (event: { target: { value: React.SetStateAction<string>; }; }) => setNewDescription(event.target.value);
    const handleOpen = () => setOpen(true);
    const handleTitleClick = () => setIsEditingTitle(true);
    const handleDescriptionClick = () => setIsEditingDescription(true);
    const handleClose = () => setOpen(false);
    const setCurrentCardList = () => context.currentCardListModifier(cardList);
    const setCurrentCard = () => {
        if (!context.isDragging) {
            context.currentCardModifier(card)
        }
    }
    const handleDeleteCard = async () => {
        try {
            await CardApi.deleteCard(card.id, context.currentBoard?.id, cardList.id);

            if (context.currentBoard) {
                const updatedCardLists = context.currentBoard.cardLists.map(list => {
                    if (list.id === cardList.id) {
                        return {
                            ...list,
                            cards: list.cards.filter(c => c.id !== card.id)
                        };
                    } else return list;
                });

                context.currentBoardModifier({
                    ...context.currentBoard,
                    cardLists: updatedCardLists,
                });
            }
            toast.success("Card deleted");
        } catch (error) {
            toast.error("Something went wrong");
        }
    };
    const handleBlur = async () => {
        try {
            console.log(context.currentBoard?.id)
            await CardApi.updateCard({
                title: newTitle,
                cardListId: cardList.id,
                description: newDescription
            }, card.id, context.currentBoard?.id, cardList.id);

            if(context.currentBoard) {
                const updatedCardLists = context.currentBoard.cardLists.map(list => {
                    if (list.id === cardList.id) {
                        return {
                            ...list,
                            cards: list.cards.map(c => {
                                if (c.id === card.id)
                                    return {...c, title: newTitle, description: newDescription}
                                else return c
                            })
                        }
                    } else return list
                })

                context.currentBoardModifier({
                    ...context.currentBoard,
                    cardLists: updatedCardLists,
                });
                if (context.currentCard && context.currentCard.id) {
                    context.currentCardModifier({
                        ...context.currentCard,
                        title: newTitle,
                        description: newDescription
                    });
                }
            }
            toast.success("Card title updated");
        } catch (error) {
            toast.error("Something went wrong");
        }
        setIsEditingTitle(false);
        setIsEditingDescription(false)
    };

    return (
        <>
            <StyledCard
                onMouseEnter={() => {
                    setHover(true);
                    setCurrentCardList();
                    setCurrentCard();
                }}
                onMouseLeave={() => setHover(false)}
                hover={hover.toString()}

            >
                <StyledCardContent >
                    <Typography fontSize={"medium"}>{card.title}</Typography>
                    {hover && (
                        <MenuIcon onClick={handleOpen} data-no-dnd="true" />
                    )}
                </StyledCardContent>
            </StyledCard>



            <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title"
                   aria-describedby="modal-modal-description" data-no-dnd="true">
                <StyledBox bgcolor={theme.theme.palette.background.paper}>
                    <StyledCloseIcon onClick={handleClose}/>

                    <Container>

                        <TitleContainer>
                            <SubtitlesIcon fontSize={"large"}/>
                            {
                                isEditingTitle ? (
                                    <StyledTextField
                                        onChange={handleInputChange}
                                        onBlur={handleBlur}
                                        type="text"
                                        variant="outlined"
                                        value={newTitle}
                                        autoFocus
                                    />
                                ) : (
                                    <Typography id="modal-modal-title" variant="h6" onClick={handleTitleClick}>
                                        {card.title}
                                    </Typography>
                                )
                            }

                        </TitleContainer>
                        <BodyContainer>
                            <ListTypography fontSize={"small"} id="modal-modal-description">
                                Jest na liście {cardList.title}
                            </ListTypography>
                        </BodyContainer>

                        <TitleContainer>
                            <PeopleIcon fontSize={"large"}/>
                            <Typography>
                                Użytkownicy
                            </Typography>
                        </TitleContainer>
                        {/*{card.executors.map((user, index) => (*/}
                        {/*    <Avatar key={index} alt={user.firstName.toUpperCase()} src="/static/images/avatar/2.jpg"/>*/}
                        {/*))}*/}
                        <BodyContainer>
                            <ListTypography fontSize={"small"} id="modal-modal-description">
                                tu bedą uzytkownicy :)
                            </ListTypography>
                        </BodyContainer>
                        <TitleContainer>
                                <CommentIcon fontSize={"large"}/>
                                <Typography>
                                    Opis
                                </Typography>
                        </TitleContainer>
                        {
                            isEditingDescription ? (
                                <StyledTextareaAutosize
                                    bgcolor={theme.theme.palette.secondary.main}
                                    onChange={handleDescriptionChange}
                                    onBlur={handleBlur}
                                    defaultValue={card.description}
                                    aria-label="minimum height"
                                    minRows={3}
                                    placeholder="Notatka"
                                />
                            ) : (
                                <StyledTypography fontSize={"small"} id="modal-modal-description" variant="h6" onClick={handleDescriptionClick}>
                                    {card.description ? card.description : "Dodaj bardziej szczegółowy opis..."}
                                </StyledTypography>
                            )
                        }
                    </Container>
                    <StyledCDeleteForeverIcon onClick={handleDeleteCard}/>
                </StyledBox>
            </Modal>
        </>
    );
};
export default CardComponent;