import React from 'react';
import styled from "styled-components";

import Board from "./components/Board/Board";

const AppWrapper = styled.div`
  display: flex;
  width: 100%;
  min-height: 100vh;
`

const App: React.FC = (): any => {
  return (
      <AppWrapper>
        <Board />
      </AppWrapper>
    )

}

export default App;
