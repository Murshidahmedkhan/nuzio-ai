import mongoose from "mongoose";

const newsSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    tags: { type: [String], default: [] },
    imageUrl: { type: String, default: "" },
    audioUrl: { type: String, required: true },
    duration: { type: Number, default: 0 },
    source: { type: String, default: "Nuzio Desk" },
    publishedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const News = mongoose.model("News", newsSchema);
export default News;
