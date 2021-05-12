import React, { useEffect, useState } from "react";
//styling
import { DetailsComponent, Form } from "./SubaminDetailsStyles";
//location
import { useLocation, Link, useHistory } from "react-router-dom";
import { Location } from "history";
//store
import subaminState from "../../state/subaminDetailsState";
import subaminsState from "../../state/subaminsState";
import viewState from "../../state/viewState";
import userState from "../../state/userState";
//components
import CreatePostHeader from "../../components/CreatePostHeader";
import Header from "../../components/Header";
import JoinButton from "../../components/JoinButton";
import Post from "../../components/Post";
//interface
import { User, PostProperties, Subamin } from "../../interfaces";
//scroll bottom
import { BottomScrollListener } from "react-bottom-scroll-listener";
//icons
import { GiCakeSlice } from "react-icons/gi";
import { MdEdit } from "react-icons/md";
//material ui
import TextField from "@material-ui/core/TextField";
import Input from "@material-ui/core/Input";
//axios
import axios from "axios";

const SubaminDetails: React.FC = () => {
  //state
  const location = useLocation<Location>();
  const subaminId = location.pathname.split("/")[2];
  const fetchSubamin = subaminState((state) => state.fetchSubamin);
  const subamin = subaminState<Subamin>((state) => state.subamin);
  const setCommunity = subaminsState((state) => state.setCommunity);
  const limit = subaminState<number>((state) => state.limit);
  const changeLimit = subaminState((state) => state.changeLimit);
  const fetchSubaminTopPosts = subaminState(
    (state) => state.fetchSubaminTopPosts
  );
  const fetchSubaminNewPosts = subaminState(
    (state) => state.fetchSubaminNewPosts
  );
  const subaminPosts = subaminState<PostProperties[]>(
    (state) => state.subaminPosts
  );
  const loggedUser = userState<User>((state) => state.loggedUser);
  const isLogged = userState<boolean>((state) => state.isLogged);
  const darkmodeState = viewState<boolean>((state) => state.darkMode);
  const classicView = viewState<boolean>((state) => state.classicView);
  const darkMode: boolean = isLogged ? loggedUser.darkMode : darkmodeState;
  const fetchUser = userState((state) => state.fetchLoggedUser);
  const [editDesc, setEditDesc] = useState<boolean>(false);
  const [editLogo, setEditLogo] = useState<boolean>(false);
  const [desc, setDesc] = useState<string>("");
  const [logo, setLogo] = useState<string>("");
  const [editImgBg, setEditImgBg] = useState<boolean>(false);
  const [imgBg, setImgBg] = useState<string>("");
  const [deleteSubamin, setDeleteSubamin] = useState<boolean>(false);
  const history = useHistory<Location>();
  //useEffect
  useEffect(() => {
    fetchSubamin(Number(subaminId));
    fetchSubaminNewPosts(limit, Number(subaminId));
  }, [fetchSubamin, fetchSubaminNewPosts, subaminId, limit]);
  useEffect(() => {
    fetchUser(Number(localStorage.getItem("userId")));
  }, [fetchUser]);
  useEffect(() => {
    setDesc(subamin.desc);
    setLogo(subamin.logo);
    if (subamin.background) {
      setImgBg(subamin.background!);
    }
  }, [setDesc, setLogo, subamin.desc, subamin.logo, subamin.background]);
  //handlers
  const handleLimit = () => {
    changeLimit(20);
  };
  const linkHandler = () => {
    setCommunity(subamin);
    window.scrollTo(0, 0);
  };
  const changeDescHandler = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    if (desc) {
      axios
        .put(`http://localhost:3000/subamins/${subamin.id}`, {
          id: subamin.id,
          name: subamin.name,
          desc: desc,
          members: subamin.members,
          logo: subamin.logo,
          background: subamin.background,
          birthday: subamin.birthday,
          authorId: subamin.authorId,
        })
        .then(() => {
          setEditDesc(false);
          fetchSubamin(Number(subaminId));
        });
    }
  };
  const changeLogoHandler = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    if (desc) {
      axios
        .put(`http://localhost:3000/subamins/${subamin.id}`, {
          id: subamin.id,
          name: subamin.name,
          desc: subamin.desc,
          members: subamin.members,
          logo: logo,
          background: subamin.background,
          birthday: subamin.birthday,
          authorId: subamin.authorId,
        })
        .then(() => {
          setEditDesc(false);
          fetchSubamin(Number(subaminId));
        });
    }
  };
  const changeImgBgHandler = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    if (desc) {
      axios
        .put(`http://localhost:3000/subamins/${subamin.id}`, {
          id: subamin.id,
          name: subamin.name,
          desc: subamin.desc,
          members: subamin.members,
          logo: subamin.logo,
          background: imgBg,
          birthday: subamin.birthday,
          authorId: subamin.authorId,
        })
        .then(() => {
          setEditImgBg(false);
          fetchSubamin(Number(subaminId));
        });
    }
  };
  const deleteSubaminHandler = () => {
    axios
      .delete(`http://localhost:3000/subamins/${subamin.id}`)
      .then(() => history.push(`/`));
  };
  return (
    <DetailsComponent
      bgimage={
        subamin.background
          ? subamin.background
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
            {subamin.authorId === loggedUser.id && !editLogo && (
              <span onClick={() => setEditLogo(true)} className="change-icon">
                Change icon
              </span>
            )}
            {editLogo && (
              <Form darkmode={darkMode} ready={logo ? true : false}>
                <Input
                  className="community-logo"
                  value={logo}
                  multiline
                  onChange={(e) => setLogo(e.target.value)}
                  disableUnderline
                />
                <button
                  type="submit"
                  className="submit"
                  onClick={(e) => changeLogoHandler(e)}
                >
                  Submit
                </button>
                <button
                  type="submit"
                  className="cancel"
                  onClick={() => setEditLogo(false)}
                >
                  Cancel
                </button>
              </Form>
            )}
          </div>
          <div className="name">
            <h1>{subamin.name}</h1>
            <JoinButton id={subamin.id} />
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
              topSubaminFunction={fetchSubaminTopPosts}
              newSubaminFunction={fetchSubaminNewPosts}
              id={Number(subaminId)}
              subamin
              limit={limit}
            />
            {subaminPosts.map((post) => (
              <Post post={post} key={post.id} />
            ))}
          </div>
        </div>
        <div className="right">
          <div className="about">
            <h1>About community</h1>
            <p>
              {!editDesc ? (
                <>
                  {subamin.desc}
                  {subamin.authorId === loggedUser.id && (
                    <MdEdit
                      onClick={() => setEditDesc(true)}
                      className="edit-desc"
                    />
                  )}
                </>
              ) : (
                <Form darkmode={darkMode} ready={desc ? true : false}>
                  <TextField
                    className="community-desc"
                    multiline
                    rows={4}
                    value={desc}
                    onChange={(e) => setDesc(e.target.value)}
                  />
                  <button
                    type="submit"
                    className="submit"
                    onClick={(e) => changeDescHandler(e)}
                  >
                    Submit
                  </button>
                  <button
                    type="submit"
                    onClick={() => setEditDesc(false)}
                    className="cancel"
                  >
                    Cancel
                  </button>
                </Form>
              )}
            </p>
            <div className="line"></div>
            <p>{subamin.members} members</p>
            <div className="line"></div>
            {!editImgBg ? (
              <>
                {subamin.authorId === loggedUser.id && (
                  <p onClick={() => setEditImgBg(true)}>
                    Edit Background Image
                  </p>
                )}
              </>
            ) : (
              <Form darkmode={darkMode} ready={desc ? true : false}>
                <TextField
                  className="community-bg"
                  multiline
                  rows={4}
                  value={imgBg}
                  onChange={(e) => setImgBg(e.target.value)}
                />
                <button
                  type="submit"
                  className="submit"
                  onClick={(e) => changeImgBgHandler(e)}
                >
                  Submit
                </button>
                <button
                  type="submit"
                  onClick={() => setEditImgBg(false)}
                  className="cancel"
                >
                  Cancel
                </button>
                <div className="line"></div>
              </Form>
            )}

            <p>
              <GiCakeSlice className="cake-icon" /> {subamin.birthday}
            </p>
            {subamin.authorId === loggedUser.id && (
              <>
                <div className="line"></div>
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

            {subamin.authorId === loggedUser.id && (
              <p
                onClick={() => setDeleteSubamin(true)}
                className="delete-subamin"
              >
                Delete Subamin
              </p>
            )}

            {deleteSubamin && (
              <div className="delete">
                <span>Are you sure?</span>
                <p onClick={() => deleteSubaminHandler()}>Yes</p>
                <p onClick={() => setDeleteSubamin(false)}>No</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </DetailsComponent>
  );
};

export default SubaminDetails;
