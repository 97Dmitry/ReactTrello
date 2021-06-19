import React, { useEffect } from "react";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";

import styled from "styled-components";
import { lStorage } from "../../utils";
import Comments from "./Comments/Comments";
import Description from "../Description/Description";

const CardPopUpComponent = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  z-index: 10;

  width: 100vw;
  height: 100vh;

  background: rgba(169, 169, 169, 0.66);

  display: flex;
  align-items: center;
  justify-content: center;
`;

const Content = styled.div`
  width: 60%;
  padding: 20px;
  border-radius: 15px;
  background: white;
`;

const CloseButton = styled.button`
  position: absolute;
  right: 5vw;
  top: 10vh;

  background: none;
`;

interface CardPopUpInterface {
  cardName: string;
  setCardNameState: any;
  column: string;
  columnName: string;
  cardID: string;
  cardsInfo: Record<string, any>;
  setCardsInfo: any;
  isActive: boolean;
  setIsActive: any;
  cardComments: Record<string, any>;
  setCardComments: any;
}

const CardPopUp: React.FC<CardPopUpInterface> = ({
  cardName,
  setCardNameState,
  column,
  columnName,
  cardID,
  cardsInfo,
  setCardsInfo,
  isActive,
  setIsActive,
  cardComments,
  setCardComments,
}) => {
  useEffect(() => {
    const escFunction = (event: KeyboardEvent) => {
      if (isActive && event.code === "Escape") {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        setIsActive((isActive = false));
      }
    };
    document.addEventListener("keydown", escFunction, false);

    return () => {
      document.removeEventListener("keydown", escFunction, false);
    };
  }, []);

  return (
    <CardPopUpComponent>
      <CloseButton onClick={() => setIsActive((isActive = !isActive))}>
        <i className="material-icons" style={{ fontSize: "45px" }}>
          close
        </i>
      </CloseButton>
      <Content>
        <>
          <strong>Card name:</strong>
          <TextareaAutosize
            style={{
              width: "100%",
              fontSize: "20px",
              resize: "none",
            }}
            onFocus={(event) => {
              event.target.style.outline = "2px solid #0079bf";
            }}
            value={cardName}
            onChange={(event) => {
              setCardNameState((cardName = event.target.value));
            }}
            onBlur={(event) => {
              event.target.style.outline = "none";
              lStorage(column, {
                ...lStorage(column),
                [cardID]: { ...lStorage(column)[cardID], title: cardName },
              });
            }}
          />
        </>
        <p>
          in column:{" "}
          <span style={{ fontSize: "18px", fontWeight: 700 }}>
            {columnName}
          </span>
        </p>
        <p>
          Author:{" "}
          <span style={{ fontSize: "18px", fontWeight: 700 }}>
            {localStorage.getItem("username")}
          </span>
        </p>
        <Description cardID={cardID} column={column} />
        <Comments
          cardComments={cardComments}
          setCardComments={setCardComments}
          cardID={cardID}
          column={column}
        />
      </Content>
    </CardPopUpComponent>
  );
};

export default CardPopUp;
