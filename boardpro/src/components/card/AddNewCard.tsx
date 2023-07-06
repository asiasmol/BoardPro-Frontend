import "./AddNewCard.css"
import React, {useContext, useEffect, useState} from "react";
import {toast} from "react-toastify";
import Button from "react-bootstrap/Button";
import {Form} from "react-bootstrap";
import {CardApi} from "../../api/CardApi";
import {BoardContext} from "../../context/BoardContext";
import {CardResponse} from "../../models/api/CardResponse";

interface Props{
    cardListId: number,
}
const AddNewCard = ({cardListId}: Props) => {

    const [showForm, setShowForm] = useState(false);
    const [title, setTitle] = useState('');
    const context = useContext(BoardContext)
    const [cardAdded, setCardAdded] = useState(false);

    const createCard = async (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        try {
            const newCardResponse = await CardApi.createCard({
                title: title
            }, context.currentBoard?.id, cardListId);

            const newCard: CardResponse = {
                id:newCardResponse.data.id,
                title: newCardResponse.data.title};

            if(context.currentBoard) {
                const updatedCardList = context.currentBoard.cardLists.map(list => {
                    if (list.id === cardListId) {
                        return {...list, cards: [...list.cards, newCard]};
                    }
                    else return list
                })

                context.currentBoardModifier({
                    ...context.currentBoard,
                    cardLists: updatedCardList,
                });
            }
            setCardAdded(true)
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

    const handleCancelClick = () => {
        setShowForm(false);
    }

    useEffect(() => {
        if (cardAdded) {
            setShowForm(false);
            setTitle("");
            setCardAdded(false);
        }
    }, [cardAdded]);


    return (
        <div>
            {!showForm && (
                <Button variant="success" onClick={handleButtonClick} style={{ width: '16rem', borderRadius: '0.5rem'}}>
                    + Dodaj karte
                </Button>
            )}
            {showForm && (
                <Form onSubmit={createCard}>
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

export default AddNewCard;