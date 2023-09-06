import React, {useContext, useState} from "react";
import {Avatar, Box, Menu, MenuItem, Modal, Typography} from "@mui/material";
import {Container, StyledBox, StyledCard, StyledTextareaAutosize, StyledCardContent, StyledTypography, TitleContainer, BodyContainer, ListTypography, StyledCloseIcon, StyledTextField, StyledCDeleteForeverIcon, StyledAddButton} from "./CardComponent.styles";
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
import {UserResponse} from "../../api/apiModels/UserResponse";
import AddIcon from '@mui/icons-material/Add';
import {sendMessage} from "../message/MessageSender";




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
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const handleInputChange = (event: { target: { value: React.SetStateAction<string>; }; }) => setNewTitle(event.target.value);
    const handleDescriptionChange = (event: { target: { value: React.SetStateAction<string>; }; }) => setNewDescription(event.target.value);
    const handleOpen = () => setOpen(true);
    const handleTitleClick = () => setIsEditingTitle(true);
    const handleDescriptionClick = () => setIsEditingDescription(true);
    const handleClose = () => setOpen(false);
    const setCurrentCardList = () => context.currentCardListModifier(cardList);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
        setAnchorEl(event.currentTarget);
        console.log(event.currentTarget)
    };
    const handleCloseUserMenu = (user: UserResponse) => {
        addUser(user)
        setAnchorEl(null);
    };

    const addUser = async (user: UserResponse) => {
        try {
            const newUserResponse = await CardApi.addUser({
                cardId: card.id,
                cardListId: cardList.id,
                boardId: context.currentBoard?.id,
                userEmail: user.email,
            });
            const newUser: UserResponse = {
                email: newUserResponse.data.email,
                firstName: newUserResponse.data.firstName,
                lastName: newUserResponse.data.lastName
            };

            if(context.currentBoard) {
                const updatedCardLists = context.currentBoard.cardLists.map(cardList => {
                    return {
                        ...cardList,
                        cards: cardList.cards.map(cardInList => {
                            if (cardInList.id === card.id) {
                                return {
                                    ...cardInList,
                                    executors: [...cardInList.executors, newUser],
                                };
                            }
                            return cardInList;
                        }),
                    };
                });

                context.currentBoardModifier({
                    ...context.currentBoard,
                    cardLists: updatedCardLists,
                });
                sendMessage(context.currentBoard.id.toString())
            }
            toast.success("User Added");
        } catch {

            toast.error("Error server");
        }

    };
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
                description: newDescription,
                orderNumber: card.orderNumber
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
                    <div
                        className="card-executors"
                    >
                        {card.executors.map((user, userIndex) => (
                            <Avatar
                                key={user.email}
                                alt={user.firstName ? user.firstName.toUpperCase() : ''}
                                sx={{
                                    width: 24,
                                    height: 24,
                                    marginRight: 2
                                }}
                                src="/static/images/avatar/2.jpg"
                            />
                        ))}
                    </div>
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
                            <StyledAddButton onClick={handleClick} color={"secondary"}>
                                <AddIcon />
                            </StyledAddButton>
                        </TitleContainer>
                        <BodyContainer>
                            <Box sx={{ display: 'flex', alignItems: 'center', mt: 2, mb: 2 }}>
                                {card.executors.map((user, index) => (
                                    <Avatar key={index} alt={user.firstName ? user.firstName.toUpperCase(): ''} src="/static/images/avatar/2.jpg" />
                                ))}
                                <Menu
                                    id="simple-menu"
                                    anchorEl={anchorEl}
                                    keepMounted
                                    open={Boolean(anchorEl)}
                                >
                                    {context.currentBoard?.users.map((user) => (
                                        <MenuItem data-no-dnd="true" key={user.email} onClick={() => handleCloseUserMenu(user)}>{user.email}</MenuItem>
                                    ))}
                                </Menu>
                            </Box>
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
                                    placeholder="Description"
                                />
                            ) : (
                                <StyledTypography fontSize={"small"} id="modal-modal-description" variant="h6" onClick={handleDescriptionClick}>
                                    {card.description ? card.description : "Add a more detailed description..."}
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