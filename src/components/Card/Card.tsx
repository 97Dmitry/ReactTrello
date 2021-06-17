import React from "react";
import styled from "styled-components";
import { lStorage } from "../../utils";

const CardStyle = styled.div`
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
  text: string;
  column: string;
  cardID: string;
  arr: any;
  setArr: any;
}

const Card: React.FC<CardText> = ({ text, cardID, column, arr, setArr }) => {
  return (
    <CardStyle data-type="Card">
      <p style={{ wordWrap: "break-word", paddingRight: "20px" }}>{text}</p>
      <Delete
        onClick={(event: { target: any }) => {
          delete arr[cardID];
          const newArr = arr;
          setArr((arr = { ...newArr }));
          let newStorage = lStorage(column);
          delete newStorage[cardID];
          lStorage(column, newStorage);
        }}
      >
        <i className="material-icons">delete</i>
      </Delete>
    </CardStyle>
  );
};

export default Card;
