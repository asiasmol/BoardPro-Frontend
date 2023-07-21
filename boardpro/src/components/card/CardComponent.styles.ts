import styled from "styled-components";
import {Box, Card, TextareaAutosize, Typography} from "@mui/material";


export const StyledCard = styled(Card)`
  margin: 0.5rem;
  &:hover {
    box-shadow: 0 0 8px rgba(0, 0, 0, 2);
  }
`;

export const StyledBox = styled(Box)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 50rem;
  height: 50rem;
  border-radius: 1rem;
  padding: 3rem;
`;

export const StyledTextareaAutosize = styled(TextareaAutosize)`
  width: 20rem;
  border-radius: 1rem;
  padding: 1rem;
  border: none;
  font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
`;
export const Title = styled(Typography)`
  margin: 4rem
`;

export const StyledBoxLine = styled(Box)`
  background-color: #333333;
  m: 1;
  width: 100%;
  margin-top: 2rem;
  margin-bottom: 2rem;
  height: 0.1rem;
`;

