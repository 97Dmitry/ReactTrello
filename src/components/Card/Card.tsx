import React from "react";
import styled from "styled-components";

const CardStyle = styled.div`
  border: 1px saddlebrown solid;
  padding: 5px;
  width: 100%;
`
interface CardText {
  text: string
}
const Card: React.FC<CardText> = ({ text }) => {
  return (
    <CardStyle>
      { text }
    </CardStyle>
  );
};

export default Card;
