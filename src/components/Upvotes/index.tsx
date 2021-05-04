import { UpvoteComponent } from "./upvoteStyles";
//store
import viewState from "../../state/viewState";
import userState from "../../state/userState";
//icons
import { BiUpvote, BiDownvote } from "react-icons/bi";

interface Props {
  upvotes: number;
  flexDirection: string;
  darkModeBg: string;
  whiteModebg: string;
  upvotePost?: (what: string) => void;
  upvoteComment?: (id: number, what: string) => void;
  upvoted: boolean;
  downvoted: boolean;
  commentId?: number;
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
}) => {
  const classicview = viewState((state) => state.classicView);
  const compactview = viewState((state) => state.compactView);
  const loggedUser = userState((state) => state.loggedUser);
  const isLogged = userState((state) => state.isLogged);
  const darkmodeState = viewState((state) => state.darkMode);
  const darkMode: boolean = isLogged ? loggedUser.darkMode : darkmodeState;
  //handlers
  const upvoteHandler = (
    e: React.MouseEvent<SVGElement, MouseEvent>,
    what: string
  ) => {
    e.preventDefault();
    if (upvotePost && isLogged) {
      upvotePost(what);
    } else {
      upvoteComment!(commentId!, what);
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
