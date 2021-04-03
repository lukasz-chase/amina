import React from "react";
//styles
import { SearchPageComponent } from "./SearchPageStyles";
//router
import { useLocation } from "react-router-dom";
const SearchPage = () => {
  //state
  const location = useLocation();
  const question = location.pathname.split("/")[2];

  return (
    <SearchPageComponent>
      <div className="header">
        <h1>{question}</h1>
        <p>Search results</p>
      </div>
    </SearchPageComponent>
  );
};

export default SearchPage;
