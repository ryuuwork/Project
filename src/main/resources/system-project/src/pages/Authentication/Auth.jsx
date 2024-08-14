import { Button } from "@/components/ui/button";
import { useState } from "react";
import Signin from "./Signin";
import Signup from "./Signup";

const Auth = () => {
  const [isSignupActive, setSignupActive] = useState(true);

  const toggleAuthMode = () => {
    setSignupActive((prevState) => !prevState);
  };

  return (
    <div>
      {isSignupActive ? <Signup /> : <Signin />}
      <div>
        <span>Already have an account? </span>
        <Button variant="ghost" onClick={toggleAuthMode}>
          {isSignupActive ? "Sign in" : "Sign up"}
        </Button>
      </div>
    </div>
  );
};

export default Auth;
