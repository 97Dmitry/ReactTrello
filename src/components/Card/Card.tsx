import React, { useState } from "react";
import styled from "styled-components";
import { lStorage } from "../../utils";
import CardPopUp from "../CardPopUp/CardPopUp";

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

const CardText = styled.p`
  padding-right: 15px;
  word-break: break-word;
  word-wrap: break-word;
`;

const Delete = styled.button`
  display: block;
  position: absolute;
  right: 0;
  top: 0;
  background: none;

  &:hover {
    color: red;
  }
`;

interface CardInterface {
  cardName: string;
  column: string;
  columnName: string;
  cardID: string;
  cardsInfo: Record<string, any>;
  setCardsInfo: any;
}

const Card: React.FC<CardInterface> = ({
  cardName,
  cardID,
  column,
  columnName,
  cardsInfo,
  setCardsInfo,
}) => {
  let [popUpIsActive, setPopUpIsActive] = useState(false);
  let [cardNameState, setCardNameState] = useState(cardName);
  let [cardComments, setCardComments] = useState<Record<string, any>>(
    lStorage(column)[cardID]["comments"] || {}
  );

  return (
    <>
      <CardComponent
        onClick={() => setPopUpIsActive((popUpIsActive = !popUpIsActive))}
        data-type="Card"
      >
        <CardText>{cardNameState}</CardText>
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
        {Object.keys(cardComments).length ? (
          <>
            <hr style={{ border: "1px solid black", marginTop: "5px" }} />
            <br />
            <p>Comments count: {Object.keys(cardComments).length}</p>
          </>
        ) : null}
      </CardComponent>
      {popUpIsActive ? (
        <CardPopUp
          cardName={cardNameState}
          setCardNameState={setCardNameState}
          cardID={cardID}
          column={column}
          columnName={columnName}
          cardsInfo={cardsInfo}
          setCardsInfo={setCardsInfo}
          isActive={popUpIsActive}
          setIsActive={setPopUpIsActive}
          cardComments={cardComments}
          setCardComments={setCardComments}
        />
      ) : null}
    </>
  );
};

export default Card;
