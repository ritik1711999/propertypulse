"use server";

import connectDB from "@/config/database";
import Message from "@/models/message";
import { getUserSession } from "@/utils/getUserSession";
import { revalidatePath } from "next/cache";

export async function deleteMessage(messageId) {
  await connectDB();
  const sessionUser = await getUserSession();

  if (!sessionUser || !sessionUser.userId) {
    throw new Error("User Id is required");
  }

  const { userId } = sessionUser;

  const message = await Message.findById(messageId);

  if (message.recipient.toString() !== userId) {
    throw new Error("Unauthorized");
  }

  await message.deleteOne();

  revalidatePath("/", "layout");
}
