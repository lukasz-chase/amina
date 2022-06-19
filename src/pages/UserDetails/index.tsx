import React, { useEffect } from "react";
//styling
import { UserDetailsComponent } from "./UserDetailsStyles";
//location
import { useLocation, Link } from "react-router-dom";
import { Location } from "history";
//store
import viewState from "../../state/viewState";
import userState from "../../state/userState";
import authState from "../../state/authState";
//interface
import Header from "../../components/Header";
import Post from "../../components/Post";
//icons
import { GiCakeSlice } from "react-icons/gi";
//scroll bottom
import { BottomScrollListener } from "react-bottom-scroll-listener";
//data
import { accountLinks } from "../../descriptions/links";
//components
import Community from "../../components/Community";
import HelpComponent from "../../components/HelpComponent";
import UserSettings from "../../components/UserSettings";

const UserDetails = () => {
  //state
  const location = useLocation<Location>();
  const userId = location.pathname.split("/")[2];
  const pathname = location.pathname.split("/")[3];

  const {
    userCreatedSubamins,
    loggedUser,
    fetchUserCreatedSubamins,
    limit,
    changeLimit,
    fetchLoggedUser,
    fetchUserSavedPosts,
    userPosts,
    userSavedPosts,
    fetchUserPosts,
  } = userState((state) => state);
  const { darkMode: darkmodeState, classicView } = viewState((state) => state);
  const { isLogged } = authState((state) => state);
  const darkMode: boolean = isLogged ? loggedUser.darkMode : darkmodeState;
  //useEffect
  useEffect(() => {
    if (isLogged) fetchLoggedUser();
  }, [fetchLoggedUser, isLogged, userId]);
  useEffect(() => {
    if (isLogged) {
      fetchUserCreatedSubamins(loggedUser._id);
    }
  }, [isLogged, fetchUserCreatedSubamins, loggedUser._id]);
  useEffect(() => {
    fetchUserPosts(limit, "upvotes", loggedUser._id);
    if (isLogged) {
      fetchUserSavedPosts(loggedUser._id, limit);
    }
  }, [fetchUserSavedPosts, loggedUser._id, isLogged, fetchUserPosts, limit]);
  //handlers
  const handleLimit = () => {
    changeLimit(20);
  };
  return (
    <UserDetailsComponent darkmode={darkMode} classicview={classicView}>
      <BottomScrollListener onBottom={handleLimit} offset={500} />
      <div className="left">
        {!pathname && (
          <Header
            postsFunction={fetchUserPosts}
            id={loggedUser._id}
            limit={limit}
          />
        )}
        {!pathname && (
          <>
            {userPosts !== [] ? (
              <div className="posts">
                {userPosts.map((post, index) => (
                  <Post post={post} key={index} />
                ))}
              </div>
            ) : (
              <div className="empty">Create a post to see them here</div>
            )}
          </>
        )}
        {pathname === "saved" && (
          <>
            {loggedUser.savedPosts.length !== 0 ? (
              <div className="posts">
                {userSavedPosts.map((post, index) => (
                  <Post post={post} key={index} />
                ))}
              </div>
            ) : (
              <div className="empty">
                Start saving posts to see content here
              </div>
            )}
          </>
        )}
        {pathname === "settings" && userId === loggedUser._id && isLogged && (
          <UserSettings
            darkmode={darkMode}
            isLogged={isLogged}
            loggedUser={loggedUser}
          />
        )}
      </div>
      <div className="right">
        <div className="user-info">
          <div className="header"></div>
          <div className="article">
            <span className="user-name">u/{loggedUser.username}</span>
            <span>Cake day</span>
            <p>
              <GiCakeSlice className="cake-icon" />{" "}
              {loggedUser.birthday
                ? loggedUser.birthday
                : "Set your birthday in settings"}
            </p>
            {isLogged &&
              userId === loggedUser._id &&
              accountLinks.map((link) => (
                <Link to={link.path(loggedUser._id)} className={link.className}>
                  {link.label}
                </Link>
              ))}
          </div>
          <img
            src={
              loggedUser.avatar
                ? loggedUser.avatar
                : "https://assets.faceit-cdn.net/organizer_avatar/7a6cd9b4-aec0-4191-8c00-5ae5144aa58c_1574641946899.jpg"
            }
            alt={loggedUser.avatar}
            className="logo"
          />
        </div>
        {isLogged && userCreatedSubamins.length > 0 && (
          <div className="user-subamins">
            <span className="moderator">
              {loggedUser._id === userId ? "You/re moderator" : "Moderator"} of
              these communities
            </span>
            {userCreatedSubamins.map((subamin) => (
              <Community subamin={subamin} />
            ))}
          </div>
        )}
        <HelpComponent />
      </div>
    </UserDetailsComponent>
  );
};

export default UserDetails;
