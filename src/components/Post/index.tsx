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
import useStore from "../../store";

interface CommentProperties {
  id: number;
  author: string;
  upvotes: number;
  date: string;
}

interface PostProperties {
  id: number;
  subamindId: number;
  subaminName: string;
  subaminLogo: string;
  title: string;
  description: string;
  author: string;
  upvotes: number;
  date: string;
  image?: string;
  comments?: CommentProperties[];
}

interface PostProps {
  post: PostProperties;
}

const Post: React.FC<PostProps> = ({ post }) => {
  //state
  const darkMode: boolean = useStore((state) => state.darkMode);
  const classicView: boolean = useStore((state) => state.classicView);
  const compactView: boolean = useStore((state) => state.compactView);
  return (
    <PostComponent
      $darkmode={darkMode}
      $classicview={classicView}
      $compactview={compactView}
      to={`post/${post.id}`}
    >
      <div className="upvotes">
        <BiUpvote className="upvote-button" />
        <span>
          {" "}
          {post.upvotes > 1000
            ? (post.upvotes / 1000).toFixed(1) + "K"
            : post.upvotes}
        </span>
        <BiDownvote className="downvote-button" />
      </div>
      <div className="view">
        <div className="post-header">
          <div className="header-info">
            <span className="name">
              <div className="logo">
                <img src={post.subaminLogo} alt={post.subaminName} />
              </div>
              a/{post.subaminName}
              <span className="author">Posted by u/{post.author}</span>
              <span className="author">{format(post.date)}</span>
            </span>
            <div className="join">
              <button className="join-button">
                + <span>join</span>
              </button>
            </div>
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
