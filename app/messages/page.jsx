import React from "react";
import connectDB from "@/config/database";
import Message from "@/models/message";
import "@/models/Property";
import { convertToSerializeObj } from "@/utils/convertToObj";
import { getUserSession } from "@/utils/getUserSession";
import MessageCard from "@/components/MessageCard";

async function MessagesPage() {
  await connectDB();
  const sessionUser = await getUserSession();

  const { userId } = sessionUser;

  const readMessages = await Message.find({ recipient: userId, read: true })
    .sort({ createdAt: -1 })
    .populate("sender", "username")
    .populate("property", "name")
    .lean();

  const unreadMessages = await Message.find({ recipient: userId, read: false })
    .sort({ createdAt: -1 })
    .populate("sender", "username")
    .populate("property", "name")
    .lean();

  const messages = [...unreadMessages, ...readMessages].map((messageDoc) => {
    const message = convertToSerializeObj(messageDoc);
    message.sender = convertToSerializeObj(message.sender);
    message.property = convertToSerializeObj(message.property);
    return message;
  });

  console.log("Messages______", messages);
  return (
    <section className="bg-blue-50">
      <div className="container m-auto py-24 max-w-6xl">
        <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
          <h1 className="text-3xl font-bold mb-4">Your Messages</h1>
          <div className="space-y-4">
            {messages.length === 0 ? (
              <p>You have no messages</p>
            ) : (
              messages.map((message) => (
                <MessageCard key={message._id} message={message} />
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default MessagesPage;
