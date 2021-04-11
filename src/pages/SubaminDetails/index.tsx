import React, { useEffect } from "react";
//styling
import { DetailsComponent } from "./SubaminDetailsStyles";
//location
import { useLocation } from "react-router-dom";
import { Location } from "history";
//store
import subaminState from "../../state/subaminDetailsState";
const SubaminDetails = () => {
  //state
  const location = useLocation<Location>();
  const subaminId = location.pathname.split("/")[2];
  const fetchSubamin = subaminState((state) => state.fetchSubamin);
  const subamin = subaminState((state) => state.subamin);
  useEffect(() => {
    fetchSubamin(Number(subaminId));
  }, [fetchSubamin, subaminId]);
  console.log(subamin);
  return (
    <DetailsComponent>
      <h1>{subamin.name}</h1>
    </DetailsComponent>
  );
};

export default SubaminDetails;
