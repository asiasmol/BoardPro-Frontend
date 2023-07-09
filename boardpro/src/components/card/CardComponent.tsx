import React, {useState} from "react";
import {CardContent, Typography, Card} from "@mui/material";
import {StyledCard} from "./CardComponent.styles";



interface Props {
    text: string
}
const CardComponent = ({ text }: Props) => {
    const [hover, setHover] = useState(false);

    return (
        <StyledCard sx={{ margin: '1rem' }}>
            <CardContent>
                <Typography variant="body2">{text}</Typography>
            </CardContent>
        </StyledCard>
    );
};

export default CardComponent;