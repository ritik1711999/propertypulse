"use server";

import connectDB from "@/config/database";
import User from "@/models/User";
import { getUserSession } from "@/utils/getUserSession";

async function checkBookmarkStatus({ propertyId }) {
  await connectDB();
  const sessionUser = await getUserSession();

  if (!sessionUser || !sessionUser.userId) {
    throw new Error("User not found");
  }

  const { userId } = sessionUser;

  const user = await User.findById(userId);

  let isBookmarked = user.bookmark.includes(propertyId);

  return { isBookmarked };
}

export default checkBookmarkStatus;
