"use client";
import { useUser } from "@/context/UserContext";
import { useRequest } from "@/hooks/use-request";
// import { buildClient } from "@/utils/build-client";
import axios from "axios";
import { useRouter } from "next/navigation";
// import { headers } from "next/headers";
import React, { useEffect } from "react";
import StripeCheckout from "react-stripe-checkout";

// const getTheOrder = async (id, headers) => {
//   const client = buildClient({ headers });
//   const { data } = await client.get(`/api/orders/${id}`);
//   return data;
// };

const OrderShow = async ({ params }) => {
  const router = useRouter();
  const [timeLeft, setTimeLeft] = useState(0);
  const [order, setOrder] = useState({});
  // const heads = headers();
  const currentUser = useUser();
  const { doRequest, errors } = useRequest({
    url: "/api/payments",
    method: "post",
    body: {
      orderId: order.id,
    },
    onSuccess: () => router.push("/orders"),
  });

  useEffect(() => {
    const getTheOrder = async () => {
      const { data } = await axios.get(`/api/orders/${params.id}`);
      return data;
    };
    const data = getTheOrder();
    setOrder(data);
  }, []);

  useEffect(() => {
    const findTimeLeft = () => {
      const msLeft = new Date(order.expiresAt) - new Date();
      setTimeLeft(Math.floor(msLeft / 1000));
    };

    findTimeLeft();
    const timerId = setInterval(findTimeLeft, 1000);
    return () => clearInterval(timerId);
  }, [order]);

  if (timeLeft < 0) {
    return <div>Order expired!</div>;
  }

  return (
    <div>
      Time left to pay: {timeLeft} seconds.
      <StripeCheckout
        token={({ id }) => doRequest({ token: id })}
        stripeKey="pk_test_51ODrHxSDN8Xxly9ZiVZkD2tp26NlehvzgO7hGO1P3vZycimnnrp1s2HyQDCRzO4fFhTM6ivRsEwmYo7ISI6nREYp00iOkqVBZa"
        amount={order.ticket.price * 100}
        email={currentUser.email}
      />
      {errors}
    </div>
  );
};

export default OrderShow;
