import React, {useEffect} from "react";
//styles
import { HomeComponent, Posts, Info } from "./HomeStyles";
//store
import useStore  from "../../store";
//components
import Header from "../../components/Header";
import Post from "../../components/Post";


const Home:React.FC = () => {
  const store = useStore();
  useEffect(() => {
    store.fetchSubamins(); 
    store.fetchPosts();
    // store.fetchSubaminByIds([1, 2, 3]);
    /* eslint-disable react-hooks/exhaustive-deps */
  }, []);
  return (
    <HomeComponent darkMode={store.darkMode}>
      <Posts darkMode={store.darkMode}>
        <Header />
        {store.posts.map((post) => (
          <Post post={post}/>
        ))}
      </Posts>
      <Info darkMode={store.darkMode}>
        <div className="trending">
          <h2>Most popular subaminas</h2>
          {store.subamins
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
