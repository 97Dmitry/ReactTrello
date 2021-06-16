import React from 'react';
import styled from "styled-components";

const AppWrapper = styled.div`
  width: 100%;
  min-height: 100vh;
`

const App: React.FC = (): any => {
  return (
      <AppWrapper>
        Hello World
      </AppWrapper>
    )

}

export default App;
