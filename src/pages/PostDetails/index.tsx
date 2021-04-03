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
//location
import { useLocation, useHistory } from "react-router-dom";
import { Location } from "history";
//icons
import { AiOutlineArrowLeft } from "react-icons/ai";
import {
  BsBookmark,
  BsGraphUp,
  BsArrowsCollapse,
  BsFileText,
} from "react-icons/bs";
import { MdNewReleases } from "react-icons/md";
//format time
import { format } from "timeago.js";
import UpvoteStyles from "../../components/Upvotes";

const PostDetails: React.FC = () => {
  //state
  const postDetails = postState((state) => state.postDetails);
  const fetchPostDetails = postState((state) => state.fetchPostDetails);
  const collapseThread = postState((state) => state.collapseThread);
  const darkMode = viewState((state) => state.darkMode);
  const [sortNewComments, setSortNewComments] = useState<boolean>(false);
  const location = useLocation<Location>();
  const postId = location.pathname.split("/")[2];
  const history = useHistory();
  const textToCopy = useRef<HTMLDivElement>(null);
  //useEffect
  useEffect(() => {
    fetchPostDetails(Number(postId));
  }, [postId, fetchPostDetails]);
  //handlers
  const copyToClipboard = (str: string) => {
    const el = document.createElement("textarea");
    el.value = str;
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
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
            <UpvoteStyles
              upvotes={postDetails.upvotes}
              flexDirection="column"
              darkModeBg="#1A1A1B"
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
                  - {format(postDetails.date)}
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
          </div>
        </div>
      </DetailsComponent>
      {postDetails.comments && (
        <CommentsComponent darkmode={darkMode}>
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
            .map((comment) => (
              <div className="comment" key={comment.id}>
                <div className="header">
                  <span className="name">{comment.author}</span>{" "}
                  <span className="time">{format(comment.date)}</span>
                </div>
                <div className="comment-text" ref={textToCopy}>
                  {comment.text}
                </div>
                <div className="tool-box">
                  <UpvoteStyles
                    upvotes={comment.upvotes}
                    flexDirection="row"
                    darkModeBg="#1A1A1B"
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
