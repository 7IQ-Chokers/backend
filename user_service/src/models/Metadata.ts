import mongoose from "mongoose";

const metadataSchema = new mongoose.Schema(
  {
    key: {
      type: String,
      trim: true,
      required: true,
    },
    value: {
      type: mongoose.SchemaTypes.Mixed,
      trim: true,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Metadata", metadataSchema);
