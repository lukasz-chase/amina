import React, { useEffect } from "react";
//styling
import { DetailsComponent } from "./SubaminDetailsStyles";
//location
import { useLocation } from "react-router-dom";
import { Location } from "history";
//store
import subaminState from "../../state/subaminDetailsState";
import viewState from "../../state/viewState";
import userState from "../../state/userState";
//components
import Header from "../../components/Header";
import JoinButton from "../../components/JoinButton";
import Post from "../../components/Post";
//interface
import { User, PostProperties, Subamin } from "../../interfaces";

const SubaminDetails: React.FC = () => {
  //state
  const location = useLocation<Location>();
  const subaminId = location.pathname.split("/")[2];
  const fetchSubamin = subaminState((state) => state.fetchSubamin);
  const subamin = subaminState<Subamin>((state) => state.subamin);
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
  //useEffect
  useEffect(() => {
    fetchSubamin(Number(subaminId));
    fetchSubaminNewPosts(Number(subaminId));
  }, [fetchSubamin, fetchSubaminNewPosts, subaminId]);
  useEffect(() => {
    fetchUser(Number(localStorage.getItem("userId")));
  }, [fetchUser]);
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
      <div className="header">
        <div className="subamin-bg"></div>
        <div className="subamin-title">
          <div className="logo">
            <img src={subamin.logo} alt={subamin.name} />
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
            <Header
              topSubaminFunction={fetchSubaminTopPosts}
              newSubaminFunction={fetchSubaminNewPosts}
              id={Number(subaminId)}
              subamin
            />
            {subaminPosts.map((post) => (
              <Post post={post} key={post.id} />
            ))}
          </div>
        </div>
        <div className="right">
          <div className="about">
            <h1>About community</h1>

            <p>{subamin.desc}</p>
            <p>{subamin.members} members</p>
          </div>
        </div>
      </div>
    </DetailsComponent>
  );
};

export default SubaminDetails;
