import styled from "styled-components";

export const BaseBox = styled.div`
  background-color: white;
  border: 1px solid ${(props) => props.theme.borderColor};
  width: 100%;
`;

export const FatLink = styled.span`
  font-weight: 600;
  color: rgb(142, 142, 142);
`;

export const Image = styled.img`
  width: ${(prop) => (prop.sizes ? prop.sizes : "20rem")};
  height: ${(prop) => (prop.sizes ? prop.sizes : "20rem")};
  border-radius: 999px;
  background-color: lightgray;
`;