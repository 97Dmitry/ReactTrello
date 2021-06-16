import React, {ReactNode, useState} from "react";
import styled from "styled-components";
import Card from "../Card/Card";

const ColumnWrapper = styled.div`
  width: 25%;
  height: max-content;
  margin: 15px 20px 0;
  padding: 15px;
  background: #EBECF0;
`;

const ColumnTitle = styled.h1`
  padding: 15px;
`;

const Button = styled.button`
  width: 100%;
  display: flex;

  justify-content: center;
  align-items: center;
`;

const Input = styled.input`

`;

const AddButton = styled.button`
`;

interface ColumnProps {
  children: ReactNode;
}

const Column: React.FC<ColumnProps> = ({children}) => {
  let [addCard, setBoll] = useState(false);
  let [inp, setInp] = useState("");
  let [arr, setArr] = useState<Array<any>>([])
  return (
    <ColumnWrapper>
      <ColumnTitle>{children}</ColumnTitle>
      {arr}
      {addCard
        ? <>
          <Input
            type="text"
            placeholder={"Input card name"}
            value={inp}
            onChange={(e) => {
              setInp(inp = e.target.value);
            }}
          />
          <AddButton
            onClick={() => {
              setArr(arr = [...arr, <Card text={inp} key={arr.length || 0}/>])
            }}
          >
            Add
          </AddButton>
        </>
        : <Button onClick={() => setBoll(!addCard)}><i className="material-icons">note_add</i>Add
          another card</Button>}
    </ColumnWrapper>
  );
};

export default Column;
