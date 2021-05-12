import React, { useEffect, useState } from "react";
//styling
import { UserDetailsComponent } from "./UserDetailsStyles";
//location
import { useLocation, Link } from "react-router-dom";
import { Location } from "history";
//store
import viewState from "../../state/viewState";
import userState from "../../state/userState";
//interface
import { User } from "../../interfaces";
import Header from "../../components/Header";
import Post from "../../components/Post";
//icons
import { IoMdSettings } from "react-icons/io";
import { GiCakeSlice } from "react-icons/gi";
//material ui
import Input from "@material-ui/core/Input";
import TextField from "@material-ui/core/TextField";
//axios
import axios from "axios";
//encrypting password
import sha512 from "crypto-js/sha512";
import Base64 from "crypto-js/enc-base64";
//scroll bottom
import { BottomScrollListener } from "react-bottom-scroll-listener";
import Community from "../../components/Community";
//components

const UserDetails = () => {
  //state
  const location = useLocation<Location>();
  const userId = location.pathname.split("/")[2];
  const pathname = location.pathname.split("/")[3];
  const loggedUser = userState<User>((state) => state.loggedUser);
  const userCreatedSubamins = userState((state) => state.userCreatedSubamins);
  const fetchUserCreatedSubamins = userState(
    (state) => state.fetchUserCreatedSubamins
  );
  const limit = userState<number>((state) => state.limit);
  const changeLimit = userState((state) => state.changeLimit);
  const isLogged = userState<boolean>((state) => state.isLogged);
  const darkmodeState = viewState<boolean>((state) => state.darkMode);
  const classicView = viewState<boolean>((state) => state.classicView);
  const darkMode: boolean = isLogged ? loggedUser.darkMode : darkmodeState;
  const fetchLoggedUser = userState((state) => state.fetchLoggedUser);
  const fetchUser = userState((state) => state.fetchUser);
  const user = userState((s) => s.user);
  const fetchNewUserPosts = userState((s) => s.fetchNewUserPosts);
  const fetchTopUserPosts = userState((s) => s.fetchTopUserPosts);
  const fetchUserSavedPosts = userState((s) => s.fetchUserSavedPosts);
  const userPosts = userState((s) => s.userPosts);
  const userSavedPosts = userState((s) => s.userSavedPosts);
  const [logo, setLogo] = useState<string>("");
  const [birthday, setBirthday] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [passwordCheck, setPasswordCheck] = useState<string>("");
  const [oldPassword, setOldPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [checkNewPassword, setCheckNewPassword] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [infoSuccess, setInfoSuccess] = useState<string>("");
  //useEffect
  useEffect(() => {
    fetchLoggedUser(Number(localStorage.getItem("userId")));
    fetchUser(Number(userId));
  }, [fetchLoggedUser, userId, fetchUser]);
  useEffect(() => {
    if (isLogged) {
      fetchUserCreatedSubamins(loggedUser.id);
    }
  }, [isLogged, fetchUserCreatedSubamins, loggedUser.id]);
  useEffect(() => {
    fetchNewUserPosts(limit, user.id);
    if (isLogged) {
      fetchUserSavedPosts(loggedUser.savedPosts, limit);
    }
  }, [
    fetchUserSavedPosts,
    loggedUser.savedPosts,
    isLogged,
    fetchNewUserPosts,
    user.id,
    limit,
  ]);
  useEffect(() => {
    if (isLogged) {
      setLogo(loggedUser.logo!);
      setBirthday(loggedUser.birthday!);
    }
  }, [setLogo, setBirthday, loggedUser.birthday, loggedUser.logo, isLogged]);
  //handlers
  const simpleInfoHandler = () => {
    axios
      .put(`http://localhost:3000/users/${loggedUser.id}`, {
        username: loggedUser.username,
        email: loggedUser.email,
        password: loggedUser.password,
        followedSubaminas: loggedUser.followedSubaminas,
        savedPosts: loggedUser.savedPosts,
        logo: logo,
        birthday: birthday,
        id: loggedUser.id,
        darkMode: loggedUser.darkMode,
      })
      .then(() => {
        fetchLoggedUser(Number(localStorage.getItem("userId")));
        setLogo(loggedUser.logo!);
        setBirthday(loggedUser.birthday!);
        setInfoSuccess("Success");
      });
  };
  const emailHandler = () => {
    if (
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
        email
      )
    ) {
      if (sha512(passwordCheck).toString(Base64) === loggedUser.password) {
        axios
          .put(`http://localhost:3000/users/${loggedUser.id}`, {
            username: loggedUser.username,
            email: email,
            password: loggedUser.password,
            followedSubaminas: loggedUser.followedSubaminas,
            savedPosts: loggedUser.savedPosts,
            logo: loggedUser.logo,
            birthday: loggedUser.birthday,
            id: loggedUser.id,
            darkMode: loggedUser.darkMode,
          })
          .then(() => {
            setEmail("");
            setPasswordCheck("");
            setEmailError("Success");
          });
      } else {
        setEmailError("Incorrect password");
      }
    } else {
      setEmailError("Incorrect email");
    }
  };
  const passwordHandler = () => {
    if (sha512(oldPassword).toString(Base64) === loggedUser.password) {
      if (newPassword === checkNewPassword) {
        axios
          .put(`http://localhost:3000/users/${loggedUser.id}`, {
            username: loggedUser.username,
            email: loggedUser.email,
            password: sha512(newPassword).toString(Base64),
            followedSubaminas: loggedUser.followedSubaminas,
            savedPosts: loggedUser.savedPosts,
            logo: loggedUser.logo,
            birthday: loggedUser.birthday,
            id: loggedUser.id,
            darkMode: loggedUser.darkMode,
          })
          .then(() => {
            setNewPassword("");
            setCheckNewPassword("");
            setPasswordError("Success");
          });
      } else {
        setPasswordError("password dont match");
      }
    } else {
      setPasswordError("incorrect old password");
    }
  };
  const handleLimit = () => {
    changeLimit(20);
  };
  return (
    <UserDetailsComponent darkmode={darkMode} classicview={classicView}>
      <BottomScrollListener onBottom={handleLimit} offset={500} />
      <div className="left">
        {!pathname && (
          <Header
            topSubaminFunction={fetchTopUserPosts}
            newSubaminFunction={fetchNewUserPosts}
            id={user.id}
            subamin
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
        {pathname === "settings" &&
          Number(userId) === loggedUser.id &&
          isLogged && (
            <div className="settings">
              <span className="info">{infoSuccess}</span>
              <span>Change your logo</span>
              <Input
                className="input"
                placeholder="Image src"
                value={logo}
                multiline
                onChange={(e) => setLogo(e.target.value)}
                disableUnderline
              />
              <span>Change your birthday</span>
              <TextField
                className="input"
                value={birthday}
                type="date"
                onChange={(e) => setBirthday(e.target.value)}
              />
              <div className="submit" onClick={() => simpleInfoHandler()}>
                Submit
              </div>
              <div className="line"></div>
              <span className="info">{emailError}</span>
              <span>Change your email</span>
              <Input
                className="input"
                placeholder="new-email"
                value={email}
                multiline
                onChange={(e) => setEmail(e.target.value)}
                disableUnderline
              />
              <Input
                className="input"
                placeholder="password"
                type="password"
                value={passwordCheck}
                multiline
                onChange={(e) => setPasswordCheck(e.target.value)}
                disableUnderline
              />
              <div className="submit" onClick={() => emailHandler()}>
                Submit
              </div>
              <div className="line"></div>
              <span className="info">{passwordError}</span>
              <span>Change your password</span>
              <Input
                className="input"
                placeholder="old password"
                value={oldPassword}
                multiline
                onChange={(e) => setOldPassword(e.target.value)}
                disableUnderline
              />
              <Input
                className="input"
                placeholder="new-password"
                value={newPassword}
                multiline
                onChange={(e) => setNewPassword(e.target.value)}
                disableUnderline
              />
              <Input
                className="input"
                placeholder="confirm new password"
                value={checkNewPassword}
                multiline
                onChange={(e) => setCheckNewPassword(e.target.value)}
                disableUnderline
              />
              <div className="submit" onClick={() => passwordHandler()}>
                Submit
              </div>
            </div>
          )}
      </div>
      <div className="right">
        <div className="user-info">
          <div className="header"></div>
          <div className="article">
            <span className="user-name">u/{user.username}</span>
            <span>Cake day</span>
            <p>
              <GiCakeSlice className="cake-icon" />{" "}
              {user.birthday ? user.birthday : "Set your birthday in settings"}
            </p>
            {isLogged && Number(userId) === loggedUser.id && (
              <Link to={`/user/${loggedUser.id}/saved`} className="saved-posts">
                Saved posts
              </Link>
            )}
            {isLogged && Number(userId) === loggedUser.id && (
              <Link to={`/user/${loggedUser.id}`} className="saved-posts">
                Your posts
              </Link>
            )}
            {isLogged && Number(userId) === loggedUser.id && (
              <Link to="/create/post" className="new-post">
                New Post
              </Link>
            )}
            {isLogged && Number(userId) === loggedUser.id && (
              <Link to={`/user/${loggedUser.id}/settings`}>
                <IoMdSettings className="user-settings" />
              </Link>
            )}
          </div>
          <img
            src={
              user.logo
                ? user.logo
                : "https://assets.faceit-cdn.net/organizer_avatar/7a6cd9b4-aec0-4191-8c00-5ae5144aa58c_1574641946899.jpg"
            }
            alt={user.logo}
            className="logo"
          />
        </div>
        {isLogged &&
          loggedUser.id === Number(userId) &&
          userCreatedSubamins.length > 0 && (
            <div className="user-subamins">
              <span className="moderator">
                You/re moderator of these communities
              </span>
              {userCreatedSubamins.map((subamin) => (
                <Community subamin={subamin} />
              ))}
            </div>
          )}
      </div>
    </UserDetailsComponent>
  );
};

export default UserDetails;
