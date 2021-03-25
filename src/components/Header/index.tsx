import React from "react";
//styling
import { HeaderComponent, Button, ViewOption } from "./HeaderStyles";
//store
import useStore from "../../store";
//icons
import { AiOutlineLineChart } from "react-icons/ai";
import { MdNewReleases } from "react-icons/md";

const Header = () => {
  const store = useStore();
  return (
    <HeaderComponent darkMode={store.darkMode}>
      <div className="buttons">
        <Button darkMode={store.darkMode} onClick={() => store.fetchTopPosts()}>
          <AiOutlineLineChart className="button-icon" />
          Top
        </Button>
        <Button darkMode={store.darkMode} onClick={() => store.fetchNewPosts()}>
          <MdNewReleases className="button-icon" />
          New
        </Button>
      </div>
      <div className="view">
        <ViewOption
     
              darkMode={store.darkMode}
 
                  height="12px"
   
                mobileHeight="9px"
      
             onClick={() => store.setClassicView(false)}
        
        >
          <div className="lines">
            <div className="line"></div>
            <div className="line"></div>
          </div>
          <span>Card</span>
        </ViewOption>
        <ViewOption
          darkMode={store.darkMode}
          height="7px"
          mobileHeight="6px"
          onClick={() => store.setClassicView(true)}
        >
          <div className="lines">
            <div className="line"></div>
            <div className="line"></div>
            <div className="line"></div>
          </div>
          <span>Classic</span>
        </ViewOption>
        <ViewOption darkMode={store.darkMode} height="5px" mobileHeight="3px" onClick={() => store.setCompactView(true)}>
          <div className="lines">
            <div className="line"></div>
            <div className="line"></div>
            <div className="line"></div>
            <div className="line"></div>
          </div>
          <span>Compact</span>
        </ViewOption>
      </div>
    </HeaderComponent>
  );
};

export default Header;
