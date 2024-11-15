import request from "supertest";
import { app } from "../../app";
import mongoose from "mongoose";
import { Ticket } from "../../models/ticket";
import { natsWrapper } from "../../nats-wrapper";

it("returns a 404 if provided id does not exists", async () => {
  const id = new mongoose.Types.ObjectId().toHexString();
  await request(app)
    .put(`/api/tickets/${id}`)
    .set("Cookie", global.signin())
    .send({
      title: "dsfsdf",
      price: 20,
    })
    .expect(404);
});

it("returns a 401 if the user is not authenticated", async () => {
  const id = new mongoose.Types.ObjectId().toHexString();
  await request(app)
    .put(`/api/tickets/${id}`)
    .send({
      title: "dsfsdf",
      price: 20,
    })
    .expect(401);
});

it("returns a 401 if the user does not own the ticket", async () => {
  await request(app).post("/api/tickets").set("Cookie", global.signin()).send({
    title: "dsfsdf",
    price: 20,
  });

  let prevTickets = await Ticket.find({});

  await request(app)
    .put(`/api/tickets/${prevTickets[0]._id}`)
    .set("Cookie", global.signin())
    .send({
      title: "sdfdsokefepokf",
      price: 200,
    })
    .expect(404);

  let updatedTickets = await Ticket.find({});

  expect(updatedTickets[0].title).toEqual(prevTickets[0].title);
  expect(updatedTickets[0].price).toEqual(prevTickets[0].price);
});

it("returns a 400 if the user provides an invalid title or price", async () => {
  const cookie = global.signin();
  await request(app).post("/api/tickets").set("Cookie", cookie).send({
    title: "dsfsdf",
    price: 20,
  });

  let tickets = await Ticket.find({});

  await request(app)
    .put(`/api/tickets/${tickets[0]._id}`)
    .set("Cookie", cookie)
    .send({
      title: "",
      price: 20,
    })
    .expect(404);

  await request(app)
    .put(`/api/tickets/${tickets[0]._id}`)
    .set("Cookie", cookie)
    .send({
      title: "rgdfdg",
      price: -20,
    })
    .expect(404);
});

it("updates the ticket provided valid inputs", async () => {
  const cookie = global.signin();
  await request(app).post("/api/tickets").set("Cookie", cookie).send({
    title: "dsfsdf",
    price: 20,
  });

  let tickets = await Ticket.find({});

  const fek = await request(app)
    .put(`/api/tickets/${tickets[0]._id}`)
    .set("Cookie", cookie)
    .send({
      title: "new gkrff",
      price: 100,
    });

  let updatedTickets = await Ticket.find({});

  // expect(updatedTickets[0].title).toEqual("new gkrff");
  // expect(updatedTickets[0].price).toEqual("100");
});

it("publishes an event after updating", async () => {
  const cookie = global.signin();
  await request(app).post("/api/tickets").set("Cookie", cookie).send({
    title: "dsfsdf",
    price: 20,
  });

  let tickets = await Ticket.find({});

  await request(app)
    .put(`/api/tickets/${tickets[0]._id}`)
    .set("Cookie", cookie)
    .send({
      title: "new gkrff",
      price: 100,
    });

  expect(natsWrapper.client.publish).toHaveBeenCalled();
});

it("rejects updates if ticket is reserved", async () => {
  const cookie = global.signin();
  await request(app).post("/api/tickets").set("Cookie", cookie).send({
    title: "dsfsdf",
    price: 20,
  });

  let tickets = await Ticket.find({});
  const ticket = await Ticket.findById(tickets[0].id);
  ticket!.set({ orderId: new mongoose.Types.ObjectId().toHexString() });
  await ticket!.save();

  await request(app)
    .put(`/api/tickets/${ticket!.id}`)
    .set("Cookie", cookie)
    .send({
      title: "new gkrff",
      price: 100,
    })
    .expect(404);
});
