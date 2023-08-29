import styled, {keyframes} from "styled-components";
import {Box, Card, CardContent, CardMedia} from "@mui/material";

export const Container = styled.div`
  width: fit-content;
  margin-left: auto;
  margin-right: auto;
  margin-top: 6rem;
`;

export const TitleContainer = styled.div`
  width: fit-content;
  margin-left: auto;
  margin-right: auto;
  margin-top: 6rem;
`;

export const StyledCard = styled(Card)`
  display: flex;
  border-radius: 2rem;
  height: 17rem;
  margin: 2rem;
  
`;

export const StyledBox = styled(Box)`
  display: flex;
  flexDirection: column;
`;

export const StyledCardContent = styled(CardContent)`
  flex: 1 0 auto;
`;

export const StyledCardMedia = styled(CardMedia)`
  width: 3rem
`;


export const LoaderContainer = styled.div`
    margin-top: 20rem;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    `;

const rotate360 = keyframes
`from {
    transform: rotate(0deg);
}
to {
    transform: rotate(360deg);
}`
;

export const Loader = styled.div
`animation: ${rotate360} 1s linear infinite;
transform: translateZ(0);

border-top: 4px solid grey;
border-right: 4px solid grey;
border-bottom: 4px solid grey;
border-left: 4px solid black;
background: transparent;
width: 24px;
height: 24px;
border-radius: 50%;`
;

