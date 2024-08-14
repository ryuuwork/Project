import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  getUserSubscription,
  upgradeSubscription,
} from "@/redux/Subscription/Action";
import { CheckCircledIcon } from "@radix-ui/react-icons";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const UpgradeSuccess = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { subscription } = useSelector((store) => store);

  const params = new URLSearchParams(location.search);
  console.log(subscription);

  params.get("payment_id");
  const planType = params.get("planType");

  useEffect(() => {
    dispatch(upgradeSubscription({ planType }));
    dispatch(getUserSubscription());
  }, [dispatch, planType]);

  return (
    <div className="flex justify-center">
      <Card className="mt-20 p-5 space-y-5 flex flex-col items-center">
        <div className="flex items-center gap-4">
          <CheckCircledIcon className="h-9 w-9 text-purple-300" />
          <p className="text-xl"> Plan Upgraded Successfully!</p>
        </div>
        <div className="space-y-3">
          <p className="text-blue-300">
            Start Date: {subscription.userSubscription?.subscriptionStartDate}
          </p>
          <p className="text-purple-400">
            End Date:{subscription.userSubscription?.subscriptionEndDate}
          </p>
          <p className="">
            Plan Type: {subscription.userSubscription?.planType}
          </p>
          <Button onClick={() => navigate("/")}>Go to home</Button>
        </div>
      </Card>
    </div>
  );
};

export default UpgradeSuccess;
