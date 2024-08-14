import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { fetchTaskById, updateTaskStatus } from "@/redux/Task/Action";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import CommentCard from "./CommentCard";
import CreateCommentForm from "./CreateCommentForm";
import { fetchComments } from "@/redux/Comment/Action";

const TaskDetails = () => {
  const { taskId } = useParams();

  const dispatch = useDispatch();

  const { task } = useSelector((store) => store);

  const { comment } = useSelector((store) => store);

  const handleUpdateTaskStatus = (status) => {
    dispatch(updateTaskStatus(taskId, status));
    console.log(status);
  };

  useEffect(() => {
    dispatch(fetchTaskById(taskId));
    dispatch(fetchComments(taskId))
  }, [dispatch, taskId]);

  return (
    <div className="px-20 py-8 text-gray-400">
      <div className="flex justify-between border p-10 rounded-lg">
        <ScrollArea className="h-[80vh] w-[60%]">
          <div className="text-left">
            <h1 className="text-lg font-semibold text-gray-400">
              {task.taskDetails?.title}
            </h1>
            <div className="py-5">
              <h2 className="font-semibold text-gray-400">Description</h2>
              <p className="text-gray-400 text-sm mt-3">
                {task.taskDetails?.description}
              </p>
            </div>
            <div className="mt-5">
              <h1 className="pb-3">Activity</h1>
              <Tabs>
                <TabsList>
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="comments">Comments</TabsTrigger>
                  <TabsTrigger value="history">History</TabsTrigger>
                </TabsList>

                <TabsContent value="all">
                  Lorem ipsum dolor sit amet
                </TabsContent>
                <TabsContent value="comments">
                  <CreateCommentForm taskId={taskId} />
                  <div className="mt-4 space-y-6">
                    {comment.comments.map((item) => (
                      <CommentCard item={item} key={item.id} />
                    ))}
                  </div>
                </TabsContent>
                <TabsContent value="history">
                  Natoque penatibus et magnis dis
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </ScrollArea>
        <div className="w-full lg:w-[35%] space-y-2">
          <Select onValueChange={handleUpdateTaskStatus}>
            <SelectTrigger>
              <SelectValue placeholder="Pending" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="PENDING">Pending</SelectItem>
              <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
              <SelectItem value="DONE">Done</SelectItem>
            </SelectContent>
          </Select>
          <div className="border rounded-lg">
            <p className="border-b py-3 px-5">Details</p>
            <div className="p-5">
              <div className="space-y-7">
                <div className="flex gap-10 items-center">
                  <p className="w-[7rem]">Assignee</p>
                  {task.taskDetails?.assignee?.firstName ? (
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8 text-xs">
                        <AvatarFallback>
                          {task.taskDetails?.assignee?.firstName[0]}
                        </AvatarFallback>
                      </Avatar>
                      <p>Tuan Anh</p>
                    </div>
                  ) : (
                    <p>Unassigned</p>
                  )}
                </div>
                <div className="flex gap-10 items-center">
                  <p className="w-[7rem]">Labels</p>
                  <p>None</p>
                </div>
                <div className="flex gap-10 items-center">
                  <p className="w-[7rem]">Status</p>
                  <Badge className="bg-orange-500 text-white">
                    {task.taskDetails?.status}
                  </Badge>
                </div>
                <div className="flex gap-10 items-center">
                  <p className="w-[7rem]">Release</p>
                  <p>07-07-2024</p>
                </div>
                <div className="flex gap-10 items-center">
                  <p className="w-[7rem]">Reporter</p>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8 text-xs">
                      <AvatarFallback>T</AvatarFallback>
                    </Avatar>
                    <p>Tuan Anh</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskDetails;
