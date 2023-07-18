import React, {useCallback, useContext, useEffect, useState} from "react";
import {toast} from "react-toastify";

import {BoardApi} from "../../api/BoardApi";
import TestImage from "../../image.jpg"
import {useNavigate} from "react-router-dom";
import {BoardResponse} from "../../api/apiModels/BoardResponse";
import {BoardContext} from "../../context/BoardContext";

import {
    Container,
    StyledBox,
    StyledCard, StyledCardContent, StyledCardMedia
} from "./Boards.styles";
import {CardActionArea, Typography} from "@mui/material";


const Boards = () => {
    const navigate = useNavigate()
    const [boards, setBoards] = useState<BoardResponse[]>([]);
    const context = useContext(BoardContext)

    const handleBoardClick = (board: BoardResponse) =>{
        context.currentBoardModifier({id: board.id, title: board.title, cardLists: board.cardLists, users: board.users})
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
        <Container>
            {boards.map((board, index) => (
                <StyledCard key={index}>
                    <CardActionArea onClick={()=> handleBoardClick(board)}>
                        <StyledBox>
                            <StyledCardContent>
                                <Typography component="div" variant="h5">
                                    {board.title}
                                </Typography>
                                <Typography variant="subtitle1" color="text.secondary" component="div">
                                    Mac Miller
                                </Typography>
                            </StyledCardContent>
                        </StyledBox>
                        <StyledCardMedia
                            component="img"
                            image={TestImage}
                            alt="Live from space album cover"
                        />
                    </CardActionArea>
                </StyledCard>
            ))}
        </Container>


    )
}

export default Boards