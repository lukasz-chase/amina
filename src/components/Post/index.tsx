import React from "react";
//styles
import { PostComponent } from "./PostStyles";
//icons
import { BiUpvote, BiDownvote, BiBookmarkPlus } from "react-icons/bi";
import { FaRegCommentAlt } from "react-icons/fa";
import { IoIosShareAlt } from "react-icons/io";
//format time
import { format } from "timeago.js";
//store
import viewState from "../../state/viewState";
//components
import UpvoteStyles from "../Upvotes";
//interfaces
import { PostProperties } from "../../interfaces";
import JoinButton from "../JoinButton";

interface PostProps {
  post: PostProperties;
}

const Post: React.FC<PostProps> = ({ post }) => {
  //state
  const darkMode: boolean = viewState((state) => state.darkMode);
  const classicView: boolean = viewState((state) => state.classicView);
  const compactView: boolean = viewState((state) => state.compactView);
  return (
    <PostComponent
      $darkmode={darkMode}
      $classicview={classicView}
      $compactview={compactView}
      to={`/post/${post.id}`}
      onClick={() => window.scrollTo(0, 0)}
    >
      <UpvoteStyles
        upvotes={post.upvotes}
        flexDirection="column"
        darkModeBg="#242425"
      />
      <div className="view">
        <div className="post-header">
          <div className="header-info">
            <span className="name">
              <div className="logo">
                <img src={post.subaminLogo} alt={post.subaminName} />
              </div>
              a/{post.subaminName}
              <span className="author">Posted by u/{post.author}</span>
              <span className="date">{format(post.date)}</span>
            </span>
            <JoinButton />
          </div>
          <div className="post-title">{post.title}</div>
          <div className="post-tools">
            <button className="comment">
              <FaRegCommentAlt className="icon" /> Comments
            </button>
            <button className="share">
              <IoIosShareAlt className="icon" /> Share
            </button>
            <button className="save">
              <BiBookmarkPlus className="icon" /> Save
            </button>
          </div>
        </div>
        {post.image && (
          <div className="post-image">
            <img src={post.image} alt={post.title} />
          </div>
        )}

        <div className="post-tools">
          <div className="upvotes">
            <BiUpvote className="upvote-button" />
            <span>
              {post.upvotes > 1000
                ? (post.upvotes / 1000).toFixed(1) + "K"
                : post.upvotes}
            </span>
            <BiDownvote className="downvote-button" />
          </div>
          <button className="comment">
            <FaRegCommentAlt className="icon" /> Comments
          </button>
          <button className="share">
            <IoIosShareAlt className="icon" /> Share
          </button>
          <button className="save">
            <BiBookmarkPlus className="icon" /> Save
          </button>
        </div>
      </div>
    </PostComponent>
  );
};

export default Post;
