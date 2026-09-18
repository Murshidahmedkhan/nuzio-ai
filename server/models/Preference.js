import mongoose from "mongoose";

const preferenceSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    language: { type: String, default: "English" },
    profession: { type: String, default: "" },
    interests: { type: [String], default: [] },
    narrator: { type: String, default: "" },
    briefingTime: { type: String, default: "07:00" },
    briefLength: { type: String, default: "5" },
    locationEnabled: { type: Boolean, default: false },
    notificationsEnabled: { type: Boolean, default: false },
    onboardingComplete: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Preference = mongoose.model("Preference", preferenceSchema);
export default Preference;
