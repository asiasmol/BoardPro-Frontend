import React, {useContext, useState} from "react";
import {CardContent, Typography} from "@mui/material";
import {StyledCard} from "./CardComponent.styles";
import {CardListResponse} from "../../api/apiModels/CardListResponse";
import {BoardContext} from "../../context/BoardContext";



interface Props {
    text: string
    cardList: CardListResponse
}
const CardComponent = ({ text, cardList }: Props) => {

    const context = useContext(BoardContext)
    const [hover, setHover] = useState("false");
    const setCurrentCardList = () => {
        context.currentCardListModifier(cardList)
    }


    return (
        <StyledCard sx={{ margin: '1rem'}}   onMouseEnter={() => {
                    setHover("true");
                    setCurrentCardList();
                    }}
                    onMouseLeave={() => setHover("false")}
                    hover={hover}>
            <CardContent>
                <Typography variant="body2">{text}</Typography>
            </CardContent>
        </StyledCard>
    );
};

export default CardComponent;