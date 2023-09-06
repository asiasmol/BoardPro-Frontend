import React, {SyntheticEvent, useCallback, useContext, useEffect, useState} from "react";
import { BoardContext } from "../../context/BoardContext";
import {Container, CustomAppBar, StyledAutocomplete, StyledBox, StyledButton, StyledPersonAddAltIcon} from "./Board.styles";
import {Avatar, Button, List, ListItem, ListItemText, Modal, TextField, Toolbar, Typography} from "@mui/material";
import {UserResponse} from "../../api/apiModels/UserResponse";
import {UserApi} from "../../api/UserApi";
import {toast} from "react-toastify";
import {ThemeContext} from "../../context/ThemeContext";
import {BoardApi} from "../../api/BoardApi";
import {UserContext} from "../../context/UserContext";
import {sendMessage} from "../message/MessageSender";
const NavbarBoard = () => {
    const [open, setOpen] = React.useState(false);
    const [users, setUsers] = useState<UserResponse[]>([]);
    const [userEmail, setUserEmail] = useState<string>("");
    const {currentUser, currentUserModifier} = useContext(UserContext);
    const theme = useContext(ThemeContext)
    const context = useContext(BoardContext)
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

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
                sendMessage(context.currentBoard.id.toString())
            }
            toast.success("Dodano Uzytkownika");
        } catch {
            toast.error("Błąd serwera przy dodawaniua uzytkownika");
        }
    };

    const deleteUser = async (userEmail: string) => {
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
        fetchUsers();
    }, [fetchUsers])


    return (
            <CustomAppBar position="fixed" color="secondary" enableColorOnDark>
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
                                                onClick={() => deleteUser(user.email)}
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
    );
};

export default NavbarBoard;