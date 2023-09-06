import {SyntheticEvent, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom"
import {AuthApi} from "../../api/AuthApi";
import {SignUpRequest} from "../../api/apiModels/SignUpRequest";
import {toast} from "react-toastify";
import {Box, Button, Container, Grid, TextField, Typography, Link} from "@mui/material";
import {StyledContainer, ValidationError} from "./Signup.styles";

const Signup = () => {
    const navigate = useNavigate()
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatedPassword, setRepeatedPassword] = useState('')
    const [isEmailValid, setIsEmailValid] = useState<boolean>(true);
    const [isPasswordValid, setIsPasswordValid] = useState<boolean>(true);
    const [isRepeatedPasswordValid, setIsRepeatedPasswordValid] = useState<boolean>(true);
    const [isDataValid, setIsDataValid] = useState<boolean>(false);


    const submitHandler = async (e: SyntheticEvent) => {
        e.preventDefault()
        let user: SignUpRequest = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password,
        }
        AuthApi.signUp(user).then(r => {
        })
        toast.success("SignUp");
        navigate("/login");
    }

    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validatePassword = (password: string) => {
        const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
        return passwordRegex.test(password);
    }

    const validateRepeatedPassword = (repeatedPassword: string) => {
        return password == repeatedPassword;
    };

    useEffect(() => {
        setIsEmailValid(validateEmail(email));
        setIsPasswordValid(validatePassword(password));
        setIsRepeatedPasswordValid(validateRepeatedPassword(repeatedPassword));
        setIsDataValid((isPasswordValid && isEmailValid && isRepeatedPasswordValid))
    }, [email, password, repeatedPassword, isPasswordValid, isEmailValid, isRepeatedPasswordValid]);
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
                    Signup
                </Typography>
                <Box component="form" onSubmit={submitHandler} noValidate sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="firstName"
                        label="firstName"
                        name="firstName"
                        autoComplete="firstName"
                        autoFocus
                        value={firstName}
                        onChange={e=>setFirstName(e.target.value)}
                    />

                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="lastName"
                        label="lastName"
                        name="lastName"
                        autoComplete="lastName"
                        autoFocus
                        value={lastName}
                        onChange={e=>setLastName(e.target.value)}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="email"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        value={email}
                        onChange={e=>setEmail(e.target.value)}
                    />
                    {!isEmailValid && email.length !== 0 && <ValidationError>Podaj poprawny adres email</ValidationError>}

                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        value={password}
                        onChange={e=>setPassword(e.target.value)}
                    />
                    {!isPasswordValid && password.length !== 0 && <ValidationError>Hasło musi mieć co najmniej 8 znaków i zawierać jedną cyfrę, jedną małą i jedną dużą literę</ValidationError>}

                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="repeatedPassword"
                        label="repeatedPassword"
                        type="password"
                        id="repeatedPassword"
                        autoComplete="current-password"
                        value={repeatedPassword}
                        onChange={e=>setRepeatedPassword(e.target.value)}
                    />
                    {!isRepeatedPasswordValid && password.length !== 0 && <ValidationError>Hasła nie są zgodne</ValidationError>}

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        disabled={!isDataValid}
                    >
                        Signup
                    </Button>


                    <Grid container>
                        <Grid item>
                            <Link href="/login" variant="body2">
                                {"Masz już konto? Zaloguj się"}
                            </Link>
                        </Grid>
                    </Grid>

                </Box>
            </Box>
            </StyledContainer>
        </Container>

    )
}

export default Signup