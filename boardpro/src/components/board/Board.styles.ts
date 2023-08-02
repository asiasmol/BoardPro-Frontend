import {AppBar, Autocomplete, Box, Button} from "@mui/material";
import styled from "styled-components";
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';

export const CustomAppBar = styled(AppBar)`
  background-color: rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(10px);
  margin-bottom: 2rem;
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

export const StyledPersonAddAltIcon = styled(PersonAddAltIcon)`
  margin: 1rem;
  padding: 0.35rem;
  border-radius: 50%;
  &:hover {
    background-color: #c0c0c0;
  }
`;

export const Container = styled(Box)`
  display: flex;
  align-items: center;
  //margin: 1rem;
`;

export const StyledAutocomplete = styled(Autocomplete)`
  width: 80%;
  margin-right: 1rem;
`;

export const StyledButton = styled(Button)`
  width: 8rem;
  height: 3.5rem;
`;

export const Body = styled.div<{ backgroundImage: string }>`
background-image:url(${props => props.backgroundImage});
background-size: cover;
background-repeat: no-repeat;
background-attachment: fixed;
height: 100vh;
opacity: 1;
position: relative;
z-index: 0;`
;