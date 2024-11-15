"use client";
import { useRequest } from "@/hooks/use-request";
import { buildClient } from "@/utils/build-client";
import axios from "axios";
// import { headers } from "next/headers";
import { useRouter } from "next/navigation";
import React from "react";

// const getTicketDetails = async (id, headers) => {
//   const client = buildClient({ headers });
//   const { data } = await client.get(`/api/tickets/${id}`);
//   return data;
// };

const TicketShow = ({ params }) => {
  const router = useRouter();
  // const head = headers();
  const [ticket, setTicket] = useState({});

  const { doRequest, errors } = useRequest({
    url: "/api/orders",
    method: "post",
    body: {
      ticketId: ticket.id,
    },
    onSuccess: (order) => router.push(`/orders/${order.id}`),
  });

  useEffect(() => {
    const getTheTicket = async () => {
      const { data } = await axios.get(`/api/tickets/${params.id}`);
      return data;
    };
    const data = getTheTicket();
    setTicket(data);
  }, []);

  return (
    <div>
      <h1>{ticket.title}</h1>
      <h4>Price: {ticket.price}</h4>
      {errors}
      <button
        onClick={() => doRequest()}
        className="p-3 bg-emerald-500 rounded"
      >
        Purchase
      </button>
    </div>
  );
};

export default TicketShow;
