import React, { useState, useEffect } from "react";
//styling
import { CreateCommunityComponent } from "./CreateCommunityStyles";
//store
import viewState from "../../state/viewState";
import userState from "../../state/userState";
import subaminsState from "../../state/subaminsState";
import subaminDetailsState from "../../state/subaminDetailsState";
import authState from "../../state/authState";
//data
import { createCommunity } from "../../descriptions/inputs";
//interfaces
import { User } from "../../interfaces";
//location
import { useHistory, useLocation } from "react-router-dom";
import { Location } from "history";
//components
import Button from "../../components/Button";
import Input from "../../components/Input";

export type SubaminData = {
  name: string;
  desc: string;
  backgroundImg: any;
  logo: any;
  authorId?: String | string;
};

const CreateCommunity: React.FC = () => {
  //state
  const loggedUser = userState<User>((state) => state.loggedUser);
  const isLogged = authState<boolean>((state) => state.isLogged);
  const darkmodeState = viewState<boolean>((state) => state.darkMode);
  const darkmode: boolean = isLogged ? loggedUser.darkMode : darkmodeState;
  const location = useLocation<Location>();
  const subaminId = location.pathname.split("/")[3];
  const [communityData, setCommunityData] = useState<SubaminData>({
    name: "",
    desc: "",
    backgroundImg: "",
    logo: "",
  });
  const fetchUser = userState((state) => state.fetchLoggedUser);
  const { createSubamin, editSubamin } = subaminsState((s) => s);
  const { subamin } = subaminDetailsState((s) => s);
  const history = useHistory<Location>();
  //useEffect
  useEffect(() => {
    if (isLogged) fetchUser();
  }, [fetchUser, isLogged]);
  useEffect(() => {
    if (subaminId) {
      setCommunityData({
        ...communityData,
        name: subamin.name,
        desc: subamin.desc,
      });
    }
  }, [subamin, subaminId]);
  //handlers
  const emptyForm = () => {
    setCommunityData({
      name: "",
      desc: "",
      backgroundImg: "",
      logo: "",
    });
  };
  const isEmpty = () =>
    communityData.desc !== "" &&
    communityData.name !== "" &&
    communityData.logo !== "";

  const imagesHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    if (target && target.files) {
      setCommunityData({
        ...communityData,
        [target.name]: target.files[0],
      });
    }
  };
  const handleForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    setCommunityData({ ...communityData, [target.name]: target.value });
  };
  const addCommunity = () => {
    const formData = new FormData();
    formData.append("name", communityData.name);
    formData.append("desc", communityData.desc);
    formData.append("authorId", JSON.stringify(loggedUser._id));
    formData.append("backgroundImg", communityData.backgroundImg);
    formData.append("logo", communityData.logo);
    if (subaminId) {
      if (communityData.desc !== "" && communityData.name !== "") {
        editSubamin(subaminId, formData, history);
      }
    } else {
      if (isEmpty()) {
        createSubamin(formData, history);
      }
    }
    emptyForm();
  };
  return (
    <>
      {isLogged && (
        <CreateCommunityComponent darkmode={darkmode} ready={isEmpty()}>
          <h1>Create a community</h1>
          <div className="form">
            {createCommunity.map((input) => (
              <>
                <h2>{input.label}</h2>
                <span>{input.subLabel}</span>
                <Input
                  name={input.name}
                  value={
                    communityData[input.name as keyof typeof communityData]
                  }
                  image={
                    communityData[input.name as keyof typeof communityData] ===
                      "" && subaminId
                      ? subamin[input.name as keyof typeof communityData]
                      : communityData[input.name as keyof typeof communityData]
                  }
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
            <Button
              type="submit"
              onClick={() => addCommunity()}
              label={subaminId ? "Edit Subamin" : "Create Community"}
            />
          </div>
        </CreateCommunityComponent>
      )}
    </>
  );
};

export default CreateCommunity;
