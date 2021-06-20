import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { lStorage } from "../../../utils";
import styled from "styled-components";
import Comment from "./Comment/Comment";

const AllComments = styled.div`
  max-height: 400px;
  overflow: scroll;
  ::-webkit-scrollbar {
    width: 0;
  }
`;

const CommentInput = styled.textarea`
  border: #2a2a2a 1px solid;
  border-radius: 15px;
  padding: 10px;

  width: 40%;

  resize: none;
`;

const AddButton = styled.button`
  display: block;

  height: 30px;
  width: 100px;
  background: green;
  color: white;
  border-radius: 20px;
`;

interface CommentsInterface {
  cardComments: Record<string, any>;
  setCardComments: React.Dispatch<Record<string, any>>;
  column: string;
  cardID: string;
}
const Comments: React.FC<CommentsInterface> = ({
  cardComments,
  setCardComments,
  column,
  cardID,
}) => {
  const [comment, setComment] = useState("");

  return (
    <>
      {Object.keys(cardComments).length ? (
        <>
          <p style={{ marginTop: "10px" }}>All comments:</p>
          <AllComments>
            {Object.keys(cardComments).reduce<JSX.Element[]>(
              (acc: JSX.Element[], e) => {
                acc.push(
                  <Comment
                    cardComments={cardComments}
                    setCardComments={setCardComments}
                    cardID={cardID}
                    commentID={e}
                    column={column}
                    key={e}
                  />
                );
                return acc;
              },
              []
            )}
          </AllComments>
        </>
      ) : null}

      <p style={{ marginBottom: "10px" }}>Input comment: </p>
      <CommentInput
        value={comment}
        onChange={(event) => {
          setComment(event.target.value);
        }}
        placeholder={"Write something"}
      />
      <AddButton
        onClick={() => {
          const id = uuidv4();
          setCardComments(
            (cardComments = {
              ...cardComments,
              [id]: {
                comment,
                author: localStorage.getItem("username"),
              },
            })
          );
          lStorage(column, {
            ...lStorage(column),
            [cardID]: {
              ...lStorage(column)[cardID],
              comments: {
                ...lStorage(column)[cardID]["comments"],
                [id]: { comment, author: localStorage.getItem("username") },
              },
            },
          });
          setComment("");
        }}
      >
        Add comment
      </AddButton>
    </>
  );
};

export default Comments;
