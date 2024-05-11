import express from "express";
import configs from "./config/config";
import morgan from "morgan";
import mongoose from "mongoose";
import userRouter from "./routes/user/userRouter";

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(morgan("dev"));

// Register routes
app.use("/user", userRouter);

// Start server
(async () => {
  try {
    await mongoose.connect(configs.mongo_connection_string);

    console.log(`✅ Connected to MongoDB...`);
  } catch (error) {
    console.error(`❌ Error connecting to MongoDB`, error);
    return;
  }
  app.listen(configs.port, () => {
    console.log(`✅ 'user_service' started on PORT ${configs.port}`);
  });
})();
