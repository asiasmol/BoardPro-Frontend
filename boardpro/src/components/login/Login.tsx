import {SyntheticEvent, useContext, useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import { toast } from "react-toastify";
import {AuthApi} from "../../api/AuthApi";
import {ACCESS_TOKEN} from "../../constants/constants";
import {UserContext} from "../../context/UserContext";
import {Box, Button, Container, TextField, Typography} from "@mui/material";
import {StyledContainer, ValidationError} from "./Login.styles";
const Login = () => {
    const navigate = useNavigate()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const context = useContext(UserContext)
    const [isEmailValid, setIsEmailValid] = useState<boolean>(true);
    const [isPasswordValid, setIsPasswordValid] = useState<boolean>(true);
    const [isDataValid, setIsDataValid] = useState<boolean>(false);


    const submitHandler = async (e: SyntheticEvent) => {
        e.preventDefault()
        const response = await AuthApi.signIn({
            email : email,
            password: password
        })
        const user = {email: email, firstname:"imie"};
        localStorage.setItem(ACCESS_TOKEN, response.data.token);
        localStorage.setItem('currentUser', JSON.stringify((user)));
        context.currentUserModifier(user)
        toast.success("Poprawnie zalogowano");
        navigate('/');
    }

    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validatePassword = (password: string) => {
        const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
        return passwordRegex.test(password);
    }

    useEffect(() => {
        setIsEmailValid(validateEmail(email));
        setIsPasswordValid(validatePassword(password));
        setIsDataValid((isPasswordValid && isEmailValid))
    }, [email, password, isPasswordValid, isEmailValid]);

    return (

        <Container component="main" maxWidth="xs">
        <StyledContainer>
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Typography component="h1" variant="h5">
                    Login
                </Typography>
                <Box component="form" onSubmit={submitHandler}>

                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email"
                        name="email"
                        autoComplete="email"
                        value={email}
                        onChange={e=>setEmail(e.target.value)}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Hasło"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        value={password}
                        onChange={e=>setPassword(e.target.value)}
                    />
                    <Button type="submit" fullWidth variant="contained" disabled={!isDataValid}>
                        Login
                    </Button>

                </Box>
            </Box>
        </StyledContainer>
        </Container>
    );
}

export default Login