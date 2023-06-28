import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FormContainer from "../components/FormContainer";


const LoginScreen = () => {
    return (
        <FormContainer>
        <Form>
            <Form.Group className="mb-3" controlId="email">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter your email" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
            </Form.Group>
            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
        </FormContainer>
    )
}

export default LoginScreen