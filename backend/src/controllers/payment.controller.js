import asyncHandler from "express-async-handler";
import { instance } from "../../server.js";
import crypto from 'crypto'
import Payment from "../models/payment.model.js";

export const checkout = asyncHandler(async (req , res) => {
  const { amount } = req.body;

  if (!amount || isNaN(amount)) {
    return res.status(400).json({ success: false, message: "Invalid Amount" });
  }

  try {
      const options = {
        amount : Number(amount) * 100,
        currency : "INR",
      };
    
      const order = await instance.orders.create(options);
      // console.log(order);
      res.status(200).json({success : true , order});
  } catch (error) {
    // console.error("Error creating order:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});


export const paymentVerification = asyncHandler(async (req , res) => {
  const { razorpay_payment_id , razorpay_order_id , razorpay_signature} = req.body;

  const body = razorpay_order_id + "|" +razorpay_payment_id;

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_API_SECRET)  
    .update(body)
    .digest("hex");
    // console.log("Sig received: " , process.env.RAZORPAY_API_SECRET);
    // console.log("Sig generated: " , expectedSignature);

    const isAuthentic = expectedSignature === razorpay_signature;
    
    if(isAuthentic){
      await Payment.create({
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
      });

      res.redirect(
        `${process.env.FRONTEND_URL}paymentsuccess?referance=${razorpay_payment_id}`
      );
    }
    else{
      res.status(400).json({success : false})
    }
})