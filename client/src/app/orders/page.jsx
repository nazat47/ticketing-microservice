import { buildClient } from "@/utils/build-client";
import { headers } from "next/headers";
import React from "react";

const getOrders = async (headers) => {
  const client = buildClient({ headers });
  const { data } = await client.get("/api/orders");
  return data;
};

const OrdersPage = async () => {
  const heads = headers();
  const orders = await getOrders(heads);

  return (
    <ul>
      {orders?.map((order) => (
        <li key={order.id}>
          {order.ticket.title} - {order.status}
        </li>
      ))}
    </ul>
  );
};

export default OrdersPage;
