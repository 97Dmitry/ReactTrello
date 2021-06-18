import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import * as c from "./style";
import { CloseButton } from "./style";
import { lStorage } from "../../utils";
import Card from "../Card/Card";

interface ColumnProps {
  columnName: string;
  columnText: string;
}

const Column: React.FC<ColumnProps> = ({ columnName, columnText }) => {
  const columnCards: Array<any> = [];

  let [addCard, setBool] = useState(false);
  let [inp, setInp] = useState("");
  let [name, setName] = useState(lStorage(columnName)?.name || columnText);
  let [isChangeName, setChangeName] = useState(false);

  let cards = lStorage(columnName);
  let [cardsInfo, setCardsInfo] = useState<Record<any, any>>(
    cards ? cards : {}
  );

  if (cards) {
    Object.keys(cards).forEach((e) => {
      if (e.length > 15) {
        columnCards.push(
          <Card
            cardName={cards[e].title}
            key={e}
            cardID={e}
            column={columnName}
            cardsInfo={{ ...cardsInfo }}
            setCardsInfo={setCardsInfo}
          />
        );
      }
    });
  }

  return (
    <c.ColumnWrapper data-column={columnName}>
      {!isChangeName ? (
        <c.ColumnTitle onDoubleClick={() => setChangeName(!isChangeName)}>
          {name}
        </c.ColumnTitle>
      ) : (
        <c.NameInput
          value={name}
          onChange={(event) => setName((name = event.target.value))}
          onBlur={() => {
            setChangeName(!isChangeName);
            lStorage(columnName, { ...lStorage(columnName), name: name });
          }}
        />
      )}
      {columnCards}
      {addCard ? (
        <>
          <c.Input
            placeholder={"Input card name"}
            value={inp}
            onChange={(event) => {
              setInp((inp = event.target.value));
            }}
          />
          <c.AddButton
            onClick={() => {
              if (inp.length) {
                setCardsInfo(
                  (cardsInfo = { ...cardsInfo, [uuidv4()]: { title: inp } })
                );
                lStorage(columnName, cardsInfo);
                setInp((inp = ""));
                setBool((addCard = !addCard));
              }
            }}
          >
            Add
          </c.AddButton>
          <CloseButton
            onClick={() => {
              setBool((addCard = !addCard));
              setInp((inp = ""));
            }}
          >
            <i className="material-icons">edit_off</i>
          </CloseButton>
        </>
      ) : (
        <c.Button
          onClick={() => {
            setBool((addCard = !addCard));
          }}
          width={"100%"}
        >
          <i className="material-icons">note_add</i>Add another card
        </c.Button>
      )}
    </c.ColumnWrapper>
  );
};

export default Column;
