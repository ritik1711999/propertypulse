"use server";

import connectDB from "@/config/database";
import Message from "@/models/message";
import { getUserSession } from "@/utils/getUserSession";

async function addMessage(prevFormState, formData) {
  await connectDB();
  const sessionUser = await getUserSession();

  if (!sessionUser | !sessionUser.userId) {
    throw new Error("User id is required");
  }

  const { userId } = sessionUser;

  const recipient = formData.get("recipient");
  console.log("recipient______________-", recipient);

  if (userId === recipient) {
    return { error: "You can not send a message to yourself" };
  }

  const newMessage = new Message({
    sender: userId,
    recipient: recipient,
    property: formData.get("property"),
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    body: formData.get("body"),
  });

  await newMessage.save();
  return { submitted: true };
}

export default addMessage;
