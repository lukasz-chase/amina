import React, { useState, useEffect } from "react";
//styles
import { PostComponent } from "./PostStyles";
//icons
import { BiUpvote, BiDownvote, BiBookmarkPlus } from "react-icons/bi";
import { FaRegCommentAlt } from "react-icons/fa";
import { IoIosShareAlt } from "react-icons/io";
//format time
import TimeAgo from "react-timeago";
//store
import viewState from "../../state/viewState";
import userState from "../../state/userState";
//components
import Upvotes from "../Upvotes";
//interfaces
import { PostProperties } from "../../interfaces";
import JoinButton from "../JoinButton";
//axios
import axios from "axios";
import { Link } from "react-router-dom";
interface PostProps {
  post: PostProperties;
}

const Post: React.FC<PostProps> = ({ post }) => {
  //state
  const loggedUser = userState((state) => state.loggedUser);
  const isLogged = userState((state) => state.isLogged);
  const fetchUser = userState((state) => state.fetchUser);
  const darkmodeState = viewState((state) => state.darkMode);
  const darkMode: boolean = isLogged ? loggedUser.darkMode : darkmodeState;
  const classicView: boolean = viewState((state) => state.classicView);
  const compactView: boolean = viewState((state) => state.compactView);
  const [upvoted, setUpvoted] = useState<boolean>(false);
  const [downvoted, setDownvoted] = useState(false);
  //useEffect
  useEffect(() => {
    if (
      isLogged &&
      post.upvotedBy &&
      post.upvotedBy.find((a) => a === loggedUser.id)
    ) {
      setUpvoted(true);
    } else if (
      post.downvotedBy &&
      post.downvotedBy.find((a) => a === loggedUser.id)
    ) {
      setDownvoted(true);
    }
  }, [isLogged, loggedUser.id, post.downvotedBy, post.upvotedBy]);
  //handlers
  const upvoteHandler = (what: string) => {
    if (post.upvotedBy && post.upvotedBy.find((a) => a === loggedUser.id)) {
      axios
        .put(`http://localhost:3000/posts/${post.id}`, {
          id: post.id,
          subaminId: post.subaminId,
          subaminName: post.subaminName,
          subaminLogo: post.subaminLogo,
          date: post.date,
          title: post.title,
          description: post.description,
          author: post.author,
          upvotes: post.upvotes - 1,
          upvotedBy: post.upvotedBy.filter((a) => a !== loggedUser.id),
          downvotedBy: post.downvotedBy,
          image: post.image,
          comments: post.comments,
        })
        .then(() => {
          setDownvoted(false);
          setUpvoted(false);
          fetchUser(Number(localStorage.getItem("userId")));
        });
    } else if (
      post.downvotedBy &&
      post.downvotedBy.find((a) => a === loggedUser.id)
    ) {
      axios
        .put(`http://localhost:3000/posts/${post.id}`, {
          id: post.id,
          subaminId: post.subaminId,
          subaminName: post.subaminName,
          subaminLogo: post.subaminLogo,
          date: post.date,
          title: post.title,
          description: post.description,
          author: post.author,
          upvotes: post.upvotes + 1,
          upvotedBy: post.upvotedBy,
          downvotedBy: post.downvotedBy.filter((a) => a !== loggedUser.id),
          image: post.image,
          comments: post.comments,
        })
        .then(() => {
          setUpvoted(false);
          setDownvoted(false);
          fetchUser(Number(localStorage.getItem("userId")));
        });
    } else {
      axios
        .put(`http://localhost:3000/posts/${post.id}`, {
          id: post.id,
          subaminId: post.subaminId,
          subaminName: post.subaminName,
          subaminLogo: post.subaminLogo,
          date: post.date,
          title: post.title,
          description: post.description,
          author: post.author,
          upvotes: what === "upvote" ? post.upvotes + 1 : post.upvotes - 1,
          upvotedBy:
            what === "upvote"
              ? [...post.upvotedBy, loggedUser.id]
              : post.upvotedBy,
          downvotedBy:
            what === "downvote"
              ? [...post.downvotedBy, loggedUser.id]
              : post.downvotedBy,
          image: post.image,
          comments: post.comments,
        })
        .then(() => {
          if (what === "upvote") {
            setUpvoted(true);
          } else {
            setDownvoted(true);
          }
          fetchUser(Number(localStorage.getItem("userId")));
        });
    }
  };
  console.log(post.subaminId);
  return (
    <PostComponent
      $darkmode={darkMode}
      $classicview={classicView}
      $compactview={compactView}
    >
      <Upvotes
        upvotes={post.upvotes}
        flexDirection="column"
        darkModeBg="#1A1A1B"
        whiteModebg="#F3F3F3"
        upvotePost={upvoteHandler}
        upvoted={upvoted}
        downvoted={downvoted}
      />
      <JoinButton id={post.subaminId} />
      <Link
        to={`/post/${post.id}`}
        className="link"
        onClick={() => window.scrollTo(0, 0)}
      >
        <div className="view">
          <div className="post-header">
            <div className="header-info">
              <span className="name">
                <div className="logo">
                  <img src={post.subaminLogo} alt={post.subaminName} />
                </div>
                a/{post.subaminName}
                <span className="author">Posted by u/{post.author}</span>
                <span className="date">
                  <TimeAgo date={post.date} />
                </span>
              </span>
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
              <BiUpvote
                className="upvote-button"
                onClick={() => upvoteHandler("upvote")}
              />
              <span>
                {post.upvotes > 1000
                  ? (post.upvotes / 1000).toFixed(1) + "K"
                  : post.upvotes}
              </span>
              <BiDownvote
                className="downvote-button"
                onClick={() => upvoteHandler("downvote")}
              />
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
      </Link>
    </PostComponent>
  );
};

export default Post;
