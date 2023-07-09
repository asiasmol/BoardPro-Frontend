import { useContext, useEffect} from "react";
import AddNewCardList from "../cardList/AddNewCardList";
import CardList from "../cardList/CardList";
import {BoardContext} from "../../context/BoardContext";

const Board = () => {
    const context = useContext(BoardContext)


    useEffect(() => {
        console.log("CONTEXT PRINT= ", context.currentBoard);
    }, [context.currentBoard])


    return (
        <>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'start' }}>
                {context.currentBoard?.cardLists.map((cardList, index) => (
                    <div key={index} >
                        <CardList key={index} cardList={cardList}/>
                    </div>
                ))}
                <AddNewCardList/>
            </div>
        </>
    )
}

export default Board
