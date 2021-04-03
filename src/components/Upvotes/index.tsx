import { UpvoteComponent } from "./upvoteStyles";
//store
import viewState from "../../state/viewState";
//icons
import { BiUpvote, BiDownvote } from "react-icons/bi";

interface Props {
  upvotes: number;
  flexDirection: string;
  darkModeBg: string;
}
const UpvoteStyles: React.FC<Props> = ({
  upvotes,
  flexDirection,
  darkModeBg,
}) => {
  const darkMode = viewState((state) => state.darkMode);
  const classicview = viewState((state) => state.classicView);
  return (
    <UpvoteComponent
      darkmode={darkMode}
      classicview={classicview}
      flexdirection={flexDirection}
      darkmodebg={darkModeBg}
    >
      <BiUpvote className="upvote-button" />
      <span>
        {upvotes > 1000 ? (upvotes / 1000).toFixed(1) + "K" : upvotes}
      </span>
      <BiDownvote className="downvote-button" />
    </UpvoteComponent>
  );
};

export default UpvoteStyles;
