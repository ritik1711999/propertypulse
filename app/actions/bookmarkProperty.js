"use server";

import connectDB from "@/config/database";
import { getUserSession } from "@/utils/getUserSession";
import User from "@/models/User";
import { revalidatePath } from "next/cache";

const bookmarkProperty = async (propertyId) => {
  await connectDB();
  const session = await getUserSession();

  if (!session || !session.userId) {
    throw new Error("User not found");
  }

  const { userId } = session;

  const user = await User.findById(userId);

  let isBookmarked = user.bookmark.includes(propertyId);
  let message;

  if (isBookmarked) {
    user.bookmark.pull(propertyId);
    message = "Bookmark removed";
    isBookmarked = false;
  } else {
    user.bookmark.push(propertyId);
    message = "Bookmark added";
    isBookmarked = true;
  }

  await user.save();
  revalidatePath("/properties/saved", "page");

  return { message, isBookmarked };
};

export default bookmarkProperty;
