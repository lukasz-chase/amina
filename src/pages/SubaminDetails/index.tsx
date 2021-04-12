import React, { useEffect } from "react";
//styling
import { DetailsComponent } from "./SubaminDetailsStyles";
//location
import { useLocation } from "react-router-dom";
import { Location } from "history";
//store
import subaminState from "../../state/subaminDetailsState";
import viewState from "../../state/viewState";
//components
import Header from "../../components/Header";
import JoinButton from "../../components/JoinButton";
import Post from "../../components/Post";
const SubaminDetails = () => {
  //state
  const location = useLocation<Location>();
  const subaminId = location.pathname.split("/")[2];
  const fetchSubamin = subaminState((state) => state.fetchSubamin);
  const subamin = subaminState((state) => state.subamin);
  const fetchSubaminTopPosts = subaminState(
    (state) => state.fetchSubaminTopPosts
  );
  const fetchSubaminNewPosts = subaminState(
    (state) => state.fetchSubaminNewPosts
  );
  const subaminPosts = subaminState((state) => state.subaminPosts);
  const darkMode = viewState((state) => state.darkMode);
  useEffect(() => {
    fetchSubamin(Number(subaminId));
    fetchSubaminNewPosts(Number(subaminId));
  }, [fetchSubamin, fetchSubaminNewPosts, subaminId]);
  console.log(subaminPosts);
  return (
    <DetailsComponent
      bgimage={
        subamin.background
          ? subamin.background
          : "https://www.developingngo.org/wp-content/uploads/2018/01/2560x1440-gray-solid-color-background.jpg"
      }
      darkmode={darkMode}
    >
      <div className="header">
        <div className="subamin-bg"></div>
        <div className="subamin-title">
          <div className="logo">
            <img src={subamin.logo} alt={subamin.name} />
          </div>
          <div className="name">
            <h1>{subamin.name}</h1>
            <JoinButton />
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
