import { UpvoteComponent } from "./upvoteStyles";
//store
import viewState from "../../state/viewState";
import userState from "../../state/userState";
import postState from "../../state/postState";
//icons
import { BiUpvote, BiDownvote } from "react-icons/bi";
//location
import { useHistory } from "react-router-dom";
import { Location } from "history";
import commentsState from "../../state/commentState";

interface Props {
  upvotes: number;
  flexDirection: string;
  darkModeBg: string;
  whiteModebg: string;
  postId?: String;
  upvoted: boolean;
  downvoted: boolean;
  commentId?: String;
}

const Upvotes: React.FC<Props> = ({
  upvotes,
  flexDirection,
  darkModeBg,
  whiteModebg,
  postId,
  commentId,
  upvoted,
  downvoted,
}) => {
  const {
    classicView,
    compactView,
    darkMode: darkmodeState,
  } = viewState((state) => state);
  const { likePost } = postState((state) => state);
  const { likeComment } = commentsState((state) => state);
  const { loggedUser, isLogged } = userState((state) => state);
  const darkMode: boolean = isLogged ? loggedUser.darkMode : darkmodeState;
  const history = useHistory<Location>();
  //handlers
  const upvoteHandler = (
    e: React.MouseEvent<SVGElement, MouseEvent>,
    what: string
  ) => {
    e.preventDefault();
    if (isLogged) {
      if (postId) {
        likePost(postId, loggedUser._id, what);
      } else {
        likeComment(commentId!, loggedUser._id, what);
      }
    } else {
      history.push(`/login/upvote`);
    }
  };
  return (
    <UpvoteComponent
      darkmode={darkMode}
      classicview={classicView}
      flexdirection={flexDirection}
      darkmodebg={darkModeBg}
      whitemodebg={whiteModebg}
      upvoted={upvoted}
      downvoted={downvoted}
      compactview={compactView}
    >
      <BiUpvote
        className="upvote-button"
        onClick={(e) => upvoteHandler(e, "upvote")}
      />
      <span>
        {upvotes > 1000 ? (upvotes / 1000).toFixed(1) + "K" : upvotes}
      </span>
      <BiDownvote
        className="downvote-button"
        onClick={(e) => upvoteHandler(e, "downvote")}
      />
    </UpvoteComponent>
  );
};

export default Upvotes;
