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
//location
import { useLocation, useHistory } from "react-router-dom";
import { Location } from "history";
//icons
//icons
import { BiUpvote, BiDownvote } from "react-icons/bi";
import { AiOutlineArrowLeft } from "react-icons/ai";
import {
  BsBookmark,
  BsGraphUp,
  BsArrowsCollapse,
  BsFileText,
} from "react-icons/bs";
import { MdNewReleases } from "react-icons/md";
//format time
import TimeAgo from "react-timeago";
//components
import Upvotes from "../../components/Upvotes";
//axios
import axios from "axios";

const PostDetails: React.FC = () => {
  //state
  const postDetails = postState((state) => state.postDetails);
  const fetchPostDetails = postState((state) => state.fetchPostDetails);
  const collapseThread = postState((state) => state.collapseThread);
  const loggedUser = userState((state) => state.loggedUser);
  const isLogged = userState((state) => state.isLogged);
  const darkmodeState = viewState((state) => state.darkMode);
  const darkMode: boolean = isLogged ? loggedUser.darkMode : darkmodeState;
  const [sortNewComments, setSortNewComments] = useState<boolean>(false);
  const location = useLocation<Location>();
  const postId = location.pathname.split("/")[2];
  const history = useHistory();
  const textToCopy = useRef<HTMLDivElement>(null);
  const fetchUser = userState((state) => state.fetchUser);
  const [comment, setComment] = useState("");
  //useEffect
  useEffect(() => {
    fetchPostDetails(Number(postId));
  }, [postId, fetchPostDetails]);
  useEffect(() => {
    fetchUser(Number(localStorage.getItem("userId")));
  }, [fetchUser]);
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
          subamindId: postDetails.subamindId,
          subaminName: postDetails.subaminName,
          subaminLogo: postDetails.subaminLogo,
          date: postDetails.date,
          title: postDetails.title,
          description: postDetails.description,
          author: postDetails.author,
          upvotes: postDetails.upvotes,
          upvotedBy: postDetails.upvotedBy,
          downvotedBy: postDetails.downvotedBy,
          image: postDetails.image,
          comments: [
            ...postDetails.comments!,
            {
              id: postDetails.comments!.length + 1,
              author: loggedUser.username,
              upvotes: 0,
              date: `${mm}/${dd}/${yyyy}, ${hour}:${minutes}:${seconds}`,
              text: comment,
            },
          ],
        })
        .then(() => {
          setComment("");
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
          <BsBookmark className="icon" />
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
                <span className="subamin-name">
                  a/{postDetails.subaminName}
                </span>
                <span>
                  Posted by <span className="user">u/{postDetails.author}</span>{" "}
                  - <TimeAgo date={postDetails.date} />
                </span>
              </div>
            </div>
            <div className="post-details">
              <span>{postDetails.title}</span>
              {postDetails.image && (
                <img src={postDetails.image} alt={postDetails.title} />
              )}
              <span>{postDetails.description}</span>
            </div>
            <div className="upvotes-sm">
              <BiUpvote className="upvote-button" />
              <span>
                {postDetails.upvotes > 1000
                  ? (postDetails.upvotes / 1000).toFixed(1) + "K"
                  : postDetails.upvotes}
              </span>
              <BiDownvote className="downvote-button" />
            </div>
          </div>
        </div>
      </DetailsComponent>
      {postDetails.comments && (
        <CommentsComponent darkmode={darkMode} comment={comment ? true : false}>
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
                  />
                  <span
                    className="button"
                    onClick={() => collapseThread(comment.id)}
                  >
                    <BsArrowsCollapse /> Collapse thread
                  </span>
                  <span
                    className="button"
                    onClick={() => copyToClipboard(comment.text)}
                  >
                    <BsFileText /> Copy text
                  </span>
                </div>
              </div>
            ))}
        </CommentsComponent>
      )}
    </Wrapper>
  );
};

export default PostDetails;
