import React, { useState, useEffect } from "react";
//styles
import { PostComponent } from "./PostStyles";
//icons
import { BsBookmarkCheck, BsBookmarkDash } from "react-icons/bs";
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
import { Link } from "react-router-dom";
//location
import { useHistory } from "react-router-dom";
import { Location } from "history";

interface PostProps {
  post: PostProperties;
}

const Post: React.FC<PostProps> = ({ post }) => {
  //state
  const { loggedUser, isLogged, savePost } = userState((state) => state);
  const {
    darkMode: darkmodeState,
    classicView,
    compactView,
  } = viewState((state) => state);
  const darkMode: boolean = isLogged ? loggedUser.darkMode : darkmodeState;
  const [upvoted, setUpvoted] = useState<boolean>(false);
  const [downvoted, setDownvoted] = useState<boolean>(false);
  const [isSaved, setIsSaved] = useState<boolean>(false);
  const history = useHistory<Location>();
  //useEffect
  useEffect(() => {
    if (isLogged) {
      if (post.upvotedBy.find((id) => id === loggedUser._id)) {
        setUpvoted(true);
      } else {
        setUpvoted(false);
      }
      if (post.downvotedBy.find((id) => id === loggedUser._id)) {
        setDownvoted(true);
      } else {
        setDownvoted(false);
      }
    }
  }, [isLogged, loggedUser._id, post.downvotedBy, post.upvotedBy]);
  useEffect(() => {
    if (isLogged) {
      setIsSaved(
        loggedUser.savedPosts.find((a) => a === post._id) ? true : false
      );
    }
  }, [setIsSaved, loggedUser.savedPosts, post._id, isLogged]);
  //handlers
  const addToSavedHandler = () => {
    if (isLogged) {
      savePost(loggedUser._id, post._id);
    } else {
      history.push("/login/upvote");
    }
  };
  const shareData = {
    title: "Amina",
    text: post.title,
    url: `/post/${post._id}`,
  };
  return (
    <PostComponent
      $darkmode={darkMode}
      $classicview={classicView}
      $compactview={compactView}
    >
      <div className="upvotes">
        <Upvotes
          upvotes={post.upvotes}
          flexDirection="column"
          darkModeBg="#1A1A1B"
          whiteModebg="#F3F3F3"
          postId={post._id}
          upvoted={upvoted}
          downvoted={downvoted}
        />
      </div>
      <JoinButton id={post.subaminId} />
      <Link
        to={`/post/${post._id}`}
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
                  <TimeAgo date={post.createdAt} />
                </span>
              </span>
            </div>
            <div className="post-title">{post.title}</div>
          </div>
          {post.images && post.images.length > 0 && (
            <div className="post-image">
              <img src={post.images[0]} alt={post.title} />
            </div>
          )}
        </div>
      </Link>
      <div className="post-tools">
        <div className="upvotes">
          <Upvotes
            upvotes={post.upvotes}
            flexDirection="row"
            darkModeBg="#1A1A1B"
            whiteModebg="#F3F3F3"
            postId={post._id}
            upvoted={upvoted}
            downvoted={downvoted}
          />
        </div>
        <Link
          to={`/post/${post._id}`}
          onClick={() => window.scrollTo(0, 0)}
          className="comment-link"
        >
          <button className="comment">
            <FaRegCommentAlt className="icon" /> Comments
          </button>
        </Link>
        <button className="share" onClick={() => navigator.share(shareData)}>
          <IoIosShareAlt className="icon" /> Share
        </button>
        <button className="save" onClick={() => addToSavedHandler()}>
          {isSaved ? (
            <BsBookmarkDash className="icon" />
          ) : (
            <BsBookmarkCheck className="icon" />
          )}{" "}
          {isSaved ? "Unsave" : "Save"}
        </button>
      </div>
    </PostComponent>
  );
};

export default Post;
