import {
    Container,
    LargeFont,
    MediumFont,
    TextContainer,
    ButtonContainer,
    StyledButton,
    ImageContainer
} from "./Home.styles";


const Home = () => {

    return (

        <Container>
            <TextContainer>
                <LargeFont>BoardPro łączy wszystkie </LargeFont>
                <LargeFont>zadania i narzędzia oraz</LargeFont>
                <LargeFont>członków zespołu</LargeFont>
                <MediumFont>Wszystko w tym samym miejscu — nawet jeśli Twój zespół nie jest.</MediumFont>
                <ButtonContainer>
                    <StyledButton href="/signup"color="primary" variant="contained">Start</StyledButton>
                    <StyledButton color="secondary" variant="contained">Jak to działa ?</StyledButton>
                </ButtonContainer>
            </TextContainer>
            <ImageContainer>

            </ImageContainer>
        </Container>
    )
}

export default Home