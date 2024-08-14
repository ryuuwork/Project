import { Button } from "@/components/ui/button";
import { acceptInvitation } from "@/redux/Project/Action";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const AcceptInvitation = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const params = new URLSearchParams(window.location.search);
  const token = params.get("token");

  console.log(token);

  const handleAcceptInvite = () => {
    dispatch(acceptInvitation(token, navigate));
  };
  return (
    <div className="h-[85vh] flex flex-col justify-center items-center">
      <h1 className="py-5 font-semibold text-xl">
        You are invited to join the project with team
      </h1>
      <Button onClick={handleAcceptInvite}>Accept Invite</Button>
    </div>
  );
};

export default AcceptInvitation;
