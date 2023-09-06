import React, {useCallback, useContext, useEffect, useState} from "react";
import {toast} from "react-toastify";

import {BoardApi} from "../../api/BoardApi";
import {useNavigate} from "react-router-dom";
import {BoardResponse} from "../../api/apiModels/BoardResponse";
import {BoardContext} from "../../context/BoardContext";
import {Container, Loader, LoaderContainer, StyledBox, StyledCard, StyledCardContent, StyledCardMedia, TitleContainer} from "./Boards.styles";
import {CardActionArea, Typography} from "@mui/material";
import {ThemeContext} from "../../context/ThemeContext";


const Boards = () => {
    const navigate = useNavigate()
    const [boards, setBoards] = useState<BoardResponse[]>([]);
    const context = useContext(BoardContext)
    const [isLoading, setIsLading] = useState<boolean>(false)
    const theme = useContext(ThemeContext);

    const handleBoardClick = (board: BoardResponse) =>{
        context.currentBoardModifier({id: board.id, title: board.title, cardLists: board.cardLists, users: board.users, owner: board.owner, imagePath: board.imagePath})
        navigate(`/board/${board.id}`)
    }


    const fetchBoards = useCallback(async () => {
        setIsLading(true)
        try {
            const response = await BoardApi.getBoards();
            setBoards(response.data)
            setIsLading(false)
        } catch {
            toast.error("Server error")
        }

    }, []);


    useEffect(() => {
        fetchBoards();
    }, [fetchBoards])

    if (boards.length === 0) {
        return(
            <>
                {isLoading ?
                    <LoaderContainer>
                        <Loader color={theme.theme.palette.secondary.main}/>
                    </LoaderContainer>
                    : (
                        <TitleContainer>
                            <h1>No boards available</h1>
                        </TitleContainer>
                    )}
            </>
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
                            image={board.imagePath}
                            alt="Live from space album cover"
                        />
                    </CardActionArea>
                </StyledCard>
            ))}
        </Container>


    )
}

export default Boards