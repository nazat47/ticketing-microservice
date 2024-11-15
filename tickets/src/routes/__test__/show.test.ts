import request from "supertest";
import { app } from "../../app";
import { Ticket } from "../../models/ticket";
import mongoose from "mongoose";

it("returns a 404 if the ticket is not found", async () => {
  const id = new mongoose.Types.ObjectId().toHexString();
  await request(app).get(`/api/tickets/${id}`).send().expect(404);
});

it("returns a ticket if ticket is found", async () => {
  let tickets = await Ticket.find({});
  const title = "concerttytr";
  const price = 20;

  await request(app).post("/api/tickets").set("Cookie", global.signin()).send({
    title,
    price: 20,
  });

  tickets = await Ticket.find({});
  const ticketResponse = await request(app)
    .get(`/api/tickets/${tickets[0].id}`)
    .send();

  expect(ticketResponse.body.title).toEqual(title);
  expect(ticketResponse.body.price).toEqual(price);
});
