import { Container, Row, Col } from "react-bootstrap";
import React from "react";

interface FormContainerProps {
    children: React.ReactNode;

}

const FormContainer= ({ children }: FormContainerProps) => {
    return (
        <Container className='py-3'>
            <Row className='justify-content-md-center'>
                <Col xs={12} md={6}>
                    {children}
                </Col>
            </Row>
        </Container>
    )
}

export default FormContainer;