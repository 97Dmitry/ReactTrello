import React, { useState } from "react";
import { Button, TextareaAutosize } from "@material-ui/core";
import { lStorage } from "../../../../utils";
import styled from "styled-components";

const CommentComponent = styled.div`
  border: 1px solid #2a2a2a;
  border-radius: 15px;
  padding: 10px;
  margin-top: 4px;
  word-wrap: break-word;

  display: flex;
  justify-content: space-between;
`;

interface CommentInterface {
  commentID: string;
  column: string;
  cardID: string;
  cardComments: Record<string, any>;
  setCardComments: React.Dispatch<Record<string, any>>;
}

const Comment: React.FC<CommentInterface> = ({
  commentID,
  cardID,
  column,
  cardComments,
  setCardComments,
}) => {
  const [comment, setComment] = useState(cardComments[commentID]["comment"]);

  return (
    <CommentComponent>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <p>Comment:</p>
        <TextareaAutosize
          value={comment}
          style={{
            width: "95%",
            fontSize: "20px",
            resize: "none",
          }}
          onFocus={(event) => {
            event.target.style.outline = "2px solid #0079bf";
          }}
          onChange={(event) => {
            setComment(event.target.value);
          }}
          onBlur={(event) => {
            event.target.style.outline = "none";
            const newCardComments = { ...cardComments };
            newCardComments[commentID]["comment"] = event.target.value;
            setCardComments((cardComments = { ...newCardComments }));
            const storage = lStorage(column);
            storage[cardID]["comments"][commentID]["comment"] =
              event.target.value;
            lStorage(column, { ...storage });
          }}
        />

        <p>Author: {cardComments[commentID]["author"]}</p>
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <Button
          variant="contained"
          color="secondary"
          onClick={(event: any) => {
            const newCardComments = { ...cardComments };
            delete newCardComments[commentID];
            setCardComments((cardComments = { ...newCardComments }));
            const storage = lStorage(column);
            delete storage[cardID]["comments"][commentID];
            lStorage(column, { ...storage });
          }}
        >
          Delete
        </Button>
      </div>
    </CommentComponent>
  );
};

export default Comment;
