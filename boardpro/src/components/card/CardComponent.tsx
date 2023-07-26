import React, {useContext, useState} from "react";
import {Avatar, CardContent, Modal, Typography} from "@mui/material";
import {
    Container,
    StyledBox,
    StyledCard,
    StyledTextareaAutosize,
    Title,
    StyledBoxLine,
    StyledCardContent
} from "./CardComponent.styles";
import {CardListResponse} from "../../api/apiModels/CardListResponse";
import {BoardContext} from "../../context/BoardContext";
import {CardResponse} from "../../api/apiModels/CardResponse";
import {ThemeContext} from "../../context/ThemeContext";
import MenuIcon from '@mui/icons-material/Menu';



interface Props {
    card: CardResponse
    cardList: CardListResponse
}

const CardComponent = ({card, cardList}: Props) => {

    const context = useContext(BoardContext)
    const theme = useContext(ThemeContext)
    const [hover, setHover] = useState(false );
    const [open, setOpen] = useState(false);
    const handleOpen = () => {
        setOpen(true);
        console.log(open)
    }
    const handleClose = () => setOpen(false);
    const setCurrentCardList = () => {
            context.currentCardListModifier(cardList)
    }
    const setCurrentCard = () => {
        if (!context.isDragging) {
            context.currentCardModifier(card)
        }
    }
    return (
        <>
            <StyledCard
                onMouseEnter={() => {
                    setHover(true);
                    setCurrentCardList();
                    setCurrentCard();
                }}
                onMouseLeave={() => setHover(false)}
                hover={hover.toString()}

            >
                <StyledCardContent >
                    <Typography fontSize={"medium"}>{card.title}</Typography>
                    {hover && (
                        <MenuIcon onClick={handleOpen} data-no-dnd="true" />
                    )}
                </StyledCardContent>
            </StyledCard>

            <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title"
                   aria-describedby="modal-modal-description" data-no-dnd="true">
                <StyledBox bgcolor={theme.theme.palette.background.paper}>
                    <Container>
                        <Title id="modal-modal-title" variant="h6">
                            {card.title}
                        </Title>
                        <StyledBoxLine/>

                        <Typography fontSize={"small"} id="modal-modal-description">
                            Jest na liście {cardList.title}
                        </Typography>

                        Użytkownicy
                        {card.executors.map((user, index) => (
                            <Avatar key={index} alt={user.firstName.toUpperCase()} src="/static/images/avatar/2.jpg"/>
                        ))}

                        <StyledTextareaAutosize
                            value={card.description}
                            // onChange={changeDescription}
                            aria-label="minimum height"
                            minRows={3}
                            placeholder="Notatka"
                        />
                    </Container>
                </StyledBox>
            </Modal>
        </>
    );
};
export default CardComponent;