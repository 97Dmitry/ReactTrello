import React from "react";
import styled from "styled-components";

import Board from "./components/Board/Board";
import NameProtector from "./components/NameProtector/NameProtector";

const AppWrapper = styled.div`
  display: flex;
  width: 100%;
  min-height: 100vh;
`;

const App: React.FC = (): any => {
  return (
    <AppWrapper>
      <Board />
      <NameProtector />
    </AppWrapper>
  );
};

export default App;
