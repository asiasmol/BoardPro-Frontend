import React, {useContext, useState} from "react";
import {Avatar, CardContent, Modal, Typography} from "@mui/material";
import {Container, StyledBox, StyledCard, StyledTextareaAutosize, Title, TitleContainer} from "./CardComponent.styles";
import {CardListResponse} from "../../api/apiModels/CardListResponse";
import {BoardContext} from "../../context/BoardContext";
import {CardResponse} from "../../api/apiModels/CardResponse";
import {ThemeContext} from "../../context/ThemeContext";





interface Props {
    card: CardResponse
    cardList: CardListResponse
}
const CardComponent = ({ card, cardList }: Props) => {

    const context = useContext(BoardContext)
    const themeContext = useContext(ThemeContext)
    const [hover, setHover] = useState("false");
    const setCurrentCardList = () => {
        context.currentCardListModifier(cardList)
    }
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleModalClose = (event: React.MouseEvent<Document, MouseEvent>) => {
        if (event.target === event.currentTarget) {
            handleClose();
        }
    }

        return (
            <>
                <StyledCard sx={{margin: '1rem'}} onMouseEnter={() => {
                    setHover("true");
                    setCurrentCardList();
                }}
                            onMouseLeave={() => setHover("false")}
                            hover={hover}
                            color="primary"
                >
                    <CardContent onDoubleClick={handleOpen}>
                        <Typography variant="body2">{card.title}</Typography>
                    </CardContent>
                </StyledCard>
                <Modal
                    open={open}
                    onClose={handleModalClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                    data-no-dnd="true"
                >
                    <StyledBox bgcolor={themeContext.theme.palette.secondary.main}>
                        <Container>
                            <TitleContainer>

                                <Title id="modal-modal-title" variant="h5">
                                    {card.title}
                                </Title>
                            </TitleContainer>

                            <Typography id="modal-modal-description" sx={{mt: 2}}>
                                Jest na liście {cardList.title}
                            </Typography>
                            awatary
                            {card.executors.map((user, index) => (
                                <Avatar key={index} alt={user.firstName.toUpperCase()} src="/static/images/avatar/2.jpg" />
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