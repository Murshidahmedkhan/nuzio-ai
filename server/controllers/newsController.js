import News from "../models/News.js";
import Playback from "../models/Playback.js";
import Preference from "../models/Preference.js";
import { personalizeNews } from "../services/personalizationService.js";

export const getPersonalizedNews = async (req, res, next) => {
  try {
    const preference = await Preference.findOne({ user: req.user._id });
    const articles = await News.find().sort({ publishedAt: -1 });
    const ranked = personalizeNews(articles, preference);
    res.json({
      items: ranked,
      briefingCount: Math.min(ranked.length, 6),
    });
  } catch (error) {
    next(error);
  }
};

export const getNewsById = async (req, res, next) => {
  try {
    const news = await News.findById(req.params.id);
    if (!news) return res.status(404).json({ message: "News not found" });
    res.json(news);
  } catch (error) {
    next(error);
  }
};

export const recordPlay = async (req, res, next) => {
  try {
    const news = await News.findById(req.params.id);
    if (!news) return res.status(404).json({ message: "News not found" });

    const { progress = 0, completed = false } = req.body || {};

    const playback = await Playback.findOneAndUpdate(
      { user: req.user._id, news: news._id },
      {
        playedAt: new Date(),
        progress,
        completed,
      },
      { returnDocument: "after", upsert: true, setDefaultsOnInsert: true }
    );

    res.json(playback);
  } catch (error) {
    next(error);
  }
};
