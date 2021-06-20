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
      <Column column={"todo"} columnTitle={"TODO"} />
      <Column column={"progress"} columnTitle={"In Progress"} />
      <Column column={"testing"} columnTitle={"Testing"} />
      <Column column={"done"} columnTitle={"Done"} />
    </BoardStyle>
  );
};

export default Board;
