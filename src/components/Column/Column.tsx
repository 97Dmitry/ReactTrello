import React, { ReactNode, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import * as c from "./style";
import { CloseButton } from "./style";
import { lStorage } from "../../utils";
import Card from "../Card/Card";

interface ColumnProps {
  columnName: string;
  children: ReactNode;
}

const Column: React.FC<ColumnProps> = ({ columnName, children }) => {
  const columnCards: Array<any> = [];

  let [addCard, setBool] = useState(false);
  let [inp, setInp] = useState("");
  let cards = lStorage(columnName);

  let [arr, setArr] = useState<Record<any, any>>(cards ? cards : {});
  // let [index, setIndex] = useState(cards ? Object.keys(cards).length : 0);

  if (cards) {
    Object.keys(cards).forEach((e) => {
      columnCards.push(
        <Card
          text={cards[e].title}
          key={`${columnName}-${e}`}
          cardID={e}
          column={columnName}
        />
      );
    });
  }

  return (
    <c.ColumnWrapper data-column={columnName}>
      <c.ColumnTitle>{children}</c.ColumnTitle>
      {columnCards}
      {addCard ? (
        <>
          <c.Input
            placeholder={"Input card name"}
            value={inp}
            onChange={(e) => {
              setInp((inp = e.target.value));
            }}
          />
          <c.AddButton
            onClick={() => {
              if (inp.length) {
                setArr((arr = { ...arr, [uuidv4()]: { title: inp } }));
                lStorage(columnName, arr);
                setInp((inp = ""));
              }
            }}
          >
            Add
          </c.AddButton>
          <CloseButton
            onClick={() => {
              setBool(!addCard);
              setInp((inp = ""));
            }}
          >
            <i className="material-icons">edit_off</i>
          </CloseButton>
        </>
      ) : (
        <c.Button
          onClick={() => {
            setBool(!addCard);
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
