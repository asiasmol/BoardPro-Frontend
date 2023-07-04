import "./AddNewCard.css"
import React, {useState} from "react";
import {toast} from "react-toastify";
import Button from "react-bootstrap/Button";
import {Form} from "react-bootstrap";
import {CardApi} from "../../api/CardApi";

interface Props{
    cardListId: number,
    boardId: number | undefined
}
const AddNewCard = ({cardListId, boardId}: Props) => {

    const [showForm, setShowForm] = useState(false);
    const [title, setTitle] = useState('');

    const createCard = async (event: { preventDefault: () => void; }) => {
        event.preventDefault();

        try {
            await CardApi.createCard({
                title: title
            }, cardListId, boardId);
            toast.success("Dodano Karte");
        } catch {
            toast.error("Błąd serwera tutaj");
        }
    };


    const handleButtonClick = () => {
        setShowForm(true);
    };

    const handleInputChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setTitle(event.target.value);
    };


    return (
        <div>
            {!showForm && (
                <Button variant="success" onClick={handleButtonClick} style={{ width: '15rem', borderRadius: '0.5rem'}}>
                    + Dodaj karte
                </Button>
            )}
            {showForm && (
                <Form onSubmit={createCard}>
                    <Form.Group className="mb-5" controlId="formBasicEmail">
                        <Form.Control type="text" placeholder="Title" value={title} onChange={handleInputChange}/>
                    </Form.Group>
                    <Button variant="primary" type="submit" style={{ width: '15rem', borderRadius: '0.5px' }}>
                        Submit
                    </Button>
                </Form>
            )}
        </div>
    )
}

export default AddNewCard;