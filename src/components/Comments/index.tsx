import React, { useEffect, useState, useRef } from "react";
//style
import { CommentsComponent } from "./CommentsStyles";
//state
import commentState from "../../state/commentState";
//icons
import { BsGraphUp } from "react-icons/bs";
import { MdNewReleases } from "react-icons/md";
//components
import Upvotes from "../../components/Upvotes";
//interfaces
import { User } from "../../interfaces";
//format time
import TimeAgo from "react-timeago";
//material-ui
import TextField from "@material-ui/core/TextField";
import Input from "@material-ui/core/Input";

export type CommentTypes = {
  postId: String;
  darkMode: boolean;
  isLogged: boolean;
  loggedUser: User;
};
export type commentData = {
  comment: string;
  editComment: boolean;
  editCommentText: string;
  commentId: String;
};

const Comments: React.FC<CommentTypes> = ({
  postId,
  darkMode,
  loggedUser,
  isLogged,
}) => {
  //state
  const [commentData, setCommentData] = useState<commentData>({
    comment: "",
    editComment: false,
    editCommentText: "",
    commentId: "0A",
  });
  const textToCopy = useRef<HTMLDivElement>(null);
  const { fetchComments, createComment, comments, editComment, deleteComment } =
    commentState((state) => state);
  //useEffect
  useEffect(() => {
    fetchComments(postId, "upvotes");
  }, [fetchComments, postId]);
  //handlers
  const copyToClipboard = (str: string) => {
    const el = document.createElement("textarea");
    el.value = str;
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
  };
  const addComment = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (commentData.comment) {
      createComment({
        text: commentData.comment,
        authorId: loggedUser._id,
        author: loggedUser.username,
        postId,
      });
      setCommentData({ ...commentData, comment: "" });
    }
  };
  const checkIfCommentIsUpvoted = (id: String) => {
    const comment = comments!.find((a) => a._id === id);

    const isCommentUpvoted = comment!.upvotedBy.find(
      (a) => a === loggedUser._id
    );

    if (isCommentUpvoted) {
      return true;
    } else {
      return false;
    }
  };
  const checkIfCommentIsDownvoted = (id: String) => {
    const comment = comments!.find((a) => a._id === id);

    const isCommentDownvoted = comment!.downvotedBy.find(
      (a) => a === loggedUser._id
    );
    if (isCommentDownvoted) {
      return true;
    } else {
      return false;
    }
  };

  const editCommentHandler = (
    id: String,
    e: React.FormEvent<HTMLButtonElement>
  ) => {
    if (commentData.editCommentText) {
      editComment(id, commentData.editCommentText);
      setCommentData({ ...commentData, editComment: false });
    }
  };
  return (
    <CommentsComponent
      darkmode={darkMode}
      comment={commentData.comment ? true : false}
      ready={commentData.editCommentText ? true : false}
    >
      {isLogged && (
        <div className="write-comment">
          <span>Comment as {loggedUser.username}</span>
          <form className="form">
            <TextField
              className="text-field"
              multiline
              placeholder="What are your thoughts?"
              rows={4}
              value={commentData.comment}
              onChange={(e) =>
                setCommentData({ ...commentData, comment: e.target.value })
              }
            />
            <button
              type="submit"
              className="submit"
              onClick={(e) => addComment(e)}
            >
              Comment
            </button>
          </form>
        </div>
      )}
      <div className="sort-comments">
        Sort comments by:
        <span onClick={() => fetchComments(postId, "upvotes")}>
          <BsGraphUp /> Top
        </span>
        <span onClick={() => fetchComments(postId, "createdAt")}>
          <MdNewReleases /> New
        </span>
      </div>
      {comments?.map((comment, index) => (
        <div className="comment" key={index}>
          {commentData.editComment && commentData.commentId === comment._id ? (
            <div className="edit-comment">
              <Input
                className="edit-comment-field"
                value={commentData.editCommentText}
                multiline
                onChange={(e) =>
                  setCommentData({
                    ...commentData,
                    editCommentText: e.target.value,
                  })
                }
                disableUnderline
              />
              <div className="buttons">
                <button
                  className="edit-comment-button"
                  onClick={() =>
                    setCommentData({
                      ...commentData,
                      editComment: false,
                    })
                  }
                >
                  Cancel
                </button>
                <button
                  className="edit-comment-button"
                  onClick={(e) => editCommentHandler(comment._id, e)}
                >
                  Edit
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="header">
                <span className="name">{comment.author}</span>{" "}
                <span className="time">
                  <TimeAgo date={comment.createdAt} />
                </span>
              </div>
              <div className="comment-text" ref={textToCopy}>
                {comment.text}
              </div>
              <div className="tool-box">
                <Upvotes
                  upvotes={comment.upvotes}
                  flexDirection="row"
                  darkModeBg="#1A1A1B"
                  whiteModebg="white"
                  commentId={comment._id}
                  upvoted={checkIfCommentIsUpvoted(comment._id)}
                  downvoted={checkIfCommentIsDownvoted(comment._id)}
                />
                <span
                  className="button"
                  onClick={() => copyToClipboard(comment.text)}
                >
                  Copy text
                </span>
                {comment.authorId === loggedUser._id && (
                  <span
                    className="button"
                    onClick={() => {
                      setCommentData({
                        ...commentData,
                        editComment: true,
                        commentId: comment._id,
                        editCommentText: comment.text,
                      });
                    }}
                  >
                    Edit
                  </span>
                )}
                {comment.authorId === loggedUser._id && (
                  <span
                    className="button"
                    onClick={() => deleteComment(comment._id)}
                  >
                    Delete
                  </span>
                )}
              </div>
            </>
          )}
        </div>
      ))}
    </CommentsComponent>
  );
};

export default Comments;
