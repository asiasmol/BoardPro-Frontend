import Button from "react-bootstrap/Button";
import {Form} from "react-bootstrap";
import React, {useState} from "react";
import {toast} from "react-toastify";
import {CardListApi} from "../../api/CardListApi";


interface Props {
    boardId : number | undefined
}
const AddNewCardList = ({boardId}: Props) => {

    const [showForm, setShowForm] = useState(false);
    const [title, setTitle] = useState('');

    const createCardList = async (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        console.log(boardId)
        try {
            await CardListApi.createCardList({
                title: title
            }, boardId);
            console.log(title)
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

    const handleSubmit = async (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        console.log('Wprowadzony tytuł:', title);
        setShowForm(false);
        setTitle('');

    };

    return (
        <div>
            {!showForm && (
                <Button variant="success" onClick={handleButtonClick} style={{ width: '18rem', borderRadius: '2rem'}}>
                Add Card
                </Button>
            )}
            {showForm && (
                <Form onSubmit={createCardList}>
                    <Form.Group className="mb-5" controlId="formBasicEmail">
                        <Form.Control type="text" placeholder="Title" value={title} onChange={handleInputChange}/>
                    </Form.Group>
                    <Button variant="primary" type="submit" style={{ width: '18rem', borderRadius: '15px' }}>
                    Submit
                    </Button>
                </Form>
            )}
        </div>
)
}

export default AddNewCardList;

