import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { deleteComment } from "@/redux/Comment/Action";
import { TrashIcon } from "@radix-ui/react-icons";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";

const CommentCard = ({ item }) => {
  const dispatch = useDispatch();

  const handleDeleteComment = () => {
    dispatch(deleteComment(item.id));
  };
  return (
    <div className="flex justify-between">
      <div className="flex items-center gap-4">
        <Avatar>
          <AvatarFallback>T</AvatarFallback>
        </Avatar>
        <div className="space-y-1">
          <p>{item.email}</p>
          <p>{item.content}</p>
        </div>
      </div>
      <Button
        onClick={handleDeleteComment}
        className="rounded-full"
        variant="ghost"
        size="icon"
      >
        <TrashIcon />
      </Button>
    </div>
  );
};

CommentCard.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    email: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
  }).isRequired,
};

export default CommentCard;
