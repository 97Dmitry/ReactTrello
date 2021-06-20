import React, { useState } from "react";
import styled from "styled-components";

interface NameProtectorComponentInterface {
  isActive: number;
}

const NameProtectorComponent = styled.div<NameProtectorComponentInterface>`
  position: absolute;
  width: 100vw;
  height: 100vh;
  background: rgba(169, 169, 169, 0.66);

  display: flex;
  align-items: center;
  justify-content: center;

  transform: scale(${(props) => props.isActive});
`;

const Content = styled.div`
  padding: 20px;
  border-radius: 15px;
  background: white;
`;

const Title = styled.div`
  font-size: 20px;
  text-align: center;
  margin-bottom: 20px;
`;

const Input = styled.input.attrs({
  type: "text",
  placeholder: "Username",
})`
  box-shadow: 1px 5px 10px 2px rgba(34, 60, 80, 0.2);
  font-size: 18px;
  line-height: 22px;
  padding: 5px;
`;

const NameProtector: React.FC = () => {
  const [inputName, setInputName] = useState("");
  const [isActive, setIsActive] = useState(
    localStorage.getItem("username") ? 0 : 1
  );

  function nameSaveHandler(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.code === "Enter" && inputName.length > 0) {
      localStorage.setItem("username", inputName);
      setIsActive(0);
    }
  }

  return (
    <NameProtectorComponent isActive={isActive}>
      <Content>
        <Title>Choose your username</Title>
        <Input
          value={inputName}
          onChange={(event) => setInputName(event.target.value)}
          onKeyPress={nameSaveHandler}
        />
      </Content>
    </NameProtectorComponent>
  );
};

export default NameProtector;
