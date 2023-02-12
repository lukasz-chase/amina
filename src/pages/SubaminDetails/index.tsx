import React, { useEffect, useState } from "react";
//styling
import { DetailsComponent } from "./SubaminDetailsStyles";
//location
import { useLocation, Link, useHistory } from "react-router-dom";
import { Location } from "history";
//store
import subaminState from "../../state/subaminDetailsState";
import subaminsState from "../../state/subaminsState";
import viewState from "../../state/viewState";
import userState from "../../state/userState";
import authState from "../../state/authState";
//components
import CreatePostHeader from "../../components/CreatePostHeader";
import Header from "../../components/Header";
import JoinButton from "../../components/JoinButton";
import Post from "../../components/Post";
//scroll bottom
import { BottomScrollListener } from "react-bottom-scroll-listener";
//icons
import { GiCakeSlice } from "react-icons/gi";
//axios
import { deleteSubamin } from "../../api";
import HelpComponent from "../../components/HelpComponent";
//moment
import moment from "moment";

const SubaminDetails: React.FC = () => {
  //state
  const location = useLocation<Location>();
  const subaminId = location.pathname.split("/")[2];
  const {
    fetchSubamin,
    subamin,
    limit,
    changeLimit,
    fetchSubaminPosts,
    subaminPosts,
  } = subaminState((state) => state);
  const { setCommunity } = subaminsState((state) => state);
  const { loggedUser, fetchLoggedUser } = userState((state) => state);
  const { isLogged } = authState((state) => state);
  const { darkMode: darkmodeState, classicView } = viewState((state) => state);
  const darkMode: boolean = isLogged ? loggedUser.darkMode : darkmodeState;
  const [deleteSubaminQuestion, setDeleteSubaminQuestion] =
    useState<boolean>(false);
  const history = useHistory<Location>();
  //useEffect
  useEffect(() => {
    fetchSubamin(subaminId);
    fetchSubaminPosts(limit, "createdAt", subaminId);
  }, [fetchSubamin, fetchSubaminPosts, subaminId, limit]);
  useEffect(() => {
    if (isLogged) fetchLoggedUser();
  }, [fetchLoggedUser, isLogged]);
  //handlers
  const handleLimit = () => {
    changeLimit(20);
  };
  const linkHandler = () => {
    setCommunity(subamin);
    window.scrollTo(0, 0);
  };
  const isAuthor = () => subamin.authorId === loggedUser._id;
  const deleteSubaminHandler = async () => {
    await deleteSubamin(subamin._id);
    history.push(`/`);
  };
  return (
    <DetailsComponent
      bgimage={
        subamin.backgroundImg
          ? subamin.backgroundImg
          : "https://www.developingngo.org/wp-content/uploads/2018/01/2560x1440-gray-solid-color-background.jpg"
      }
      darkmode={darkMode}
      classicview={classicView}
    >
      <BottomScrollListener onBottom={handleLimit} offset={500} />
      <div className="header">
        <div className="subamin-bg"></div>
        <div className="subamin-title">
          <div className="logo">
            <img src={subamin.logo} alt={subamin.name} />
          </div>
          <div className="name">
            <h1>{subamin.name}</h1>
            <JoinButton id={subamin._id} />
          </div>
        </div>
      </div>
      <div className="article">
        <div className="left">
          <div className="posts">
            <div className="wrap" onClick={() => linkHandler()}>
              {isLogged && <CreatePostHeader />}
            </div>
            <Header
              subaminFunction={fetchSubaminPosts}
              id={subaminId}
              subamin
              limit={limit}
            />
            {subaminPosts.map((post, i) => (
              <Post post={post} key={i} />
            ))}
          </div>
        </div>
        <div className="right">
          <div className="about">
            <h1>About community</h1>
            <div className="line"></div>
            <p>{subamin.members} members</p>
            <div className="line"></div>

            <p>
              <GiCakeSlice className="cake-icon" />{" "}
              {moment(subamin.createdAt).format("MMMM Do YYYY, h:mm:ss a")}
            </p>
            {isAuthor() && (
              <>
                <div className="line"></div>
                <Link
                  to={`/edit/subamin/${subamin._id}`}
                  className="new-post"
                  onClick={() => linkHandler()}
                >
                  Edit Subamin
                </Link>
              </>
            )}
            {loggedUser.followedSubaminas.find(
              (followed) => followed === subamin._id
            ) && (
              <>
                <Link
                  to="/create/post"
                  className="new-post"
                  onClick={() => linkHandler()}
                >
                  Create Post
                </Link>
                <div className="line"></div>
              </>
            )}
            {subamin.authorId === loggedUser._id && (
              <p
                onClick={() => setDeleteSubaminQuestion(true)}
                className="delete-subamin"
              >
                Delete Subamin
              </p>
            )}

            {deleteSubaminQuestion && (
              <div className="delete">
                <span>Are you sure?</span>
                <p onClick={() => deleteSubaminHandler()}>Yes</p>
                <p onClick={() => setDeleteSubaminQuestion(false)}>No</p>
              </div>
            )}
          </div>
          <HelpComponent />
        </div>
      </div>
    </DetailsComponent>
  );
};

export default SubaminDetails;
