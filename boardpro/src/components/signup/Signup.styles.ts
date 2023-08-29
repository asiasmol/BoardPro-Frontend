import styled from "styled-components";

export const StyledContainer = styled.div
    `width: fit-content;
margin-left: auto;
margin-right: auto;
margin-top: 6rem;`
;

export const ValidationError = styled.div`
  color: red;
  font-size: 13px;
  transition: 2s;
  @media(max-width:950px){
    width: 14rem;
    position:relative;
    margin-top: -1rem;
    left:3rem;
    transition: 2s;
  }
  @media (max-width: 450px) {
    position:relative;
    left:3rem;
    transition: 2s;
  }
`