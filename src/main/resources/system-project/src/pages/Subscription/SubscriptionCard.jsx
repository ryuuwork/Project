import { Button } from "@/components/ui/button";
import { createPayment } from "@/redux/Subscription/Action";
import { CheckCircledIcon } from "@radix-ui/react-icons";
import PropTypes from "prop-types";
import { useCallback } from "react";
import { useDispatch } from "react-redux";

const SubscriptionCard = ({ data }) => {
  const dispatch = useDispatch();
  const handleUpgrade = useCallback(() => {
    dispatch(
      createPayment({
        planType: data.planType,
      })
    );
  }, [dispatch, data.planType]);

  return (
    <div
      className="rounded-xl bg-black bg-opacity-20 shadow-black 
    shadow-2xl card p-5 space-y-5 w-[18rem] text-left"
    >
      <p className="text-lg font-semibold">{data.planName}</p>

      <p className="flex items-center justify-start">
        <span className="text-xl font-semibold">${data.price}</span>
        <span className="text-gray-500 ml-2">{data.planType}</span>
      </p>
      <p>
        {data.planType === "ANNUALLY" && (
          <span className="text-green-500 ml-2">20% off</span>
        )}
      </p>

      <Button onClick={handleUpgrade} className="w-full mt-2">
        {data.buttonName}
      </Button>

      <div className="mt-auto">
        <div className="space-y-2">
          {data.features.map((item, index) => (
            <div key={index} className="flex items-center gap-2">
              <CheckCircledIcon className="w-5 h-5 text-green-500" />
              <p>{item}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

SubscriptionCard.propTypes = {
  data: PropTypes.shape({
    planName: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    planType: PropTypes.string.isRequired,
    buttonName: PropTypes.string.isRequired,
    features: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
};

export default SubscriptionCard;
