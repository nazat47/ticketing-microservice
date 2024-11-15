"use client";
import { useRequest } from "@/hooks/use-request";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const NewTicketPage = () => {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const { doRequest, errors } = useRequest({
    url: "/api/tickets",
    method: "post",
    body: {
      title,
      price,
    },
    onSuccess: (ticket) => router.push("/"),
  });

  const onBlur = () => {
    const value = parseFloat(price);
    if (isNaN(value)) {
      return;
    }
    setPrice(value.toFixed(2));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    doRequest();
  };

  return (
    <div>
      <h1>Create a Ticket</h1>
      <form onSubmit={onSubmit}>
        <div>
          <label>Title</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="p-3 w-full border border-stone-300 rounded"
          />
        </div>
        <div>
          <label>Price</label>
          <input
            value={price}
            onBlur={onBlur}
            onChange={(e) => setPrice(e.target.value)}
            className="p-3 w-full border border-stone-300 rounded"
          />
        </div>
        {errors}
        <button className="p-3 bg-blue-600 rounded">Submit</button>
      </form>
    </div>
  );
};

export default NewTicketPage;
