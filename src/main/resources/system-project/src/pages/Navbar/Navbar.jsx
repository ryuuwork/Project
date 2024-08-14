import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { logout } from "@/redux/Auth/Action";
import { PersonIcon } from "@radix-ui/react-icons";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CreateProjectForm from "../Project/CreateProjectForm";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { auth } = useSelector((store) => store);

  const handleLogout = () => {
    dispatch(logout());
  };
  return (
    <div className="border-b py-4 px-5 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <p onClick={() => navigate("/")} className="cursor-pointer">
          Project Management
        </p>
        <Dialog>
          <DialogTrigger>
            <Button variant="ghost">New Project</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>Create New Project</DialogHeader>
            <CreateProjectForm />
          </DialogContent>
        </Dialog>
        <Button onClick={() => navigate("/upgrade")} variant="ghost">
          Upgrade
        </Button>

        {/* <Button onClick={() => navigate("/upgrade/success")} variant="ghost">
          Upgrade Success
        </Button> */}
      </div>
      <div className="flex gap-3 items-center">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full border-2 border-gray-500"
            >
              <PersonIcon />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <p>{auth.user?.firstName}</p>
      </div>
    </div>
  );
};

export default Navbar;
