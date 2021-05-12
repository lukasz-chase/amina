import { UpvoteComponent } from "./upvoteStyles";
//store
import viewState from "../../state/viewState";
import userState from "../../state/userState";
//icons
import { BiUpvote, BiDownvote } from "react-icons/bi";
//interfaces
import { User } from "../../interfaces";
//location
import { useHistory } from "react-router-dom";
import { Location } from "history";

interface Props {
  upvotes: number;
  flexDirection: string;
  darkModeBg: string;
  whiteModebg: string;
  upvotePost?: (what: string) => void;
  upvoteComment?: (id: number, what: string, text: string) => void;
  upvoted: boolean;
  downvoted: boolean;
  commentId?: number;
  commentText?: string;
}
const Upvotes: React.FC<Props> = ({
  upvotes,
  flexDirection,
  darkModeBg,
  whiteModebg,
  upvotePost,
  upvoteComment,
  upvoted,
  downvoted,
  commentId,
  commentText,
}) => {
  const classicview = viewState<boolean>((state) => state.classicView);
  const compactview = viewState<boolean>((state) => state.compactView);
  const loggedUser = userState<User>((state) => state.loggedUser);
  const isLogged = userState<boolean>((state) => state.isLogged);
  const darkmodeState = viewState<boolean>((state) => state.darkMode);
  const darkMode: boolean = isLogged ? loggedUser.darkMode : darkmodeState;
  const history = useHistory<Location>();
  //handlers
  const upvoteHandler = (
    e: React.MouseEvent<SVGElement, MouseEvent>,
    what: string
  ) => {
    e.preventDefault();
    if (isLogged) {
      if (upvotePost) {
        upvotePost(what);
      } else {
        upvoteComment!(commentId!, what, commentText!);
      }
    } else {
      history.push(`/login/upvote`);
    }
  };
  return (
    <UpvoteComponent
      darkmode={darkMode}
      classicview={classicview}
      flexdirection={flexDirection}
      darkmodebg={darkModeBg}
      whitemodebg={whiteModebg}
      upvoted={upvoted}
      downvoted={downvoted}
      compactview={compactview}
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
