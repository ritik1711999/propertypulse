import React from "react";
import PropertyCard from "@/components/PropertyCard";
import connectDB from "@/config/database";
import User from "@/models/User";
import { getUserSession } from "@/utils/getUserSession";

async function SavedPropertiesPage() {
  await connectDB();
  const { userId } = await getUserSession();
  const { bookmark } = await User.findById(userId).populate("bookmark");

  return (
    <section className="px-4 py-6">
      <div className="container lg:container m-auto px-4 py-6">
        <h1 className="text-2xl mb-4">Saved Properties</h1>
        {bookmark.length === 0 ? (
          <p>No saved properties</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {bookmark.map((property) => {
              return <PropertyCard key={property._id} property={property} />;
            })}
          </div>
        )}
      </div>
    </section>
  );
}

export default SavedPropertiesPage;
