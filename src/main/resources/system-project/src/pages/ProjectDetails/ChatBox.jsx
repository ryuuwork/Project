import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  fetchChatByProject,
  fetchChatMessages,
  sendMessage,
} from "@/redux/Chat/Action";
import { PaperPlaneIcon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const ChatBox = () => {
  const [message, setMessage] = useState("");
  const { auth, chat } = useSelector((store) => store);
  const { id } = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchChatByProject(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (chat.chat && chat.chat.id) {
      dispatch(fetchChatMessages(chat.chat.id));
    }
  }, [dispatch, chat.chat?.id, chat.chat]);

  const handleSendMessage = () => {
    dispatch(
      sendMessage({
        senderId: auth.user?.id,
        projectId: id,
        content: message,
      })
    );
    setMessage("");
  };

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  return (
    <div className="sticky">
      <div className="border rounded-lg">
        <h1 className="border-b p-5">Chat Box</h1>
        <ScrollArea className="h-[32rem] w-full p-5 flex flex-col gap-3">
          {chat.messages.map((item) => (
            <div
              className={`flex gap-2 mb-2 justify-${
                item.sender.id !== auth.user.id ? "start" : "end"
              }`}
              key={item.id}
            >
              <Avatar>
                <AvatarFallback>{item.sender?.firstName[0]}</AvatarFallback>
              </Avatar>
              <div className="space-y-2 py-2 px-5 border rounded-ss-2xl rounded-ee-xl">
                <p>{item.sender?.firstName}</p>
                <p className="text-gray-300">{item.content || "No content"}</p>
              </div>
            </div>
          ))}
        </ScrollArea>
        <div className="relative p-0">
          <Input
            placeholder="type message..."
            className="py-7 border-t outline-none 
            focus:outline-none focus:ring-0 rounded-none border-b-0 border-x-0"
            value={message}
            onChange={handleMessageChange}
          />
          <Button
            onClick={handleSendMessage}
            className="absolute right-2 top-3 rounded-full"
            size="icon"
            variant="ghost"
          >
            <PaperPlaneIcon />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatBox;
