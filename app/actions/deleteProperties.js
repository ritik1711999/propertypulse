"use server";

import cloudinary from "@/config/cloudinary";
import connectDB from "@/config/database";
import Property from "@/models/Property";
import { getUserSession } from "@/utils/getUserSession";
import { revalidatePath } from "next/cache";

export async function deleteProperty(propertyId) {
  await connectDB();
  const sessionUser = await getUserSession();

  if (!sessionUser || !sessionUser.userId) {
    throw new Error("User Id is required");
  }

  const { userId } = sessionUser;

  const property = await Property.findById(propertyId);

  if (!property) throw new Error("Property not found");

  if (property.owner.toString() !== userId) {
    throw new Error("Unauthroized");
  }

  const publicIds = property.images.map((imageUrl) => {
    const parts = imageUrl.split("/");
    return parts.at(-1).split(".").at(0);
  });

  if (publicIds.length > 0) {
    for (let publicId of publicIds) {
      await cloudinary.uploader.destroy("propertyPulse/" + publicId);
    }
  }
  await property.deleteOne();

  revalidatePath("/", "layout");
}
