import {useParams} from "react-router-dom";
import {useCallback, useEffect, useState} from "react";
import {BoardResponse} from "../../models/api/BoardResponse";
import {CardListResponse} from "../../models/api/CardListResponse";
import {BoardApi} from "../../api/BoardApi";
import {toast} from "react-toastify";
import AddNewCardList from "../card/AddNewCardList";
import CardList from "../card/CardList";

const Board = () => {
    const { id } = useParams();
    const [board, setBoard] = useState<BoardResponse | null>(null);
    const [cardLists, setCardLists] = useState<CardListResponse[]>([]);

    const fetchBoard = useCallback(async () => {
        if (id) {
            try {
                const response = await BoardApi.getBoard({
                    boardId: id
                });
                setBoard(response.data);
                setCardLists(response.data.cardLists)
            } catch (error) {
                toast.error("Błąd serwera");
            }
        }
    }, [id]);

    useEffect(() => {
        fetchBoard();
    }, [fetchBoard]);


    return (
        <>
        <h2>{board?.title}</h2>
        <div style={{ display: 'flex', gap: '1rem' }}>
            {cardLists.map((cardList, index) => (
                <CardList key={index} boardId={board?.id} cardList={cardList}/>
            ))}
            <AddNewCardList  boardId={board?.id}/>
        </div>
        </>
    )
}

export default Board

