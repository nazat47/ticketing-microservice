import request from "supertest";
import { app } from "../../app";

it("returns a 201 on successfull signup", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test.com",
      password: "test123",
    })
    .expect(201);
});

it("returns a 400 on invalid email", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "sdfsdfsd0",
      password: "dsfsd",
    })
    .expect(400);
});

it("returns a 400 on invalid password", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "sdfsd@gmail.com",
      password: "d",
    })
    .expect(400);
});

it("returns a 400 on missing email and password", async () => {
  await request(app).post("/api/users/signup").send({}).expect(400);
});

it("disallows duplicate emails", async () => {
  await request(app).post("/api/users/signup").send({
    email: "test@test.com",
    password: "test123",
  });
  expect(201);
  await request(app).post("/api/users/signup").send({
    email: "test@test.com",
    password: "test123",
  });
  expect(400);
});

it("sets a cookie after successfull signup", async () => {
  const response = await request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test.com",
      password: "test123",
    })
    .expect(201);
  expect(response.get("Set-Cookie")).toBeDefined();
});
