import styled from "styled-components";

export const ColumnWrapper = styled.div`
  width: 25%;

  height: max-content;
  margin: 15px 20px 0;
  padding: 15px;
  background: #ebecf0;
`;

export const ColumnTitle = styled.p`
  font-size: 30px;
  font-weight: 700;

  padding: 15px;
`;

export const NameInput = styled.input`
  font-size: 30px;
  font-weight: 700;
  margin: 15px;
`;

interface ButtonProps {
  width: string;
}
export const Button = styled.button<ButtonProps>`
  display: flex;
  justify-content: center;
  align-items: center;

  height: 24px;
  width: ${(props) => props.width};
  &:hover {
    border-radius: 20px;
    background: darkgrey;
  }
`;

export const Input = styled.textarea`
  box-shadow: 1px 5px 10px 2px rgba(34, 60, 80, 0.2);
  width: 100%;
  min-height: 80px;
  padding: 10px;
  margin-bottom: 5px;
`;

const buttonHeight = "32px";

export const AddButton = styled.button`
  background: #0079bf;
  padding: 5px 25px;
  border-radius: 15px;
  height: ${buttonHeight};
`;

export const CloseButton = styled.button`
  width: 40px;
  vertical-align: bottom;
  font-size: ${buttonHeight};
  line-height: ${buttonHeight} !important;
`;
