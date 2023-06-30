import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {DropdownButton, Form} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import {SyntheticEvent, useState} from "react";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";
import {BoardApi} from "../api/BoardApi";


const Header = () => {
    const [title, setTitle] = useState('');
    const navigate = useNavigate()
    const submitHandler = async (e: SyntheticEvent) => {
        e.preventDefault()
        await BoardApi.createBoard({
            title: title
        })
        toast.success("Utworzono Tablice");
        navigate("/board");
    }

    return (
        <Navbar bg='dark' variant='dark' expand="lg" collapseOnSelect>
            <Container>
                <Navbar.Brand href="/">BoardPro</Navbar.Brand>
                <DropdownButton variant="info" id="dropdown-basic-button" title="Create">
                    <Container>
                        <Form onSubmit={submitHandler}>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Control type="title" placeholder="title"
                                              value={title}
                                              onChange={e=>setTitle(e.target.value)}/>
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                        </Form>
                    </Container>
                </DropdownButton>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        <Nav.Link href="/signup">Sign Up</Nav.Link>
                        <Nav.Link href="/login">Login</Nav.Link>

                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Header