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
import { PostProperties, User } from "../../interfaces";
import JoinButton from "../JoinButton";
//axios
import axios from "axios";
import { Link } from "react-router-dom";
//location
import { useHistory } from "react-router-dom";
import { Location } from "history";
interface PostProps {
  post: PostProperties;
}

const Post: React.FC<PostProps> = ({ post }) => {
  //state
  const loggedUser = userState<User>((state) => state.loggedUser);
  const isLogged = userState<boolean>((state) => state.isLogged);
  const fetchUser = userState((state) => state.fetchLoggedUser);
  const darkmodeState = viewState<boolean>((state) => state.darkMode);
  const darkMode: boolean = isLogged ? loggedUser.darkMode : darkmodeState;
  const classicView: boolean = viewState((state) => state.classicView);
  const compactView: boolean = viewState((state) => state.compactView);
  const [upvoted, setUpvoted] = useState<boolean>(false);
  const [downvoted, setDownvoted] = useState<boolean>(false);
  const [isSaved, setIsSaved] = useState<boolean>(false);
  const history = useHistory<Location>();
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
  useEffect(() => {
    if (isLogged) {
      setIsSaved(
        loggedUser.savedPosts.find((a) => a === post.id) ? true : false
      );
    }
  }, [setIsSaved, loggedUser.savedPosts, post.id, isLogged]);
  //handlers
  const upvoteHandler = (what: string) => {
    if (post.upvotedBy && post.upvotedBy.find((a) => a === loggedUser.id)) {
      axios
        .put(`https://amina-server.herokuapp.com/posts/${post.id}`, {
          id: post.id,
          subaminId: post.subaminId,
          subaminName: post.subaminName,
          subaminLogo: post.subaminLogo,
          date: post.date,
          title: post.title,
          description: post.description,
          author: post.author,
          authorId: post.authorId,
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
        .put(`https://amina-server.herokuapp.com/posts/${post.id}`, {
          id: post.id,
          subaminId: post.subaminId,
          subaminName: post.subaminName,
          subaminLogo: post.subaminLogo,
          date: post.date,
          title: post.title,
          description: post.description,
          author: post.author,
          authorId: post.authorId,
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
        .put(`https://amina-server.herokuapp.com/posts/${post.id}`, {
          id: post.id,
          subaminId: post.subaminId,
          subaminName: post.subaminName,
          subaminLogo: post.subaminLogo,
          date: post.date,
          title: post.title,
          description: post.description,
          author: post.author,
          authorId: post.authorId,
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
  const addToSavedHandler = () => {
    if (isLogged) {
      if (isSaved) {
        axios
          .put(`https://amina-server.herokuapp.com/users/${loggedUser.id}`, {
            username: loggedUser.username,
            email: loggedUser.email,
            password: loggedUser.password,
            followedSubaminas: loggedUser.followedSubaminas,
            savedPosts: loggedUser.savedPosts.filter((a) => a !== post.id),
            logo: loggedUser.logo,
            birthday: loggedUser.birthday,
            id: loggedUser.id,
            darkMode: loggedUser.darkMode,
          })
          .then(() => {
            setIsSaved(false);
            fetchUser(Number(localStorage.getItem("userId")));
          });
      } else {
        axios
          .put(`https://amina-server.herokuapp.com/users/${loggedUser.id}`, {
            username: loggedUser.username,
            email: loggedUser.email,
            password: loggedUser.password,
            followedSubaminas: loggedUser.followedSubaminas,
            savedPosts: [...loggedUser.savedPosts, post.id],
            logo: loggedUser.logo,
            birthday: loggedUser.birthday,
            id: loggedUser.id,
            darkMode: loggedUser.darkMode,
          })
          .then(() => {
            setIsSaved(true);
            fetchUser(Number(localStorage.getItem("userId")));
          });
      }
    } else {
      history.push("/login/upvote");
    }
  };
  const shareData = {
    title: "Amina",
    text: post.title,
    url: `/post/${post.id}`,
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
          upvotePost={upvoteHandler}
          upvoted={upvoted}
          downvoted={downvoted}
        />
      </div>
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
          </div>

          {post.image && (
            <div className="post-image">
              <img src={post.image} alt={post.title} />
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
            upvotePost={upvoteHandler}
            upvoted={upvoted}
            downvoted={downvoted}
          />
        </div>
        <Link
          to={`/post/${post.id}`}
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
