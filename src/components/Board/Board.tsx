import React from "react";
import styled from "styled-components";
import Column from "../Column/Column";

const BoardStyle = styled.div`
  display: flex;

  width: 100%;
  margin: 25px;
  border-radius: 20px;
  background: rgba(40, 174, 203, 0.85);
`;

const Board: React.FC = () => {
  return (
    <BoardStyle>
      <Column columnName={"todo"} columnText={"TODO"} />
      <Column columnName={"progress"} columnText={"In Progress"} />
      <Column columnName={"testing"} columnText={"Testing"} />
      <Column columnName={"done"} columnText={"Done"} />
    </BoardStyle>
  );
};

export default Board;
