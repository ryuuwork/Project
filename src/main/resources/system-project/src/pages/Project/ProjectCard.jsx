import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import PropTypes from "prop-types";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { deleteProjectById } from "@/redux/Project/Action";
import { DotFilledIcon, DotsVerticalIcon } from "@radix-ui/react-icons";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const ProjectCard = ({ item }) => {
  const handleDelete = () => {
    dispatch(deleteProjectById(item.id));
  };
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <Card className="p-5 w-full lg:max-w-3xl">
      <div className="space-y-5">
        <div className="space-y-2">
          <div className="flex justify-between">
            <div className="flex items-center gap-5">
              <h1
                onClick={() => navigate("/project/" + item.id)}
                className="cursor-pointer font-bold text-lg"
              >
                {item.name}
              </h1>
              <DotFilledIcon />
              <p className="text-sm text-gray-400">{item.category}</p>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Button className="rounded-full" variant="ghost" size="icon">
                  <DotsVerticalIcon />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>Update</DropdownMenuItem>
                <DropdownMenuItem onClick={handleDelete}>
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <p className="text-gray-500 text-sm text-left">{item.description}</p>
        <div className="flex flex-wrap gap-2 items-center">
          {item.tags.map((tag) => (
            <Badge key={tag} variant="outline">
              {tag}
            </Badge>
          ))}
        </div>
      </div>
    </Card>
  );
};
ProjectCard.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
};

export default ProjectCard;
