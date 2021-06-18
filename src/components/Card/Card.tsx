import React, { useState } from "react";
import styled from "styled-components";
import { lStorage } from "../../utils";

const CardComponent = styled.div`
  position: relative;
  box-shadow: 1px 5px 10px 2px rgba(34, 60, 80, 0.2);
  background: white;
  padding: 5px;
  width: 100%;

  margin-bottom: 10px;

  &:hover {
    background: #f4f5f7;
  }
`;

const Delete = styled.button`
  position: absolute;
  right: 0;
  top: 0;
  background: none;

  &:hover {
    color: red;
  }
`;

interface CardText {
  cardName: string;
  column: string;
  cardID: string;
  cardsInfo: any;
  setCardsInfo: any;
}

const Card: React.FC<CardText> = ({
  cardName,
  cardID,
  column,
  cardsInfo,
  setCardsInfo,
}) => {
  let [popUpIsActive, setPopUpIsActive] = useState(false);

  return (
    <CardComponent data-type="Card">
      <p style={{ wordWrap: "break-word", paddingRight: "20px" }}>{cardName}</p>
      <Delete
        onClick={() => {
          delete cardsInfo[cardID];
          const newArr = cardsInfo;
          setCardsInfo((cardsInfo = { ...newArr }));
          let newStorage = lStorage(column);
          delete newStorage[cardID];
          lStorage(column, newStorage);
        }}
      >
        <i className="material-icons">delete</i>
      </Delete>
    </CardComponent>
  );
};

export default Card;
