import React, {useCallback, useContext, useEffect, useState} from "react";
import {toast} from "react-toastify";
import {Card} from "react-bootstrap";
import {BoardApi} from "../../api/BoardApi";
import TestImage from "../../image.jpg"
import {useNavigate} from "react-router-dom";
import {BoardResponse} from "../../models/api/BoardResponse";
import {BoardContext} from "../../context/BoardContext";
import { Board } from "../../models/Board";


const Boards = () => {
    const navigate = useNavigate()
    const [boards, setBoards] = useState<BoardResponse[]>([]);
    const context = useContext(BoardContext)

    const handleBoardClick = (board: Board) =>{
        context.currentBoardModifier({id: board.id, title: board.title, cardLists: board.cardLists})
        navigate(`/board/${board.id}`)
    }


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
                        <Card.Body onClick={()=> handleBoardClick(board)}>
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