import { requireAuth } from "@naztickets/common";
import express, { Request, Response } from "express";
import { Order } from "../models/order";

const router = express.Router();

router.get(
  "/api/orders",
  requireAuth,
  async (req: Request, res: Response): Promise<any> => {
    const orders = await Order.find({ userId: req.currentUser!.id }).populate(
      "ticket"
    );

    return res.status(200).send(orders);
  }
);

export { router as indexOrderRouter };
