import React, { useEffect } from "react";
//styles
import { HomeComponent, Posts, Info } from "./HomeStyles";
//store
import viewState from "../../state/viewState";
import postState from "../../state/postState";
import subaminsState from "../../state/subaminState";
//components
import Header from "../../components/Header";
import Post from "../../components/Post";

const Home: React.FC = () => {
  //state
  const darkmode: boolean = viewState((state) => state.darkMode);
  const fetchSubamins = subaminsState((state) => state.fetchSubamins);
  const fetchTopPosts = postState((state) => state.fetchTopPosts);
  const posts = postState((state) => state.posts);
  const classicview: boolean = viewState((state) => state.classicView);
  const subamins = subaminsState((state) => state.subamins);
  //useEffect
  useEffect(() => {
    fetchSubamins();
    fetchTopPosts();
    // store.fetchSubaminByIds([1, 2, 3]);
  }, [fetchSubamins, fetchTopPosts]);
  return (
    <HomeComponent darkmode={darkmode} classicview={classicview}>
      <Posts darkmode={darkmode} classicview={classicview}>
        <Header />
        {posts.map((post) => (
          <Post post={post} key={post.id} />
        ))}
      </Posts>
      <Info darkmode={darkmode} classicview={classicview}>
        <div className="trending">
          <h2>Most popular subaminas</h2>
          {subamins
            .sort((a, b) => a.members - b.members)
            .slice(0, 5)
            .map((subamin, index) => (
              <div className="subamina" key={index}>
                <span>{index + 1}</span>
                <img src={subamin.logo} alt={subamin.name} className="logo" />
                <span>{subamin.name}</span>
              </div>
            ))}
        </div>
      </Info>
    </HomeComponent>
  );
};

export default Home;
