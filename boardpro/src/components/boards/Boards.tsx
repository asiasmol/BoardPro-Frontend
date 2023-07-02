import React, {useCallback, useEffect, useState} from "react";
import {toast} from "react-toastify";
import {Card} from "react-bootstrap";
import {BoardApi} from "../../api/BoardApi";
import TestImage from "../../image.jpg"
import {useNavigate} from "react-router-dom";
import {BoardResponse} from "../../models/api/BoardResponse";

const Boards = () => {
    const navigate = useNavigate()
    const [boards, setBoards] = useState<BoardResponse[]>([]);


    const fetchBoards = useCallback(async () => {
        try {
            const response = await BoardApi.getBoards();
            setBoards(response.data)
        } catch {
            toast.error("Bład serwera")
        }

    }, []);


    useEffect(() => {
        fetchBoards();
    }, [fetchBoards])

    if(boards.length === 0){
        return(
            <h1>Brak boardów</h1>
        )
    }


    return (
            <>
                {boards.map((board, index) => (
                    <Card key={index} >
                        <Card.Img variant="top" src={TestImage} style={{ width: 'auto', height: '180px' }} />
                        <Card.Body onClick={()=> navigate(`/board/${board.id}`)}>
                            <Card.Text>
                                {board.title}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                ))}
            </>
            )
}

export default Boards