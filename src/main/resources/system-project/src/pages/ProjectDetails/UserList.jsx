import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { assignedUserToTask } from "@/redux/Task/Action";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";

const UserList = ({ taskDetails }) => {
  const { project } = useSelector((store) => store);
  const dispatch = useDispatch();
  const handleAssignTaskToUser = (userId) => {
    dispatch(assignedUserToTask(taskDetails.id, userId));
  };

  return (
    <div>
      <div className="space-y-2">
        <div className="border rounded-md">
          <p className="py-2 px-3">
            {taskDetails.assignee?.firstName || "Unassigne"}
          </p>
        </div>
      </div>
      {project.projectDetails?.team.map((item) => (
        <div
          onClick={() => handleAssignTaskToUser(item.id)}
          key={item.id}
          className="py-2 group hover:bg-slate-800 cursor-pointer flex items-center space-x-4 rounded-md border px-4"
        >
          <Avatar>
            <AvatarFallback>{item.firstName[0]}</AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <p className="text-sm leading-none">{item.firstName}</p>
            <p className="text-sm leading-none">
              @{item.username.toLowerCase()}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

UserList.propTypes = {
  taskDetails: PropTypes.shape({
    id: PropTypes.number.isRequired,
    assignee: PropTypes.shape({
      firstName: PropTypes.string,
    }),
  }).isRequired,
};
export default UserList;
