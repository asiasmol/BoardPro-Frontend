import {SyntheticEvent, useState} from "react";
import {useNavigate} from "react-router-dom"
import {AuthApi} from "../../api/AuthApi";
import {SignUpRequest} from "../../api/apiModels/SignUpRequest";
import {toast} from "react-toastify";
import {Box, Button, Container, CssBaseline, Grid, TextField, Typography, Link} from "@mui/material";

const Signup = () => {
    const navigate = useNavigate()
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

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
        toast.success("Poprawnie zarejestrowano");
        navigate("/login");
    }
    return (

        <Container component="main" maxWidth="xs">

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
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
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
        </Container>

    )
}

export default Signup