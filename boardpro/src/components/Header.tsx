import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {DropdownButton, Form} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import {SyntheticEvent, useCallback, useContext, useState} from "react";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";
import {BoardApi} from "../api/BoardApi";
import {UserContext} from "../context/UserContext";


const Header = () => {
    const navigate = useNavigate()
    const {currentUser, currentUserModifier} = useContext(UserContext)
    const [title, setTitle] = useState('');

    const submitHandler = async (e: SyntheticEvent) => {
        e.preventDefault()
        await BoardApi.createBoard({
            title: title
        })
        toast.success("Utworzono Tablice");
        navigate("/boards");
    }

    const logout = useCallback(() => {
        currentUserModifier(null);
        localStorage.removeItem('ACCESS_TOKEN')

        navigate("/");
    }, [navigate]);

    return (
        <Navbar bg='dark' variant='dark' expand="lg" collapseOnSelect>
            <Container>
                <Navbar.Brand href="/">BoardPro</Navbar.Brand>
                {currentUser&& <DropdownButton variant="info" id="dropdown-basic-button" title="Create">
                    <Container>
                        <Form onSubmit={submitHandler}>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Control type="title" placeholder="title"
                                              value={title}
                                              onChange={e => setTitle(e.target.value)}/>
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                        </Form>
                    </Container>
                </DropdownButton>}
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        { !currentUser ? <>
                                <Nav.Link href="/signup">Sign Up</Nav.Link>
                                <Nav.Link href="/login">Login</Nav.Link>
                            </> : <>
                                <Nav.Link onClick={()=>{logout()}}>Logout</Nav.Link>
                                <Nav.Link href="/login">{currentUser.email}</Nav.Link>
                            </>
                        }

                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Header