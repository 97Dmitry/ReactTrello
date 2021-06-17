import React from "react";
import styled from "styled-components";
import Column from "../Column/Column";

const BoardStyle = styled.div`
  display: flex;

  width: 100%;
  margin: 25px;
  border-radius: 20px;
  background: #28aecb;
`;

const Board: React.FC = () => {
  return (
    <BoardStyle>
      <Column columnName={"todo"}>TODO</Column>
      <Column columnName={"progress"}>In Progress</Column>
      <Column columnName={"testing"}>Testing</Column>
      <Column columnName={"done"}>Done</Column>
    </BoardStyle>
  );
};

export default Board;
