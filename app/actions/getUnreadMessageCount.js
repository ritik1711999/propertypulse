"use server";

import connectDB from "@/config/database";
import Message from "@/models/message";
import { getUserSession } from "@/utils/getUserSession";

async function getUnreadMessageCount() {
  await connectDB();
  const sessionUser = await getUserSession();

  if (!sessionUser || !sessionUser.userId) {
    throw new Error("User not found");
  }

  const { userId } = sessionUser;

  const count = await Message.countDocuments({
    recipient: userId,
    read: false,
  });
  return count;
}

export default getUnreadMessageCount;
