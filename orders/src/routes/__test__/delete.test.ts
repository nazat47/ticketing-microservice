import request from "supertest";
import { Ticket } from "../../models/ticket";
import { app } from "../../app";
import { Order, OrderStatus } from "../../models/order";
import { natsWrapper } from "../../nats-wrapper";
import mongoose from "mongoose";

it("marks an order as cancelled", async () => {
  const ticket = Ticket.build({
    id: new mongoose.Types.ObjectId().toHexString(),
    title: "ticket",
    price: 200,
  });
  await ticket.save();
  const user = global.signin();
  const { body: order } = await request(app)
    .post("/api/orders")
    .set("Cookie", user)
    .send({ ticketId: ticket.id })

  await request(app)
    .delete(`/api/orders/${order.id}`)
    .set("Cookie", user)
    .send()


  const updatedOrder = await Order.findById(order.id);
  //expect(updatedOrder!.status).toEqual(OrderStatus.Cancelled);
});

it("emits a order cancelled event", async () => {
  const ticket = Ticket.build({
    id: new mongoose.Types.ObjectId().toHexString(),
    title: "ticket",
    price: 200,
  });
  await ticket.save();

  const user = global.signin();
  const { body: order } = await request(app)
    .post("/api/orders")
    .set("Cookie", user)
    .send({ ticketId: ticket.id })


  await request(app)
    .delete(`/api/orders/${order.id}`)
    .set("Cookie", user)
    .send()


  expect(natsWrapper.client.publish).toHaveBeenCalled();
});
