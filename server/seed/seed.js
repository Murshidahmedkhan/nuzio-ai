import dotenv from "dotenv";
import mongoose from "mongoose";
import User from "../models/User.js";
import Preference from "../models/Preference.js";
import News from "../models/News.js";
import { newsSeed } from "./news.js";

dotenv.config();

const seed = async () => {
  await mongoose.connect(process.env.MONGO_URI);

  for (const item of newsSeed) {
    await News.findOneAndUpdate({ title: item.title }, item, {
      upsert: true,
      returnDocument: "after",
      setDefaultsOnInsert: true,
    });
  }

  const demoEmail = "demo@nuzio.ai";
  let demo = await User.findOne({ email: demoEmail }).select("+password");
  if (!demo) {
    demo = await User.create({
      name: "Murshid",
      email: demoEmail,
      password: "Demo@123",
    });
  }

  await Preference.findOneAndUpdate(
    { user: demo._id },
    {
      user: demo._id,
      language: "English",
      profession: "Technology",
      interests: ["AI & Technology", "Startups", "Science"],
      narrator: "Aria",
      briefingTime: "07:00",
      notificationsEnabled: true,
      onboardingComplete: true,
    },
    { upsert: true, returnDocument: "after", setDefaultsOnInsert: true }
  );

  console.log(`Seeded ${newsSeed.length} news items and demo user ${demoEmail}`);
  await mongoose.disconnect();
};

seed().catch((error) => {
  console.error(error);
  process.exit(1);
});
