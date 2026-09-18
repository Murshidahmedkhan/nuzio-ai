import mongoose from "mongoose";

const playbackSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    news: { type: mongoose.Schema.Types.ObjectId, ref: "News", required: true },
    playedAt: { type: Date, default: Date.now },
    progress: { type: Number, default: 0 },
    completed: { type: Boolean, default: false },
  },
  { timestamps: true }
);

playbackSchema.index({ user: 1, news: 1 });

const Playback = mongoose.model("Playback", playbackSchema);
export default Playback;
