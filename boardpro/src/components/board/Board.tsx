import React, {useCallback, useEffect, useState} from "react";
import {BoardApi} from "../../api/BoardApi";
import {toast} from "react-toastify";
import {BoardResponse} from "../../models/api/BoardResponse";
import {useParams} from "react-router-dom";

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
                console.log(board)
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
            {board?.id}
        </>
    )
}

export default Board