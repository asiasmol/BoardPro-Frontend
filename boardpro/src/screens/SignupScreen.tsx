import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import FormContainer from "../components/FormContainer";
import {SyntheticEvent, useState} from "react";
import {useNavigate} from "react-router-dom"
import {AuthApi} from "../api/AuthApi";
import {SignUpRequest} from "../models/api/SignUpRequest";
import {toast} from "react-toastify";

const SignupScreen = () => {
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
        <FormContainer>
            <h1>Sign Up</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group className="my-3" controlId="firstName">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control placeholder="Enter your first name"
                                  value={firstName}
                                  onChange={e=>setFirstName(e.target.value)}/>
                </Form.Group>

                <Form.Group className="my-3" controlId="lastName">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control placeholder="Enter your last name"
                                  value={lastName}
                                  onChange={e=>setLastName(e.target.value)}/>
                </Form.Group>

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
    )
}

export default SignupScreen