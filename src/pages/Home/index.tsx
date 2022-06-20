import React, { useEffect } from "react";
//styles
import { HomeComponent, Posts, Info } from "./HomeStyles";
//store
import viewState from "../../state/viewState";
import postState from "../../state/postState";
import subaminsState from "../../state/subaminsState";
import userState from "../../state/userState";
import authState from "../../state/authState";
//components
import Header from "../../components/Header";
import Post from "../../components/Post";
import BackToTopButton from "../../components/BackToTopButton";
import CreatePostHeader from "../../components/CreatePostHeader";
import Community from "../../components/Community";
//router
import { Link } from "react-router-dom";
//scroll bottom
import { BottomScrollListener } from "react-bottom-scroll-listener";
import HelpComponent from "../../components/HelpComponent";

const Home: React.FC = () => {
  //state
  const { loggedUser, fetchLoggedUser } = userState((state) => state);
  const { isLogged } = authState((state) => state);
  const { classicView, darkMode: darkModeState } = viewState((state) => state);
  const darkmode: boolean = isLogged ? loggedUser.darkMode : darkModeState;
  const { getTopSubamins, subamins } = subaminsState((state) => state);
  const {
    fetchPosts,
    posts,
    limit,
    changeLimit,
    usersFeed,
    getUserFeed,
    fetchTopPosts,
    topPosts,
  } = postState((state) => state);
  //useEffect
  useEffect(() => {
    if (isLogged) fetchLoggedUser();
    getTopSubamins();
    fetchPosts(limit, "upvotes");
    fetchTopPosts(5);
    if (loggedUser._id !== "0") {
      getUserFeed(loggedUser._id, limit, "upvotes");
    }
  }, [
    isLogged,
    getTopSubamins,
    fetchLoggedUser,
    limit,
    fetchPosts,
    getUserFeed,
    loggedUser._id,
    fetchTopPosts,
  ]);
  //handlers
  const handleLimit = () => {
    changeLimit(20);
  };
  return (
    <HomeComponent darkmode={darkmode} classicview={classicView}>
      <BottomScrollListener onBottom={handleLimit} />
      <BackToTopButton />
      <Posts darkmode={darkmode} classicview={classicView}>
        <div className="post-wrapper">
          {isLogged && <CreatePostHeader />}
          {isLogged && usersFeed.length > 0 ? (
            <>
              <Header feed limit={limit} />
              {usersFeed.map((post, i) => (
                <Post post={post} key={i} />
              ))}
            </>
          ) : (
            <>
              <Header postsFunction={fetchPosts} limit={limit} />
              {posts.map((post, i) => (
                <Post post={post} key={i} />
              ))}
            </>
          )}
        </div>
      </Posts>
      <Info darkmode={darkmode} classicview={classicView}>
        <div className="trending">
          <h2>Most popular subaminas</h2>
          {subamins.map((subamin, index) => (
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
          {topPosts?.map((post) => (
            <Link
              to={`/post/${post._id}`}
              className="post"
              onClick={() => window.scrollTo(0, 0)}
              key={post.title}
            >
              {post.images && post.images.length > 0 && (
                <img src={post.images[0]} alt={post.title} className="image" />
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
