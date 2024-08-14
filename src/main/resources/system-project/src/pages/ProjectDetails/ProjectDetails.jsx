import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { fetchProjectById } from "@/redux/Project/Action";
import { PlusIcon } from "@radix-ui/react-icons";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ChatBox from "./ChatBox";
import InviteUserForm from "./InviteUserForm";
import TaskList from "./TaskList";

const ProjectDetails = () => {
  const dispatch = useDispatch();

  const { project } = useSelector((store) => store);

  const { id } = useParams();

  const handleProjectInvitation = () => {};

  useEffect(() => {
    dispatch(fetchProjectById(id));
  }, [id, dispatch]);

  console.log("Project Details:", project.projectDetails);

  return (
    <div className="mt-5 lg:px-10">
      <div className="lg:flex gap-5 justify-between pb-4">
        <ScrollArea className="h-screen lg:flex-grow pr-2 lg:pr-4">
          <div className="text-gray-400 pb-10 w-full">
            <h1 className="text-lg font-semibold pb-5 text-left">
              {project.projectDetails?.name}
            </h1>
          </div>
          <div className="space-y-5 pb-10 text-sm text-left">
            <p className="w-full md:max-w-lg lg:max-w-xl">
              {project.projectDetails?.description}
            </p>
            <div className="flex">
              <p className="w-36">Project Lead:</p>
              <p> {project.projectDetails?.user.firstName}</p>
            </div>
            <div className="flex">
              <p className="w-36">Members:</p>
              <div className="flex items-center gap-3">
                {project.projectDetails?.team.map((item) => (
                  <Avatar className="cursor-pointer" key={item}>
                    <AvatarFallback>{item.firstName[0]}</AvatarFallback>
                  </Avatar>
                ))}
              </div>
              <Dialog>
                <DialogTrigger>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={handleProjectInvitation}
                    className="ml-3"
                  >
                    <span>Invite</span>
                    <PlusIcon className="w-3 h-3" />
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>Invite User</DialogHeader>
                  <DialogClose />
                  <InviteUserForm />
                </DialogContent>
              </Dialog>
            </div>
            <div className="flex">
              <p className="w-36">Category:</p>
              <p> {project.projectDetails?.category}</p>
            </div>
            <div className="flex">
              <p className="w-36">Project Lead:</p>
              <Badge>{project.projectDetails?.user.firstName}</Badge>
            </div>
            <div className="flex">
              <p className="w-36">Status:</p>
              <Badge className="bg-purple-500 text-white">Done</Badge>
            </div>
          </div>
          <section>
            <p className="py-5 border-b text-lg -tracking-wider text-left">
              Tasks
            </p>
            <div className="lg:flex md:flex gap-3 justify-between py-5">
              <div className="flex-grow">
                <TaskList status="pending" title="Todo List" />
              </div>
              <div className="flex-grow">
                <TaskList status="in_progress" title="In Progress" />
              </div>
              <div className="flex-grow">
                <TaskList status="done" title="Done" />
              </div>
            </div>
          </section>
        </ScrollArea>
        <div className="lg:w-[50%] rounded-md sticky right-5 top-10">
          <ChatBox />
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;
