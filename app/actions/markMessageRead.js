"use server";

import connectDB from "@/config/database";
import Message from "@/models/message";
import { getUserSession } from "@/utils/getUserSession";
import { revalidatePath } from "next/cache";

async function markMessageRead(messageId) {
  await connectDB();
  const sessionUser = await getUserSession();

  if (!sessionUser || !sessionUser.userId) {
    throw new Error("User not found");
  }

  const { userId } = sessionUser;

  const message = await Message.findById(messageId);
  console.log("message_from_marka s READ_____________", message);

  if (!message) throw new Error("Message not found");

  if (message.recipient.toString() !== userId) {
    throw new Error("Unauthorized");
  }

  message.read = !message.read;
  revalidatePath("/messages", "page");
  await message.save();

  return message.read;
}

export default markMessageRead;
