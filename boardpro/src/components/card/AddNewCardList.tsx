import Button from "react-bootstrap/Button";
import {Form} from "react-bootstrap";
import React, {useContext, useEffect, useState} from "react";
import {toast} from "react-toastify";
import {CardListApi} from "../../api/CardListApi";
import {BoardContext} from "../../context/BoardContext";
import {CardListResponse} from "../../models/api/CardListResponse";



const AddNewCardList = () => {

    const [showForm, setShowForm] = useState(false);
    const [title, setTitle] = useState('');
    const context = useContext(BoardContext)
    const [cardListAdded, setCardListAdded] = useState(false);

    const createCardList = async (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        try {
            const newCardListResponse =  await CardListApi.createCardList({
                title: title
            }, context.currentBoard?.id);

            const newCardList: CardListResponse = {
                id: newCardListResponse.data.id,
                title: newCardListResponse.data.title,
                cards: []
            };

            if (context.currentBoard) {
                const updatedCardLists = [...context.currentBoard.cardLists, newCardList];

                context.currentBoardModifier({
                    ...context.currentBoard,
                    cardLists: updatedCardLists
                });
            }
            setCardListAdded(true)
            toast.success("Dodano Karte");
        } catch {
            toast.error("Błąd serwera tutaj");
        }
    };


    const handleButtonClick = () => {
        setShowForm(true);
    };

    const handleCancelClick = () => {
        setShowForm(false);
    }

    const handleInputChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setTitle(event.target.value);
    };

    useEffect(() => {
        if (cardListAdded) {
            setShowForm(false);
            setTitle("");
            setCardListAdded(false);
        }
    }, [cardListAdded]);


    return (
        <div>
            {!showForm && (
                <Button variant="success" onClick={handleButtonClick} style={{ width: '18rem', borderRadius: '0.5rem'}}>
                + Dodaj kolejną listę
                </Button>
            )}
            {showForm && (
                <Form onSubmit={createCardList}>
                    <Form.Group className="mb-5" controlId="formBasicEmail">
                        <Form.Control type="text" placeholder="Title" value={title} onChange={handleInputChange}/>
                    </Form.Group>
                    <Button variant="primary" type="submit" style={{ width: '10rem', borderRadius: '0.5rem' }}>
                        Submit
                    </Button>
                    <Button onClick={handleCancelClick} variant="primary" type="button" style={{ width: '10rem', borderRadius: '0.5rem' }}>
                        Cancel
                    </Button>
                </Form>
            )}
        </div>
)
}

export default AddNewCardList;

