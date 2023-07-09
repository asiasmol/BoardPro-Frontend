import styled from "styled-components";
import {Box, Card, CardContent, CardMedia} from "@mui/material";

export const Container = styled.div`
  margin: 2rem 2rem;
  border-radius: 2rem;
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

