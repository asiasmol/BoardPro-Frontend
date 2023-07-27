import styled from "styled-components";
import {Box, Card, CardContent, TextareaAutosize, TextField, Typography} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';


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
  height: 35rem;
  border-radius: 1rem;
  padding: 3rem;
`;

export const StyledTextareaAutosize = styled(TextareaAutosize)`
  width: 30rem;
  border-radius: 0rem;
  padding: 1rem;
  border: none;
  font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

export const TitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
`;

export const BodyContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
  margin-bottom: 4rem;
`;


export const StyledCardContent = styled(CardContent)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const StyledTypography = styled(Typography)`
  padding: 1rem;
  &:hover {
    background: rgba(115, 115, 115, 0.5)
  }
`;

export const ListTypography = styled(Typography)`
  padding-left: 1rem;
  padding-right: 1rem;
`;

export const StyledCloseIcon = styled(CloseIcon)`
  margin-left: 97%;
  padding: 0.2rem;
  &:hover {
    border-radius: 50%;
    background: rgba(115, 115, 115, 0.5)
  }
`;

export const StyledCDeleteForeverIcon = styled(DeleteForeverIcon)`
  margin-left: 97%;
  margin-bottom: -4.5rem;
  padding: 0.2rem;
  &:hover {
    border-radius: 50%;
    background: rgba(115, 115, 115, 0.5)
  }
`;

export const StyledTextField = styled(TextField)`
  width: 16rem;
  border-radius: 0.5rem;
`;
