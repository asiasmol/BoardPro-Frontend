import React, {SyntheticEvent, useCallback, useContext, useEffect, useState} from "react";
import AddNewCardList from "../cardList/AddNewCardList";
import { BoardContext } from "../../context/BoardContext";
import {
    closestCorners,
    DndContext,
    DragEndEvent,
    DragOverlay,
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
import {Container, CustomAppBar, StyledAutocomplete, StyledBox, StyledButton, StyledPersonAddAltIcon} from "./Board.styles";
import {Avatar, Button, List, ListItem, ListItemText, Modal, TextField, Toolbar, Typography} from "@mui/material";
import {UserResponse} from "../../api/apiModels/UserResponse";
import {UserApi} from "../../api/UserApi";
import {toast} from "react-toastify";
import {ThemeContext} from "../../context/ThemeContext";
import {BoardApi} from "../../api/BoardApi";
import {UserContext} from "../../context/UserContext";

const Board = () => {
    const [open, setOpen] = React.useState(false);
    const [users, setUsers] = useState<UserResponse[]>([]);
    const context = useContext(BoardContext)
    const [userEmail, setUserEmail] = useState<string>("");
    const {currentUser, currentUserModifier} = useContext(UserContext);
    const theme = useContext(ThemeContext)
    const [cards, setCards] = useState<CardResponse[]>([]);
    const [activeItem, setActiveItem] = useState<CardResponse>()
    const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor), useSensor(KeyboardSensor, {coordinateGetter: sortableKeyboardCoordinates,}));
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

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
                    console.log('REMOVE CARD ID', removedCard.id)
                    console.log('ACTIVE CARD INDEX', activeCardIndex)
                    console.log('OVER CARD INDEX ', overCardIndex)
                    console.log('ACTIVE CARD INDEX - OVER CARD INDEX = ', activeCardIndex - overCardIndex)
                    if(activeCardIndex - overCardIndex <= 0){
                        targetList.cards.splice(overCardIndex + 1, 0, removedCard);
                    }
                    else {
                        targetList.cards.splice(overCardIndex, 0, removedCard);
                    }
                } else {
                    targetList.cards.push(removedCard);
                }
                updateListWithNewCards(targetList, targetList.cards);
            }
            return;
        }
        targetList = context.currentBoard?.cardLists.find(list => list.cards.length === 0);
        if (targetList && !targetList.cards.some(card => card.id === removedCard.id)) {
            if (overCardIndex === -1) {
                targetList.cards.splice(overCardIndex, 0, removedCard);
            } else {
                targetList.cards.push(removedCard);
            }
            updateListWithNewCards(targetList, targetList.cards);
        }
    };

    const handleDragStart = (event: DragStartEvent) => {
        const { active } = event
        setActiveItem(cards.find((item) => item.id === active.id))
    }

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
            context.updateCardLists(updatedCardList);

            if (context.currentCardList && list.id === context.currentCardList.id) {
                context.currentCardListModifier({...context.currentCardList, cards: newCards});
            }
        }
    }

    const fetchUsers = useCallback(async () => {
        try {
            const response = await UserApi.getAllUsers();
            setUsers(response.data)
        } catch {
            toast.error("Bład serwera")
        }

    }, []);

    const filterOptions = (options: string[], { inputValue }: { inputValue: string }) =>
        inputValue.length >= 1
            ? options.filter((option) =>
                option.toLowerCase().includes(inputValue.toLowerCase())
            )
            : [];


    const addUser = async (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        try {
            const newUserResponse = await BoardApi.addUser({
                userEmail: userEmail,
                boardId: context.currentBoard?.id
            });
            const newUser: UserResponse = {
                email: newUserResponse.data.email,
                firstName: newUserResponse.data.firstName,
                lastName: newUserResponse.data.lastName
            };
            if(context.currentBoard) {
                const updatedUserList = [...context.currentBoard.users, newUser]
                context.currentBoardModifier({
                    ...context.currentBoard,
                    users: updatedUserList,
                });
                setUsers(updatedUserList);
            }
            toast.success("Dodano Uzytkownika");
        } catch {
            toast.error("Błąd serwera przy dodawaniua uzytkownika");
        }
    };

    const handleDeleteUser = async (userEmail: string) => {
        try {
            if (!context.currentBoard) {
                return;
            }

            await BoardApi.removeUser({
                userEmail: userEmail,
                boardId: context.currentBoard.id
            });

            const updatedUserList = context.currentBoard.users.filter((u) => u.email !== userEmail);
            context.currentBoardModifier({
                ...context.currentBoard,
                users: updatedUserList,
            });
            setUsers(updatedUserList);
            toast.success("Usunięto użytkownika z borda");
        } catch (error) {
            toast.error("Błąd serwera podczas usuwania użytkownika");
        }
    }
    useEffect(() => {
        setCards(context.currentCardList?.cards || []);
    }, [context.currentCardList]);

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers])


    return (
        <>
            <CustomAppBar position="static" color="secondary" enableColorOnDark>
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        {context.currentBoard?.title}
                    </Typography>
                    <StyledPersonAddAltIcon fontSize={"large"} onClick={handleOpen}/>
                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <StyledBox bgcolor={theme.theme.palette.background.paper}>
                            <Typography id="modal-modal-title" variant="h6" component="h2">
                                Dodaj użytkownika
                            </Typography>
                                <Container>
                                    <StyledAutocomplete
                                        disablePortal
                                        id="combo-box-demo"
                                        options={users.map((user) => user.email)}
                                        renderInput={(params:UserResponse) => <TextField {...params} label="Users" />}
                                        onInputChange={(event : SyntheticEvent, value : string) => {
                                            setUserEmail(value);
                                        }}
                                        filterOptions={filterOptions}
                                    />
                                    <StyledButton type="submit" onClick={addUser} variant="contained">Dodaj</StyledButton>
                                </Container>
                            <Typography variant="subtitle1" gutterBottom>
                                Użytkownicy
                            </Typography>
                            <List>
                                {context.currentBoard?.users.map((user) => (
                                    <ListItem key={user.email}>
                                        <Avatar key={user.email} alt={user.firstName ? user.firstName.toUpperCase() : ''} sx={{ mr: 4 }} src="/static/images/avatar/2.jpg" />
                                        <ListItemText
                                            primary={
                                                <>
                                                    <Typography variant="h6" component="span">
                                                        {user.firstName} {user.lastName}
                                                    </Typography>
                                                    <Typography variant="body2" component="p" color="text.secondary">
                                                        {user.email}
                                                    </Typography>
                                                </>
                                            }
                                        />
                                        {context.currentBoard?.owner.email === currentUser?.email && ( // Sprawdź, czy currentUser jest właścicielem currentBoard
                                            <Button
                                                variant="contained"
                                                color="secondary"
                                                onClick={() => handleDeleteUser(user.email)}
                                            >
                                                DELETE
                                            </Button>
                                        )}
                                    </ListItem>
                                ))}
                            </List>
                        </StyledBox>
                    </Modal>
                    {context.currentBoard?.users.map((user, index) => (
                        <Avatar key={user.email} alt={user.firstName ? user.firstName.toUpperCase() : ''} sx={{ mr: 4 }} src="/static/images/avatar/2.jpg" />
                    ))}
                </Toolbar>


            </CustomAppBar>

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
