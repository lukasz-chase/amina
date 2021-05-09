import React, { useEffect, useState, useRef } from "react";
//styling
import {
  DetailsComponent,
  CommentsComponent,
  Header,
  Wrapper,
} from "./PostDetailsStyles";
//store
import postState from "../../state/postState";
import viewState from "../../state/viewState";
import userState from "../../state/userState";
//material ui
import TextField from "@material-ui/core/TextField";
import Input from "@material-ui/core/Input";
//location
import { useLocation, useHistory, Link } from "react-router-dom";
import { Location } from "history";
//icons
import { AiOutlineArrowLeft } from "react-icons/ai";
import { BsGraphUp, BsBookmarkCheck, BsBookmarkDash } from "react-icons/bs";
import { MdNewReleases } from "react-icons/md";
import { GoTrashcan } from "react-icons/go";
//format time
import TimeAgo from "react-timeago";
//components
import Upvotes from "../../components/Upvotes";
//axios
import axios from "axios";
//interface
import { User, PostProperties } from "../../interfaces";

const PostDetails: React.FC = () => {
  //state
  const postDetails = postState<PostProperties>((state) => state.postDetails);
  const fetchPostDetails = postState((state) => state.fetchPostDetails);
  const loggedUser = userState<User>((state) => state.loggedUser);
  const isLogged = userState<boolean>((state) => state.isLogged);
  const darkmodeState = viewState((state) => state.darkMode);
  const darkMode: boolean = isLogged ? loggedUser.darkMode : darkmodeState;
  const [sortNewComments, setSortNewComments] = useState<boolean>(false);
  const location = useLocation<Location>();
  const postId = location.pathname.split("/")[2];
  const history = useHistory<Location>();
  const textToCopy = useRef<HTMLDivElement>(null);
  const fetchUser = userState((state) => state.fetchLoggedUser);
  const [comment, setComment] = useState<string>("");
  const [upvoted, setUpvoted] = useState<boolean>(false);
  const [downvoted, setDownvoted] = useState<boolean>(false);
  const [editComment, setEditComment] = useState<boolean>(false);
  const [editCommentText, setEditCommentText] = useState<string>("");
  const [commentId, setCommentId] = useState<number>(0);
  const [isSaved, setIsSaved] = useState<boolean>(false);
  //useEffect
  useEffect(() => {
    fetchPostDetails(Number(postId));
  }, [postId, fetchPostDetails]);
  useEffect(() => {
    fetchUser(Number(localStorage.getItem("userId")));
  }, [fetchUser]);
  useEffect(() => {
    if (
      isLogged &&
      postDetails.upvotedBy &&
      postDetails.upvotedBy.find((a) => a === loggedUser.id)
    ) {
      setUpvoted(true);
    } else if (
      postDetails.downvotedBy &&
      postDetails.downvotedBy.find((a) => a === loggedUser.id)
    ) {
      setDownvoted(true);
    }
  }, [isLogged, loggedUser.id, postDetails.downvotedBy, postDetails.upvotedBy]);
  useEffect(() => {
    if (isLogged) {
      setIsSaved(
        loggedUser.savedPosts.find((a) => a === postDetails.id) ? true : false
      );
    }
  }, [setIsSaved, loggedUser.savedPosts, postDetails.id, isLogged]);
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
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, "0");
    const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    const yyyy = today.getFullYear();
    const hour = today.getHours();
    const minutes = today.getMinutes();
    const seconds = today.getSeconds();
    e.preventDefault();
    if (comment) {
      axios
        .put(`http://localhost:3000/posts/${postDetails.id}`, {
          id: postDetails.id,
          subaminId: postDetails.subaminId,
          subaminName: postDetails.subaminName,
          subaminLogo: postDetails.subaminLogo,
          date: postDetails.date,
          title: postDetails.title,
          description: postDetails.description,
          author: postDetails.author,
          authorId: postDetails.authorId,
          upvotes: postDetails.upvotes,
          upvotedBy: postDetails.upvotedBy,
          downvotedBy: postDetails.downvotedBy,
          image: postDetails.image,
          comments: [
            ...postDetails.comments!,
            {
              id: postDetails.comments!.length + 1,
              author: loggedUser.username,
              authorId: loggedUser.id,
              upvotes: 0,
              date: `${mm}/${dd}/${yyyy}, ${hour}:${minutes}:${seconds}`,
              text: comment,
              upvotedBy: [],
              downvotedBy: [],
            },
          ],
        })
        .then(() => {
          setComment("");
          fetchPostDetails(Number(postId));
        });
    }
  };
  const upvoteHandler = (what: string) => {
    if (
      postDetails.upvotedBy &&
      postDetails.upvotedBy.find((a) => a === loggedUser.id)
    ) {
      axios
        .put(`http://localhost:3000/posts/${postDetails.id}`, {
          id: postDetails.id,
          subaminId: postDetails.subaminId,
          subaminName: postDetails.subaminName,
          subaminLogo: postDetails.subaminLogo,
          date: postDetails.date,
          title: postDetails.title,
          description: postDetails.description,
          author: postDetails.author,
          authorId: postDetails.authorId,
          upvotes: postDetails.upvotes - 1,
          upvotedBy: postDetails.upvotedBy.filter((a) => a !== loggedUser.id),
          downvotedBy: postDetails.downvotedBy,
          image: postDetails.image,
          comments: postDetails.comments,
        })
        .then(() => {
          setDownvoted(false);
          setUpvoted(false);
          fetchPostDetails(Number(postId));
        });
    } else if (
      postDetails.downvotedBy &&
      postDetails.downvotedBy.find((a) => a === loggedUser.id)
    ) {
      axios
        .put(`http://localhost:3000/posts/${postDetails.id}`, {
          id: postDetails.id,
          subaminId: postDetails.subaminId,
          subaminName: postDetails.subaminName,
          subaminLogo: postDetails.subaminLogo,
          date: postDetails.date,
          title: postDetails.title,
          description: postDetails.description,
          author: postDetails.author,
          authorId: postDetails.authorId,
          upvotes: postDetails.upvotes + 1,
          upvotedBy: postDetails.upvotedBy,
          downvotedBy: postDetails.downvotedBy.filter(
            (a) => a !== loggedUser.id
          ),
          image: postDetails.image,
          comments: postDetails.comments,
        })
        .then(() => {
          setUpvoted(false);
          setDownvoted(false);
          fetchPostDetails(Number(postId));
        });
    } else {
      axios
        .put(`http://localhost:3000/posts/${postDetails.id}`, {
          id: postDetails.id,
          subaminId: postDetails.subaminId,
          subaminName: postDetails.subaminName,
          subaminLogo: postDetails.subaminLogo,
          date: postDetails.date,
          title: postDetails.title,
          description: postDetails.description,
          author: postDetails.author,
          authorId: postDetails.authorId,
          upvotes:
            what === "upvote"
              ? postDetails.upvotes + 1
              : postDetails.upvotes - 1,
          upvotedBy:
            what === "upvote"
              ? [...postDetails.upvotedBy, loggedUser.id]
              : postDetails.upvotedBy,
          downvotedBy:
            what === "downvote"
              ? [...postDetails.downvotedBy, loggedUser.id]
              : postDetails.downvotedBy,
          image: postDetails.image,
          comments: postDetails.comments,
        })
        .then(() => {
          if (what === "upvote") {
            setUpvoted(true);
          } else {
            setDownvoted(true);
          }
          fetchPostDetails(Number(postId));
        });
    }
  };
  const checkIfCommentIsUpvoted = (id: number) => {
    const comment = postDetails.comments!.find((a) => a.id === id);

    const isCommentUpvoted = comment!.upvotedBy.find(
      (a) => a === loggedUser.id
    );

    if (isCommentUpvoted) {
      return true;
    } else {
      return false;
    }
  };
  const checkIfCommentIsDownvoted = (id: number) => {
    const comment = postDetails.comments!.find((a) => a.id === id);

    const isCommentDownvoted = comment!.downvotedBy.find(
      (a) => a === loggedUser.id
    );
    if (isCommentDownvoted) {
      return true;
    } else {
      return false;
    }
  };
  const upvoteCommentHandler = (id: number, what: string, text: string) => {
    if (postDetails.comments && checkIfCommentIsUpvoted(id)) {
      axios
        .put(`http://localhost:3000/posts/${postDetails.id}`, {
          id: postDetails.id,
          subaminId: postDetails.subaminId,
          subaminName: postDetails.subaminName,
          subaminLogo: postDetails.subaminLogo,
          date: postDetails.date,
          title: postDetails.title,
          description: postDetails.description,
          author: postDetails.author,
          authorId: postDetails.authorId,
          upvotes: postDetails.upvotes,
          upvotedBy: postDetails.upvotedBy,
          downvotedBy: postDetails.downvotedBy,
          image: postDetails.image,
          comments: postDetails.comments!.map((comment) =>
            comment.id === id && comment.text === text
              ? (comment = {
                  ...comment,
                  upvotes: comment.upvotes - 1,
                  upvotedBy: comment.upvotedBy.filter(
                    (a) => a !== loggedUser.id
                  ),
                })
              : comment
          ),
        })
        .then(() => {
          fetchPostDetails(Number(postId));
        });
    } else if (postDetails.comments && checkIfCommentIsDownvoted(id)) {
      axios
        .put(`http://localhost:3000/posts/${postDetails.id}`, {
          id: postDetails.id,
          subaminId: postDetails.subaminId,
          subaminName: postDetails.subaminName,
          subaminLogo: postDetails.subaminLogo,
          date: postDetails.date,
          title: postDetails.title,
          description: postDetails.description,
          author: postDetails.author,
          authorId: postDetails.authorId,
          upvotes: postDetails.upvotes,
          upvotedBy: postDetails.upvotedBy,
          downvotedBy: postDetails.downvotedBy,
          image: postDetails.image,
          comments: postDetails.comments!.map((comment) =>
            comment.id === id && comment.text === text
              ? (comment = {
                  ...comment,
                  upvotes: comment.upvotes + 1,
                  downvotedBy: comment.downvotedBy.filter(
                    (a) => a !== loggedUser.id
                  ),
                })
              : comment
          ),
        })
        .then(() => {
          fetchPostDetails(Number(postId));
        });
    } else {
      axios
        .put(`http://localhost:3000/posts/${postDetails.id}`, {
          id: postDetails.id,
          subaminId: postDetails.subaminId,
          subaminName: postDetails.subaminName,
          subaminLogo: postDetails.subaminLogo,
          date: postDetails.date,
          title: postDetails.title,
          description: postDetails.description,
          author: postDetails.author,
          authorId: postDetails.authorId,
          upvotes: postDetails.upvotes,
          upvotedBy: postDetails.upvotedBy,
          downvotedBy: postDetails.downvotedBy,
          image: postDetails.image,
          comments: postDetails.comments!.map((comment) =>
            comment.id === id && comment.text === text
              ? (comment = {
                  ...comment,
                  upvotes:
                    what === "upvote"
                      ? comment.upvotes + 1
                      : comment.upvotes - 1,
                  downvotedBy:
                    what === "upvote"
                      ? comment.downvotedBy
                      : [...comment.downvotedBy, loggedUser.id],
                  upvotedBy:
                    what === "upvote"
                      ? [...comment.upvotedBy, loggedUser.id]
                      : comment.upvotedBy,
                })
              : comment
          ),
        })
        .then(() => {
          fetchPostDetails(Number(postId));
        });
    }
  };
  const editCommentHandler = (
    id: number,
    e: React.FormEvent<HTMLButtonElement>
  ) => {
    if (editCommentText) {
      e.preventDefault();
      axios
        .put(`http://localhost:3000/posts/${postDetails.id}`, {
          id: postDetails.id,
          subaminId: postDetails.subaminId,
          subaminName: postDetails.subaminName,
          subaminLogo: postDetails.subaminLogo,
          date: postDetails.date,
          title: postDetails.title,
          description: postDetails.description,
          author: postDetails.author,
          authorId: postDetails.authorId,
          upvotes: postDetails.upvotes,
          upvotedBy: postDetails.upvotedBy,
          downvotedBy: postDetails.downvotedBy,
          image: postDetails.image,
          comments: postDetails.comments!.map((comment) =>
            comment.id === id
              ? (comment = {
                  ...comment,
                  text: editCommentText,
                })
              : comment
          ),
        })
        .then(() => {
          fetchPostDetails(Number(postId));
        });
    }
  };
  const deleteCommentHandler = (id: number) => {
    axios
      .put(`http://localhost:3000/posts/${postDetails.id}`, {
        id: postDetails.id,
        subaminId: postDetails.subaminId,
        subaminName: postDetails.subaminName,
        subaminLogo: postDetails.subaminLogo,
        date: postDetails.date,
        title: postDetails.title,
        description: postDetails.description,
        author: postDetails.author,
        authorId: postDetails.authorId,
        upvotes: postDetails.upvotes,
        upvotedBy: postDetails.upvotedBy,
        downvotedBy: postDetails.downvotedBy,
        image: postDetails.image,
        comments: postDetails.comments!.filter((a) => a.id !== id),
      })
      .then(() => {
        fetchPostDetails(Number(postId));
      });
  };
  const deletePostHandler = () => {
    axios
      .delete(`http://localhost:3000/posts/${postDetails.id}`)
      .then(() => history.push(`/`));
  };
  const addToSavedHandler = () => {
    if (isSaved) {
      axios
        .put(`http://localhost:3000/users/${loggedUser.id}`, {
          username: loggedUser.username,
          email: loggedUser.email,
          password: loggedUser.password,
          followedSubaminas: loggedUser.followedSubaminas,
          savedPosts: loggedUser.savedPosts.filter((a) => a !== postDetails.id),
          logo: loggedUser.logo,
          birthday: loggedUser.birthday,
          id: loggedUser.id,
          darkMode: loggedUser.darkMode,
        })
        .then(() => {
          setIsSaved(false);
          fetchPostDetails(Number(postId));
        });
    } else {
      axios
        .put(`http://localhost:3000/users/${loggedUser.id}`, {
          username: loggedUser.username,
          email: loggedUser.email,
          password: loggedUser.password,
          followedSubaminas: loggedUser.followedSubaminas,
          savedPosts: [...loggedUser.savedPosts, postDetails.id],
          logo: loggedUser.logo,
          birthday: loggedUser.birthday,
          id: loggedUser.id,
          darkMode: loggedUser.darkMode,
        })
        .then(() => {
          setIsSaved(true);
          fetchPostDetails(Number(postId));
        });
    }
  };
  return (
    <Wrapper darkmode={darkMode}>
      <Header darkmode={darkMode}>
        <div className="wrapper">
          <AiOutlineArrowLeft
            onClick={() => history.goBack()}
            className="icon"
          />
          <span>{postDetails.subaminName}</span>
          <div className="save" onClick={() => addToSavedHandler()}>
            {isSaved ? <BsBookmarkDash /> : <BsBookmarkCheck />}
          </div>
        </div>
      </Header>
      <DetailsComponent darkmode={darkMode}>
        <div className="post-wrapper">
          <div className="upvotes">
            <Upvotes
              upvotes={postDetails.upvotes}
              flexDirection="column"
              darkModeBg="#1A1A1B"
              whiteModebg="white"
              upvotePost={upvoteHandler}
              upvoted={upvoted}
              downvoted={downvoted}
            />
          </div>
          <div className="post">
            <div className="post-info">
              <div className="logo">
                <img
                  src={postDetails.subaminLogo}
                  alt={postDetails.subaminName}
                />
              </div>
              <div className="details">
                <Link
                  className="subamin-name"
                  to={`/s/${postDetails.subaminId}`}
                >
                  a/{postDetails.subaminName}
                </Link>
                <span>
                  Posted by{" "}
                  <Link to={`/user/${postDetails.authorId}`} className="user">
                    u/{postDetails.author}
                  </Link>{" "}
                  - <TimeAgo date={postDetails.date} />
                </span>
              </div>
            </div>
            <div className="post-details">
              <span className="post-title">{postDetails.title}</span>
              {postDetails.image && (
                <img src={postDetails.image} alt={postDetails.title} />
              )}
              <span>{postDetails.description}</span>
              {postDetails.authorId === loggedUser.id && (
                <span
                  onClick={() => deletePostHandler()}
                  className="delete-button"
                >
                  <GoTrashcan />
                  Delete
                </span>
              )}
            </div>
            <div className="upvotes-sm">
              <Upvotes
                upvotes={postDetails.upvotes}
                flexDirection="row"
                darkModeBg="#1A1A1B"
                whiteModebg="white"
                upvotePost={upvoteHandler}
                upvoted={upvoted}
                downvoted={downvoted}
              />
            </div>
          </div>
        </div>
      </DetailsComponent>
      {postDetails.comments && (
        <CommentsComponent
          darkmode={darkMode}
          comment={comment ? true : false}
          ready={editCommentText ? true : false}
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
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
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
            <span onClick={() => setSortNewComments(false)}>
              <BsGraphUp /> Top
            </span>
            <span onClick={() => setSortNewComments(true)}>
              <MdNewReleases /> New
            </span>
          </div>
          {postDetails
            .comments!.sort((a: any, b: any) =>
              sortNewComments ? a.id - b.id : b.upvotes - a.upvotes
            )
            .map((comment, index) => (
              <div className="comment" key={index}>
                {editComment && commentId === comment.id ? (
                  <form className="edit-comment">
                    <Input
                      className="edit-comment-field"
                      value={editCommentText}
                      multiline
                      onChange={(e) => setEditCommentText(e.target.value)}
                      disableUnderline
                    />
                    <div className="buttons">
                      <button
                        className="edit-comment-button"
                        onClick={() => setEditComment(false)}
                      >
                        Cancel
                      </button>
                      <button
                        className="edit-comment-button"
                        onClick={(e) => editCommentHandler(comment.id, e)}
                      >
                        Edit
                      </button>
                    </div>
                  </form>
                ) : (
                  <>
                    <div className="header">
                      <span className="name">{comment.author}</span>{" "}
                      <span className="time">
                        <TimeAgo date={comment.date} />
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
                        upvoteComment={upvoteCommentHandler}
                        commentId={comment.id}
                        commentText={comment.text}
                        upvoted={checkIfCommentIsUpvoted(comment.id)}
                        downvoted={checkIfCommentIsDownvoted(comment.id)}
                      />
                      <span
                        className="button"
                        onClick={() => copyToClipboard(comment.text)}
                      >
                        Copy text
                      </span>
                      {comment.authorId === loggedUser.id && (
                        <span
                          className="button"
                          onClick={() => {
                            setEditComment(true);
                            setCommentId(comment.id);
                            setEditCommentText(comment.text);
                          }}
                        >
                          Edit
                        </span>
                      )}
                      {comment.authorId === loggedUser.id && (
                        <span
                          className="button"
                          onClick={() => deleteCommentHandler(comment.id)}
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
      )}
    </Wrapper>
  );
};

export default PostDetails;
