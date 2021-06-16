import styled from "styled-components";

export const StyledRegisterForm = styled.form`
  border: 1px solid #dbdbdb;
  box-shadow: 0 0 50px -6px grey;
  width: 20vw;
  margin: 10rem auto;
  padding: 1rem;
  font-size: 0.85rem;
`;

export const StyledSpan = styled.span`
  cursor: pointer;
  margin-left: 10px;

  :hover {
    color: rgb(65, 85, 200);
    font-size: 1rem;
    word-break: break-all;
    transition: 1200ms ease-in;
  }
`;
