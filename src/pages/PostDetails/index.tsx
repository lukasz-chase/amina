import React, { useEffect } from "react";
//styling
import {
  DetailsComponent,
  CommentsComponent,
  Header,
} from "./PostDetailsStyles";
//store
import useStore from "../../store";
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
  const postDetails = useStore((state) => state.postDetails);
  const fetchPostDetails = useStore((state) => state.fetchPostDetails);
  const darkMode = useStore((state) => state.darkMode);
  const location = useLocation<Location>();
  const postId = location.pathname.split("/")[2];
  const history = useHistory();
  //useEffect
  useEffect(() => {
    fetchPostDetails(Number(postId));
  }, [postId, fetchPostDetails]);
  console.log(postDetails);
  return (
    <>
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
            <span>
              <BsGraphUp /> Top
            </span>
            <span>
              <MdNewReleases /> New
            </span>
          </div>
          {postDetails.comments!.map((comment) => (
            <div className="comment">
              <div className="header">
                <span className="name">{comment.author}</span>{" "}
                <span className="time">{format(comment.date)}</span>
              </div>
              <div className="comment-text">{comment.text}</div>
              <div className="tool-box">
                <UpvoteStyles
                  upvotes={comment.upvotes}
                  flexDirection="row"
                  darkModeBg="#1A1A1B"
                />
                <span className="button">
                  <BsArrowsCollapse /> Collapse thread
                </span>
                <span className="button">
                  <BsFileText /> Copy text
                </span>
              </div>
            </div>
          ))}
        </CommentsComponent>
      )}
    </>
  );
};

export default PostDetails;
