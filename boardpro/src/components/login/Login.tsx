import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FormContainer from "../FormContainer";
import {SyntheticEvent, useContext, useState} from 'react';
import {useNavigate} from "react-router-dom";
import { toast } from "react-toastify";
import {AuthApi} from "../../api/AuthApi";
import {ACCESS_TOKEN} from "../../constants/constants";
import {UserContext} from "../../context/UserContext";

const Login = () => {
    const navigate = useNavigate()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const context = useContext(UserContext)



    const submitHandler = async (e: SyntheticEvent) => {
        e.preventDefault()
        const response = await AuthApi.signIn({
                email : email,
                password: password
        })
        localStorage.setItem(ACCESS_TOKEN, response.data.token);
        context.currentUserModifier({email: email, firstname: "Paweł"})
        toast.success("Poprawnie zalogowano");
        navigate('/');
    }
    return (
        <FormContainer>
            <h1>Login</h1>
        <Form onSubmit={submitHandler}>
            <Form.Group className="my-3" controlId="email">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter your email"
                              value={email}
                                onChange={e=>setEmail(e.target.value)}/>
            </Form.Group>

            <Form.Group className="my-3" controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password"
                              value={password}
                              onChange={e=>setPassword(e.target.value)}/>
            </Form.Group>
            <Button variant="primary" type="submit" className="my-3">
                Submit
            </Button>
        </Form>
        </FormContainer>
    );
}

export default Login