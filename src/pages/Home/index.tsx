import React, { useEffect } from "react";
//styles
import { HomeComponent, Posts, Info } from "./HomeStyles";
//store
import viewState from "../../state/viewState";
import postState from "../../state/postState";
import subaminsState from "../../state/subaminsState";
import userState from "../../state/userState";
//components
import Header from "../../components/Header";
import Post from "../../components/Post";
import BackToTopButton from "../../components/BackToTopButton";
import CreatePostHeader from "../../components/CreatePostHeader";
import Community from "../../components/Community";
//router
import { Link } from "react-router-dom";
//interface
import { User, Subamin, PostProperties } from "../../interfaces";
//scroll bottom
import { BottomScrollListener } from "react-bottom-scroll-listener";
import HelpComponent from "../../components/HelpComponent";

const Home: React.FC = () => {
  //state
  const loggedUser = userState<User>((state) => state.loggedUser);
  const isLogged = userState<boolean>((state) => state.isLogged);
  const darkmodeState = viewState<boolean>((state) => state.darkMode);
  const darkmode: boolean = isLogged ? loggedUser.darkMode : darkmodeState;
  const fetchSubamins = subaminsState((state) => state.fetchSubamins);
  const fetchTopPosts = postState((state) => state.fetchTopPosts);
  const fetchNewPosts = postState((state) => state.fetchNewPosts);
  const posts = postState((state) => state.posts);
  const classicview = viewState<boolean>((state) => state.classicView);
  const subamins = subaminsState<Subamin[]>((state) => state.subamins);
  const usersFeed = subaminsState<PostProperties[]>((state) => state.usersFeed);
  const fetchNewSubaminByIds = subaminsState(
    (state) => state.fetchNewSubaminByIds
  );
  const fetchUser = userState((state) => state.fetchLoggedUser);
  const limit = postState((s) => s.limit);
  const changeLimit = postState((s) => s.changeLimit);
  //useEffect
  useEffect(() => {
    fetchUser(Number(localStorage.getItem("userId")));
    fetchSubamins();
    fetchTopPosts(limit);
  }, [fetchSubamins, fetchTopPosts, fetchUser, limit]);
  useEffect(() => {
    if (isLogged) {
      fetchNewSubaminByIds(loggedUser.followedSubaminas, limit);
    }
  }, [loggedUser.followedSubaminas, fetchNewSubaminByIds, isLogged, limit]);
  //handlers
  const handleLimit = () => {
    changeLimit(20);
  };

  return (
    <HomeComponent darkmode={darkmode} classicview={classicview}>
      <BottomScrollListener onBottom={handleLimit} />
      <BackToTopButton />
      <Posts darkmode={darkmode} classicview={classicview}>
        <div className="post-wrapper">
          {isLogged && <CreatePostHeader />}
          {isLogged && usersFeed ? (
            <>
              <Header feed limit={limit} />
              {usersFeed.map((post) => (
                <Post post={post} key={post.id} />
              ))}
            </>
          ) : (
            <>
              <Header
                topFunction={fetchTopPosts}
                newFunction={fetchNewPosts}
                limit={limit}
              />
              {posts.map((post) => (
                <Post post={post} key={post.id} />
              ))}
            </>
          )}
        </div>
      </Posts>
      <Info darkmode={darkmode} classicview={classicview}>
        <div className="trending">
          <h2>Most popular subaminas</h2>
          {subamins
            .sort((a, b) => b.members - a.members)
            .slice(0, 5)
            .map((subamin, index) => (
              <Community subamin={subamin} key={index} />
            ))}
        </div>
        {isLogged && (
          <div className="create">
            <div className="bg"></div>
            <h1>Home</h1>
            <span>
              Your personal Amina frontpage. Come here to check in with your
              favorite communities.
            </span>
            <Link to="/create/post" className="link">
              <div className="post">Create Post</div>
            </Link>
            <Link to="/create/subamin" className="link">
              <div className="subamin">Create Subreddit</div>
            </Link>
          </div>
        )}
        <div className="popular">
          <h2>Popular posts</h2>
          {posts
            .sort((a, b) => b.comments!.length - a.comments!.length)
            .slice(0, 5)
            .sort((a, b) => b.upvotes - a.upvotes)
            .map((post) => (
              <Link
                to={`/post/${post.id}`}
                className="post"
                onClick={() => window.scrollTo(0, 0)}
              >
                {post.image && (
                  <img src={post.image} alt={post.title} className="image" />
                )}
                <div className="info">
                  <span className="title">{post.title}</span>
                  <span className="upvotes">{post.upvotes} upvotes</span>
                </div>
              </Link>
            ))}
        </div>
        <HelpComponent />
      </Info>
    </HomeComponent>
  );
};

export default Home;
