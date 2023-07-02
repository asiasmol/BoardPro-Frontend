import React, {useCallback, useEffect, useState} from "react";
import {BoardApi} from "../../api/BoardApi";
import {toast} from "react-toastify";
import {BoardResponse} from "../../models/api/BoardResponse";
import {useParams} from "react-router-dom";
import {Card} from "react-bootstrap";
import HoverableCardText from "./HoverableCardText"
import AddNewCard from "../card/AddNewCard";
import AddNewCardList from "../card/AddNewCardList";


const Board = () => {
    const { id } = useParams()
    const [board, setBoard] = useState<BoardResponse | null>(null);

    const fetchBoard = useCallback(async () => {
        if (id) {
            try {
                const response = await BoardApi.getBoard({
                    boardId: id
                });
                setBoard(response.data);
            } catch (error) {
                toast.error("Błąd serwera");
            }
        }
    }, [id]);


    useEffect(() => {
        fetchBoard();
    }, [fetchBoard])




    return (
        <>
            <h2>{board?.title}</h2>
            <div style={{ display: 'flex', gap: '1rem' }}>
                <Card bg="dark" text="white" style={{ width: '18rem', borderRadius: '15px' }} className="mb-3">
                    <Card.Header>DO ZROBIENIA</Card.Header>
                    <Card.Body>
                        <HoverableCardText text="TESTTESTTEST" />
                        <HoverableCardText text="TESTTESTTEST" />
                        <AddNewCard />
                    </Card.Body>
                </Card>

                <Card bg="dark" text="white" style={{ width: '18rem', borderRadius: '15px' }} className="mb-3">
                    <Card.Header>DO ZROBIENIA</Card.Header>
                    <Card.Body>
                        <HoverableCardText text="TESTTESTTEST" />
                        <HoverableCardText text="TESTTESTTEST" />
                        <AddNewCard />
                    </Card.Body>
                </Card>

                <AddNewCardList boardId={board?.id}/>

            </div>
        </>
    )

}

export default Board