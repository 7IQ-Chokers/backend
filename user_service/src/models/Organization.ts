import mongoose from "mongoose";

const organizationSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true,
  },
});

export default mongoose.model("Organization", organizationSchema);
