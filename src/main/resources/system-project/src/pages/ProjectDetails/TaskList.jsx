import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { fetchTaskByProjectId } from "@/redux/Task/Action";
import { PlusIcon } from "@radix-ui/react-icons";
import PropTypes from "prop-types";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import CreateTaskForm from "./CreateTaskForm";
import TaskCard from "./TaskCard";

const TaskList = ({ title, status }) => {
  const dispatch = useDispatch();
  const { task } = useSelector((store) => store);
  const { id } = useParams();

  useEffect(() => {
    dispatch(fetchTaskByProjectId(id));
  }, [id, dispatch]);

  return (
    <div>
      <Dialog>
        <Card className="wfull md:w-[300px] lg:w-[280px]">
          <CardHeader>
            <CardTitle>{title}</CardTitle>
          </CardHeader>
          <CardContent className="px-2">
            <div className="space-y-2">
              {task.tasks
                .filter((task) => task.status === status)
                .map((item) => (
                  <TaskCard projectId={id} item={item} key={item.id} />
                ))}
            </div>
          </CardContent>
          <CardFooter>
            <DialogTrigger>
              <Button
                variant="outline"
                className="w-full flex items-center gap-2"
              >
                <PlusIcon />
                Create Task
              </Button>
            </DialogTrigger>
          </CardFooter>
        </Card>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Task</DialogTitle>
          </DialogHeader>
          <CreateTaskForm status={status} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

TaskList.propTypes = {
  title: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
};

export default TaskList;
