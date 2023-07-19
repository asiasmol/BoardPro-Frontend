import styled from "styled-components";
import {Box, Card, TextareaAutosize, Typography} from "@mui/material";


export const StyledCard = styled(Card)`
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
  align-items: center;
`;
export const Title = styled(Typography)`
  height: 4rem;
`;

export const TitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin: 1rem;
`;

export const ExecutorsContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const DescriptionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;