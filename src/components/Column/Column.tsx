import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import * as s from "./style";
import { lStorage } from "../../utils";
import Card from "../Card/Card";

interface ColumnProps {
  column: string;
  columnTitle: string;
}

const Column: React.FC<ColumnProps> = ({ column, columnTitle }) => {
  const [isAddCard, setIsAddCard] = useState(false);
  const [cardNameInput, setCardNameInput] = useState("");
  const [name, setName] = useState(lStorage(column)?.name || columnTitle);
  const [isChangeName, setIsChangeName] = useState(false);
  const [cardsInfo, setCardsInfo] = useState<Record<string, any>>(
    lStorage(column) || {}
  );

  function cardSaveHandler() {
    if (cardNameInput.length) {
      setCardsInfo(() => {
        const data = {
          ...cardsInfo,
          [uuidv4()]: { title: cardNameInput },
        };
        lStorage(column, { ...data });
        return data;
      });
      setIsAddCard(!isAddCard);
      setCardNameInput("");
    }
  }

  return (
    <s.ColumnWrapper data-column={column}>
      {!isChangeName ? (
        <s.ColumnTitle onDoubleClick={() => setIsChangeName(!isChangeName)}>
          {name}
        </s.ColumnTitle>
      ) : (
        <s.ColumnNameInput
          value={name}
          onChange={(event) => setName(event.target.value)}
          onBlur={() => {
            setIsChangeName(!isChangeName);
            lStorage(column, { ...lStorage(column), name: name });
          }}
        />
      )}
      <s.CardList>
        {Object.keys(cardsInfo)
          .filter((id: string) => id.length > 15)
          .map((id: string) => {
            return (
              <Card
                cardName={cardsInfo[id].title}
                key={id}
                cardID={id}
                column={column}
                columnTitle={name}
                cardsInfo={{ ...cardsInfo }}
                setCardsInfo={setCardsInfo}
              />
            );
          })}
      </s.CardList>
      {isAddCard ? (
        <>
          <s.Input
            placeholder={"Input card name"}
            value={cardNameInput}
            onChange={(event) => {
              setCardNameInput(event.target.value);
            }}
          />
          <s.AddButton onClick={cardSaveHandler}>Add</s.AddButton>
          <s.CloseButton
            onClick={() => {
              setIsAddCard(!isAddCard);
              setCardNameInput("");
            }}
          >
            <i className="material-icons">edit_off</i>
          </s.CloseButton>
        </>
      ) : (
        <s.Button
          onClick={() => {
            setIsAddCard(!isAddCard);
          }}
          width={"100%"}
        >
          <i className="material-icons">note_add</i>Add another card
        </s.Button>
      )}
    </s.ColumnWrapper>
  );
};

export default Column;
