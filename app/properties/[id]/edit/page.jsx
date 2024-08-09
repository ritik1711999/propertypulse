import PropertyEditForm from "@/components/PropertyEditForm";
import React from "react";
import connectDB from "@/config/database";
import Property from "@/models/Property";
import { convertToSerializeObj } from "@/utils/convertToObj";

const PropertyEditPage = async ({ params }) => {
  await connectDB();
  const propertyDoc = await Property.findById(params.id).lean();
  const property = convertToSerializeObj(propertyDoc);

  if (!property) {
    return (
      <ht className="text-center text-2xl font-bold mt-10">
        Property not found
      </ht>
    );
  }

  return (
    <section className="bg-blue-50">
      <div className="container m-auto max-w-2xl py-24">
        <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
          <PropertyEditForm property={property} />
        </div>
      </div>
    </section>
  );
};

export default PropertyEditPage;
