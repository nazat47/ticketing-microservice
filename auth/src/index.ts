import mongoose from "mongoose";
import { app } from "./app";

const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error("Jwt secret key must be defined");
  }
  if (!process.env.MONGO_URI) {
    throw new Error("Mongo uri must be defined");
  }
  try {
    await mongoose.connect(process.env.MONGO_URI!);
    console.log("mongo connected");
  } catch (error) {
    console.log(error);
  }
  app.listen(3001, () => {
    console.log("Listening on port 3001");
  });
};
start();
