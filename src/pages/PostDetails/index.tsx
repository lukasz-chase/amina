import React, { useEffect, useState } from "react";
//styling
import { DetailsComponent, Header, Wrapper } from "./PostDetailsStyles";
//store
import postState from "../../state/postState";
import viewState from "../../state/viewState";
import userState from "../../state/userState";
//location
import { useLocation, useHistory, Link } from "react-router-dom";
import { Location } from "history";
//icons
import { AiOutlineArrowLeft } from "react-icons/ai";
import { BsBookmark, BsFillBookmarkFill } from "react-icons/bs";
import { GoTrashcan } from "react-icons/go";
//format time
import TimeAgo from "react-timeago";
//components
import Upvotes from "../../components/Upvotes";
import ImageCarousel from "../../components/ImageCarousel";
import Comments from "../../components/Comments";
//notistack
import { useSnackbar } from "notistack";

const PostDetails: React.FC = () => {
  //state
  const { fetchPostDetails, postDetails } = postState((state) => state);
  const { isLogged, loggedUser, savePost } = userState((state) => state);
  const darkmodeState = viewState((state) => state.darkMode);
  const darkMode: boolean = isLogged ? loggedUser.darkMode : darkmodeState;
  const location = useLocation<Location>();
  const postId = location.pathname.split("/")[2];
  const history = useHistory<Location>();
  const fetchUser = userState((state) => state.fetchLoggedUser);
  const [upvoted, setUpvoted] = useState<boolean>(false);
  const [downvoted, setDownvoted] = useState<boolean>(false);
  const [isSaved, setIsSaved] = useState<boolean>(false);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  //useEffect
  useEffect(() => {
    fetchPostDetails(postId);
  }, [postId, fetchPostDetails]);
  useEffect(() => {
    fetchUser();
  }, [fetchUser]);
  useEffect(() => {
    if (isLogged) {
      if (postDetails.upvotedBy.find((id) => id === loggedUser._id)) {
        setUpvoted(true);
      } else {
        setUpvoted(false);
      }
      if (postDetails.downvotedBy.find((id) => id === loggedUser._id)) {
        setDownvoted(true);
      } else {
        setDownvoted(false);
      }
    }
  }, [
    isLogged,
    loggedUser._id,
    postDetails.downvotedBy,
    postDetails.upvotedBy,
  ]);
  useEffect(() => {
    if (isLogged) {
      setIsSaved(
        loggedUser.savedPosts.find((a) => a === postDetails._id) ? true : false
      );
    }
  }, [setIsSaved, loggedUser.savedPosts, postDetails._id, isLogged]);
  //handlers
  const snackbarHandler = (snackbarMessage: string, snackVariant: any) => {
    enqueueSnackbar(snackbarMessage, { variant: snackVariant });
    closeSnackbar(0);
  };

  const deletePostHandler = () => {};
  const addToSavedHandler = () => {
    if (isLogged) {
      savePost(loggedUser._id, postDetails._id);
      snackbarHandler("post saved", "success");
    } else {
      history.push("/login/upvote");
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
            {isSaved ? <BsFillBookmarkFill /> : <BsBookmark />}
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
              postId={postDetails._id}
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
                  - <TimeAgo date={postDetails.createdAt} />
                </span>
              </div>
            </div>
            <div className="post-details">
              <span className="post-title">{postDetails.title}</span>
              <ImageCarousel images={postDetails.images} />
              <span>{postDetails.description}</span>
              {postDetails.authorId === loggedUser._id && (
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
                postId={postDetails._id}
                upvoted={upvoted}
                downvoted={downvoted}
              />
            </div>
          </div>
        </div>
      </DetailsComponent>
      <Comments
        postId={postDetails._id}
        darkMode={darkMode}
        loggedUser={loggedUser}
        isLogged={isLogged}
      />
    </Wrapper>
  );
};

export default PostDetails;
