
import {SyntheticEvent, useCallback, useContext, useState} from "react";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";
import {BoardApi} from "../../api/BoardApi";
import {UserContext} from "../../context/UserContext";
import * as React from 'react';
import {
    Box,
    Button,
    Menu,
    Switch,
    TextField,
    Toolbar,
    Typography
} from "@mui/material";
import { CustomAppBar } from "./Navbar.styles";
import {ThemeContext} from "../../context/ThemeContext";



const Navbar = () => {
    const [title, setTitle] = useState('');
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const open = Boolean(anchorEl);
    const navigate = useNavigate();
    const {currentUser, currentUserModifier} = useContext(UserContext);
    const id = open ? 'simple-popover' : undefined;
    const { toggleTheme } = useContext(ThemeContext);
    const [checked, setChecked] = React.useState(true);


    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChecked(event.target.checked);
        toggleTheme()
    };
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const submitHandler = async (e: SyntheticEvent) => {
        e.preventDefault()
        await BoardApi.createBoard({
            title: title
        })
        toast.success("Utworzono Tablice");
        navigate("/boards")
        handleClose();
    }

    const logout = useCallback(() => {
        currentUserModifier(null);
        localStorage.removeItem('ACCESS_TOKEN')
        navigate("/");
    }, [navigate])



    return (
        <CustomAppBar position="static">
            <Toolbar>
                <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                    Powerboard
                </Typography>
                {currentUser ?
                    <>
                        <Button color="secondary" variant="contained" aria-describedby={id} onClick={handleClick}>
                            Create
                        </Button>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorEl}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={open}
                            onClose={handleClose}
                        >
                            <Box sx={{p: 2}}>
                                <form onSubmit={submitHandler}>
                                    <TextField id="outlined-basic" label="Title" variant="outlined" value={title}
                                               onChange={e => setTitle(e.target.value)}/>
                                    <Button variant="contained" type="submit" sx={{mt: 2}}>Save</Button>
                                </form>
                            </Box>
                        </Menu>
                        <Switch
                            color="warning"
                            checked={checked}
                            onChange={handleChange}
                            inputProps={{ 'aria-label': 'controlled' }}
                        />
                        <Button color="inherit" href="/boards">Boards</Button>
                        <Button color="inherit" onClick={logout}>Logout</Button>
                    </> :
                    <>
                        <Button color="inherit" href="/login">Login</Button>
                        <Button color="secondary" variant="contained" href="/signup">Sign Up</Button>
                        <Switch
                            color="warning"
                            checked={checked}
                            onChange={handleChange}
                            inputProps={{ 'aria-label': 'controlled' }}
                        />
                    </>}
            </Toolbar>
        </CustomAppBar>
    );
}

export default Navbar