import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { lStorage } from "../../../utils";
import styled from "styled-components";
import Comment from "./Comment/Comment";

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

// const Comment = styled.div`
//   border: 1px solid #2a2a2a;
//   border-radius: 15px;
//   padding: 10px;
//   margin-top: 4px;
//   word-wrap: break-word;
//
//   display: flex;
//   justify-content: space-between;
// `;

interface CommentsInterface {
  cardComments: Record<string, any>;
  setCardComments: any;
  column: string;
  cardID: string;
}
const Comments: React.FC<CommentsInterface> = ({
  cardComments,
  setCardComments,
  column,
  cardID,
}) => {
  let [comment, setComment] = useState("");

  return (
    <>
      {Object.keys(cardComments).length ? (
        <>
          <p style={{ marginTop: "10px" }}>All comments:</p>
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
        </>
      ) : null}

      <p style={{ marginBottom: "10px" }}>Input comment: </p>
      <CommentInput
        value={comment}
        onChange={(event) => {
          setComment((comment = event.target.value));
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
          setComment((comment = ""));
        }}
      >
        Add comment
      </AddButton>
    </>
  );
};

export default Comments;
