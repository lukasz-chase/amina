import React, { useEffect } from "react";
//styles
import { HomeComponent, Posts, Info } from "./HomeStyles";
//store
import useStore from "../../store";
//components
import Header from "../../components/Header";
import Post from "../../components/Post";

const Home: React.FC = () => {
  //state
  const darkmode: boolean = useStore((state) => state.darkMode);
  const fetchSubamins = useStore((state) => state.fetchSubamins);
  const fetchTopPosts = useStore((state) => state.fetchTopPosts);
  const classicview: boolean = useStore((state) => state.classicView);
  const posts = useStore((state) => state.posts);
  const subamins = useStore((state) => state.subamins);
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
