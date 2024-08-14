import { useSelector } from "react-redux";
import SubscriptionCard from "./SubscriptionCard";

const freePlan = [
  "Basic Features",
  "Community Support",
  "Ads Supported",
  "Limited Actions",
  "No Priority Support",
  "No Customization",
];

const annualPlan = [
  "Premium Features",
  "Priority Support",
  "Ad-Free Experience",
  "Unlimited Actions",
  "Exclusive Offers",
  "Extended Access",
];

const paidPlan = [
  "Full Access",
  "Dedicated Support",
  "No Ads",
  "Personalization",
  "Special Offers",
  "Monthly Subscription",
];

const Subscription = () => {
  const { subscription } = useSelector((store) => store);
  return (
    <div className="p-10">
      <h1 className="text-5xl font-semibold py-5 pb-16 text-center">Pricing</h1>
      <div className="flex flex-col lg:flex-row justify-center items-center gap-9">
        <SubscriptionCard
          data={{
            planName: "Free",
            features: freePlan,
            planType: "FREE",
            price: 0,
            buttonName:
              subscription.userSubscription?.planType === "FREE"
                ? "Current Plan"
                : "Get Started",
          }}
        />
        <SubscriptionCard
          data={{
            planName: "Monthly Paid Plan",
            features: paidPlan,
            planType: "MONTHLY",
            price: 999,
            buttonName:
              subscription.userSubscription?.planType === "MONTHLY"
                ? "Current Plan"
                : "Get Started",
          }}
        />
        <SubscriptionCard
          data={{
            planName: "Anual Paid Plan",
            features: annualPlan,
            planType: "ANNUALLY",
            price: 1999,
            buttonName:
              subscription.userSubscription?.planType === "ANNUALLY"
                ? "Current Plan"
                : "Get Started",
          }}
        />
      </div>
    </div>
  );
};

export default Subscription;
