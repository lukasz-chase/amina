import React, { useEffect } from "react";
//styling
import { DetailsComponent, CommentsComponent } from "./PostDetailsStyles";
//store
import useStore from "../../store";
//location
import { useLocation } from "react-router-dom";
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
import { BiUpvote, BiDownvote } from "react-icons/bi";
//format time
import { format } from "timeago.js";

const PostDetails: React.FC = () => {
  //state
  const postDetails = useStore((state) => state.postDetails);
  const fetchPostDetails = useStore((state) => state.fetchPostDetails);
  const darkMode = useStore((state) => state.darkMode);
  const location = useLocation<Location>();
  const postId = location.pathname.split("/")[2];
  //useEffect
  useEffect(() => {
    fetchPostDetails(Number(postId));
  }, [postId, fetchPostDetails]);
  console.log(postDetails);
  return (
    <DetailsComponent>
      <div className="header">
        <AiOutlineArrowLeft />
        <span>{postDetails.subaminName}</span>
        <BsBookmark />
      </div>
      <div className="post-info">
        <div className="logo">
          <img src={postDetails.subaminLogo} alt={postDetails.subaminName} />
        </div>
        <div className="details">
          <span>a/{postDetails.subaminName}</span>
          <span>
            Posted by u/{postDetails.author} - {format(postDetails.date)}
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
      {postDetails.comments && (
        <CommentsComponent>
          {postDetails.comments!.map((comment) => (
            <div className="comment">
              <div className="sort-comments">
                <span>
                  <BsGraphUp /> Top
                </span>
                <span>
                  <MdNewReleases /> New
                </span>
              </div>
              <div className="header">
                <span>u/{comment.author}</span> -{" "}
                <span>{format(comment.date)}</span>
              </div>
              <div className="comment-text">{comment.text}</div>
              <div className="tool-box">
                <span>
                  <BsArrowsCollapse /> Collapse thread
                </span>
                <span>
                  <BsFileText /> Copy text
                </span>
                <span>
                  <BsFileText /> Copy text
                </span>
                <BiUpvote />
                <span>
                  {comment.upvotes > 1000
                    ? (comment.upvotes / 1000).toFixed(1) + "K"
                    : comment.upvotes}
                </span>
                <BiDownvote />
              </div>
            </div>
          ))}
        </CommentsComponent>
      )}
    </DetailsComponent>
  );
};

export default PostDetails;
