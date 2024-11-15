import request from "supertest";
import { app } from "../../app";
import { getSignin } from "../../test/setup";

it("responds with a currentuser", async () => {
  //@ts-ignore
  const cookie = await getSignin();
  const response = await request(app)
    .get("/api/users/currentuser")
    .set("Cookie", cookie!)
    .send()
    .expect(200);
  expect(response.body.currentUser.email).toEqual("test@test.com");
});

it("response with null if not authenticated", async () => {
  const response = await request(app)
    .get("/api/users/currentuser")
    .send()
    .expect(200);
  expect(response.body.currentUser).toEqual(null);
});
