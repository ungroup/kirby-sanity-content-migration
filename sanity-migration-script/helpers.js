import axios from "axios";
import sanityClient from "@sanity/client";
import "dotenv/config";

// SANITY SETTINGS
const client = sanityClient({
  projectId: process.env.PROJECT_ID,
  dataset: process.env.DATASET,
  apiVersion: process.env.API_VERSION,
  token: process.env.TOKEN,
  useCdn: true, // `false` if you want to ensure fresh data
});

const isImage = (url) => {
  return /\.(jpg|jpeg|png|webp|avif|gif)$/.test(url);
};

export { client, axios, isImage };
