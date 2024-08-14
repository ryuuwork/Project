import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { deleteTask } from "@/redux/Task/Action";
import { DotsVerticalIcon, PersonIcon } from "@radix-ui/react-icons";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import UserList from "./UserList";

const TaskCard = ({ item, projectId }) => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const handleDeleteTask = () => {
    dispatch(deleteTask(item.id));
  };
  return (
    <div>
      <Card className="rounded-md py-1 pb-2">
        <CardHeader className="py-0 pb-1">
          <div className="flex justify-between items-center">
            <CardTitle
              className="cursor-pointer"
              onClick={() => navigate(`/project/${projectId}/tasks/${item.id}`)}
            >
              {item.title}
            </CardTitle>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Button className="rounded-full" size="icon" variant="ghost">
                  <DotsVerticalIcon />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>In Progress</DropdownMenuItem>
                <DropdownMenuItem>Done</DropdownMenuItem>
                <DropdownMenuItem>Update</DropdownMenuItem>
                <DropdownMenuItem onClick={handleDeleteTask}>
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardHeader>
        <CardContent className="py-0">
          <div className="flex items-center justify-between">
            <p>FSS - {1}</p>
            <DropdownMenu className="w-[30rem] border border-red-400">
              <DropdownMenuTrigger>
                <Button
                  size="icon"
                  className="bg-gray-900 hover:text-black text-white rounded-full"
                >
                  <Avatar>
                    <AvatarFallback>
                      <PersonIcon />
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <UserList taskDetails={item}/>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
TaskCard.propTypes = {
  title: PropTypes.string.isRequired,
  item: PropTypes.number.isRequired,
  projectId: PropTypes.number.isRequired,
};
export default TaskCard;
