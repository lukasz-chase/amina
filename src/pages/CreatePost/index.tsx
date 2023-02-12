import React, { useState, useEffect } from "react";
//styling
import { CreatePostComponent } from "./CreatePostStyles";
//store
import viewState from "../../state/viewState";
import userState from "../../state/userState";
import postState from "../../state/postState";
import subaminsState from "../../state/subaminsState";
import authState from "../../state/authState";
//icons
import { MdArrowDropDown } from "react-icons/md";
//components
import YourSubamins from "../../components/YourSubamins";
import Button from "../../components/Button";
import Input from "../../components/Input";
import HelpComponent from "../../components/HelpComponent";
//interface
import { User } from "../../interfaces";
//location
import { useHistory } from "react-router-dom";
import { Location } from "history";
//data
import { createPostInputs } from "../../descriptions/inputs";

export type PostData = {
  title: string;
  desc: string;
  images: any;
};

const CreatePost: React.FC = () => {
  //state
  const loggedUser = userState<User>((state) => state.loggedUser);
  const isLogged = authState<boolean>((state) => state.isLogged);
  const darkmodeState = viewState<boolean>((state) => state.darkMode);
  const darkmode: boolean = isLogged ? loggedUser.darkMode : darkmodeState;
  const [postData, setPostData] = useState<PostData>({
    title: "",
    desc: "",
    images: [],
  });
  const [open, setOpen] = useState<boolean>(false);
  const fetchUser = userState((state) => state.fetchLoggedUser);
  const { createPost } = postState((state) => state);
  const subamin = subaminsState((s) => s.subamin);
  const history = useHistory<Location>();
  //useEffect
  useEffect(() => {
    if (isLogged) fetchUser();
  }, [fetchUser, isLogged]);
  //handlers
  const clear = () =>
    setPostData({
      title: "",
      desc: "",
      images: [],
    });
  const imagesHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    if (target && target.files) {
      setPostData({
        ...postData,
        images: [...postData.images, ...target.files],
      });
    }
  };
  const addPost = () => {
    if (postData.title !== "") {
      const formData = new FormData();
      formData.append("description", postData.desc);
      formData.append("title", postData.title);
      formData.append("subaminId", JSON.stringify(subamin._id));
      formData.append("subaminName", subamin.name);
      formData.append("subaminLogo", subamin.logo);
      formData.append("author", loggedUser.username);
      formData.append("authorId", JSON.stringify(loggedUser._id));
      for (const image of postData.images) {
        formData.append("images", image);
      }
      createPost(formData, history);
      clear();
    } else {
      alert("Title cant be empty");
    }
  };
  const handleForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    setPostData({ ...postData, [target.name]: target.value });
  };
  return (
    <>
      {isLogged && (
        <CreatePostComponent
          darkmode={darkmode}
          ready={subamin && postData.title ? true : false}
        >
          <div className="left">
            <h1>Create a Post</h1>
            <div className="choose-community">
              <div className="wrapper" onClick={() => setOpen(!open)}>
                {subamin.createdAt !== "loading" && (
                  <span>
                    {" "}
                    <img src={subamin.logo} alt="" />
                    {subamin.name}
                  </span>
                )}
                {subamin.createdAt === "loading" && (
                  <span>Choose a community</span>
                )}
                <MdArrowDropDown className="arrow-icon" />
              </div>
              <YourSubamins open={open} setOpen={setOpen} width={"20vw"} />
            </div>
            <div className="form">
              {createPostInputs.map((input) => (
                <>
                  <h2>{input.label}</h2>
                  <Input
                    name={input.name}
                    value={postData[input.name as keyof typeof postData]}
                    inputType={input.inputType}
                    type={input.inputType}
                    handleChange={(e) => handleForm(e)}
                    required={input.required}
                    rows={input.rows}
                    maxLength={input.maxLength}
                    imagesHandler={(e) => imagesHandler(e)}
                    multipleFiles={input.multipleFiles}
                  />
                </>
              ))}

              <div className="images-display">
                {postData.images.map((image: any) => (
                  <div className="imageWrapper" key={image.id}>
                    <span>{image.name}</span>
                    <span
                      className="image-remove"
                      onClick={() =>
                        setPostData({
                          ...postData,
                          images: postData.images.filter(
                            (deleteImage: { name: String }) =>
                              deleteImage.name !== image.name
                          ),
                        })
                      }
                    >
                      remove
                    </span>
                  </div>
                ))}
              </div>
              <Button type="submit" label="Post" onClick={() => addPost()} />
            </div>
          </div>
          <div className="right">
            <div className="rules">
              <div className="header">Posting to Amina</div>
              <ul>
                <li>Remember the human</li>
                <li>Behave like you would in real life</li>
                <li>Look for the original source of content</li>
                <li>Search for duplicates before posting</li>
                <li>Read the community's rules</li>
              </ul>
            </div>
            <span>Please be mindful of amina's content policy</span>
            <p> and practice good aminquette.</p>
            <HelpComponent />
          </div>
        </CreatePostComponent>
      )}
    </>
  );
};

export default CreatePost;
