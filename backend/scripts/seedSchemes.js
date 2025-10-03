import mongoose from "mongoose";
import schemeModel from "../models/schemeModel.js";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config();

// Read JSON file
let schemes = JSON.parse(fs.readFileSync("./data/schemes.json", "utf-8"));

// Normalize scheme names to remove duplicates
const normalizeName = (name) =>
  name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]/g, ""); // remove non-alphanumeric chars

const uniqueSchemesMap = new Map();

schemes.forEach((scheme) => {
  const normalized = normalizeName(scheme.scheme_name);
  if (!uniqueSchemesMap.has(normalized)) {
    uniqueSchemesMap.set(normalized, scheme);
  }
});

const uniqueSchemes = Array.from(uniqueSchemesMap.values());

const seedSchemes = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);

    for (const scheme of uniqueSchemes) {
      await schemeModel.updateOne(
        { scheme_name: scheme.scheme_name },
        { $set: scheme },
        { upsert: true }
      );
    }

    console.log(`🎉 Inserted/Updated ${uniqueSchemes.length} unique schemes`);
    await mongoose.connection.close();
  } catch (error) {
    console.error("❌ Error inserting/updating schemes:", error);
  }
};

seedSchemes();
