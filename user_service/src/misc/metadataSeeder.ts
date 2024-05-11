import mongoose from "mongoose";
import configs from "../config/config";
import Metadata from "../models/Metadata";

(async () => {
  try {
    await mongoose.connect(configs.mongo_connection_string);

    console.log(`✅ Connected to MongoDB...`);
  } catch (error) {
    console.error(`❌ Error connecting to MongoDB`, error);
    return;
  }

  // Seed Metadata
  const metadata = new Metadata({
    key: "tags",
    value: [
      "poverty",
      "hunger",
      "homelessness",
      "inequality",
      "discrimination",
      "child labor",
      "environmental degradation",
      "pollution",
      "climate change",
      "deforestation",
      "waste management",
      "human rights abuses",
      "access to education",
      "access to healthcare",
      "food security",
      "animal welfare",
      "corruption",
      "labor exploitation",
      "gender inequality",
      "access to clean water",
    ],
  });

  await metadata.save();

  console.log(`✅ MongoDB seeding complete...`);
})();
