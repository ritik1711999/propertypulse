"use server";

export default async function getGeocode(address) {
  const { street, city, state, zipcode } = address;
  const customizedStreet = street.replace(/\d+/g, "");
  const res = await fetch(
    `https://geocode.maps.co/search?q=${city} ${state} ${zipcode}&api_key=${process.env.GEOCODE_API_KEY}`
  );
  if (!res.ok) return [];

  const geocodeData = await res.json();
  if (geocodeData.length == 0) return [];
  const { lat, lon } = geocodeData.at(0);
  return [lat, lon];
}
