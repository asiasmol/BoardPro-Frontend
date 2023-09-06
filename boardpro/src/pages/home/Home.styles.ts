import styled from "styled-components";
import {Button} from "@mui/material";

export const Container = styled.div`
  margin: 10rem 20rem 10rem 20rem;
  display: flex;
  justify-content: space-between;
  width: fit-content;
`;

export const TextContainer = styled.div`
  margin: 2rem 2rem;
  border-radius: 2rem;
`;

export const LargeFont = styled.h1`
  display: flex;
  font-family: Roboto Condensed, Arial, sans-serif;
  margin-bottom: -2rem;
  font-size: 3rem;
`;

export const MediumFont = styled.h5`
  margin-top: 2.5rem;
  display: flex;
  font-family: Roboto Condensed, Arial, sans-serif;
  font-size: 1.5rem;
`;

export const ButtonContainer = styled.div`
  margin: 0rem 17rem 0rem 3rem;
  display: flex;
  justify-content: space-between;
`;

export const StyledButton= styled(Button)`
  width: 8rem;
  height: 3rem;
`;

export const ImageContainer = styled.div`
  margin: 2rem 2rem;
  border-radius: 2rem;
  //background-color: #000000;
`;


export const ActivityVisualization = styled.div`
  display: grid;
  grid-template-columns: repeat(13, 60px); /* 22 kwadraciki */
  grid-template-rows: repeat(7, 60px); /* Dni tygodnia */
  gap: 6px; /* Odstęp między kwadracikami */

  /* Tworzymy różne odcienie niebieskiego dla kwadracików */

  div {
    background: ${({color}) => color || "#0070d0"};
    border-radius: 3px;
    width: 60px;
    height: 60px;
  }

  /* Dodajemy animację migotania */
  @keyframes blink {
    0% {
      opacity: 1;
    }
    50% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  .blinking {
    animation: blink 1s infinite;
  }
`;