"use server";

import connectDB from "@/config/database";
import Property from "@/models/Property";
import { getUserSession } from "@/utils/getUserSession";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const updateProperty = async (propertyId, formData) => {
  await connectDB();
  const sessionUser = await getUserSession();

  if (!sessionUser | !sessionUser.userId) {
    throw new Error("User id is required");
  }

  const { userId } = sessionUser;

  const existingPorperty = await Property.findById(propertyId);

  if (existingPorperty.owner.toString() !== sessionUser.userId) {
    throw new Error("Current User does not own this property");
  }

  const propertyData = {
    owner: userId,
    type: formData.get("type"),
    name: formData.get("name"),
    description: formData.get("description"),
    location: {
      street: formData.get("location.street"),
      city: formData.get("location.city"),
      state: formData.get("location.state"),
      zipcode: formData.get("location.zipcode"),
    },
    beds: formData.get("beds"),
    baths: formData.get("baths"),
    square_feet: formData.get("square_feet"),
    amenities: formData.get("amenities"),
    rates: {
      weekly: formData.get("rates.weekly"),
      nightly: formData.get("rates.nightly"),
      monthly: formData.get("rates.monthly"),
    },
    seller_info: {
      name: formData.get("seller_info.name"),
      email: formData.get("seller_info.email"),
      phone: formData.get("seller_info.phone"),
    },
  };

  const updatedProperty = await Property.findByIdAndUpdate(
    propertyId,
    propertyData
  );
  revalidatePath("/", "layout");

  redirect(`/properties/${updatedProperty._id}`);
};

export default updateProperty;
