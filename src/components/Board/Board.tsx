import React from "react";
import styled from "styled-components";
import Column from "../Column/Column";


const BoardStyle = styled.div`
  display: flex;
  
  width: 100%;
  margin: 25px;
  border-radius: 20px;
  background: #28AECB;
`

const Board: React.FC = () => {
  return (
    <BoardStyle>
      <Column>TODO</Column>
      <Column>In Progress</Column>
      <Column>Testing</Column>
      <Column>Done</Column>
    </BoardStyle>
  );
};

export default Board;
