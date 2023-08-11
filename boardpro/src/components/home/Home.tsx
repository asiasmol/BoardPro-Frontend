import {
    Container,
    LargeFont,
    MediumFont,
    TextContainer,
    ButtonContainer,
    StyledButton,
    ImageContainer,
    ActivityVisualization
} from "./Home.styles";
import {useEffect, useState} from "react";


const Home = () => {
    const totalSquares = 13 * 7; // 22 kwadraciki na tydzień

    const generateColorShades = (totalSquares: number) => {
        const colors = [];
        const numberOfShades = totalSquares; // Generujemy odcienie dla wszystkich kwadracików

        // Generujemy odcienie niebieskiego
        for (let shade = 0; shade < numberOfShades; shade++) {
            const lightness = 40 + Math.floor(Math.random() * 31); // Wylosuj jasność z zakresu 40-70
            colors.push(`hsl(209, 100%, ${lightness}%)`);
        }

        return colors;
    };

    const generateRandomlyMissingSquares = (totalSquares: number, missingPercentage: number) => {
        const squaresWithMissing = [];
        const missingCount = Math.floor(totalSquares * missingPercentage);

        for (let i = 0; i < totalSquares; i++) {
            if (i < missingCount) {
                squaresWithMissing.push(true); // Oznaczamy kwadracik jako brakujący
            } else {
                squaresWithMissing.push(false);
            }
        }

        // Tasujemy tablicę z kwadracikami, aby były losowo rozmieszczone brakujące kwadraciki
        for (let i = totalSquares - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [squaresWithMissing[i], squaresWithMissing[j]] = [
                squaresWithMissing[j],
                squaresWithMissing[i],
            ];
        }

        return squaresWithMissing;
    };

    const colorShades = generateColorShades(totalSquares);
    const missingSquares = generateRandomlyMissingSquares(totalSquares, 0.25); // 25% szans na brakujący kwadracik

    // Stan dla migotania losowo wybranego kwadracika
    const [blinkingSquare, setBlinkingSquare] = useState<number | null>(null);

    useEffect(() => {
        const randomIndex = Math.floor(Math.random() * totalSquares);
        setBlinkingSquare(randomIndex);
    }, []);

    return (
        <Container>
            <TextContainer>
                <LargeFont>BoardPro łączy wszystkie </LargeFont>
                <LargeFont>zadania i narzędzia aby </LargeFont>
                <LargeFont>osiągnąć maksymalną wydajność</LargeFont>
                <MediumFont>
                    Zorganizuj pracę, osiągaj wydajność!
                </MediumFont>
                <ButtonContainer>
                    <StyledButton href="/signup" color="primary" variant="contained">
                        Start
                    </StyledButton>
                    <StyledButton color="secondary" variant="contained">
                        Jak to działa ?
                    </StyledButton>
                </ButtonContainer>
            </TextContainer>
            <ImageContainer>
                <ActivityVisualization color={colorShades[0]}>
                    {colorShades.map((color, index) => {
                        if (missingSquares[index]) {
                            return <div key={index} style={{background: "transparent"}}/>;
                        } else {
                            return (
                                <div
                                    key={index}
                                    style={{
                                        background: color,
                                        animation: blinkingSquare === index ? "blink 1s infinite" : "none",
                                    }}
                                    className={blinkingSquare === index ? "blinking" : ""}
                                />
                            );
                        }
                    })}
                </ActivityVisualization>
            </ImageContainer>
        </Container>
    );
};

export default Home;