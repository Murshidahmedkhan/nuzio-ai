import Preference from "../models/Preference.js";

export const getPreferences = async (req, res, next) => {
  try {
    let preference = await Preference.findOne({ user: req.user._id });
    if (!preference) {
      preference = await Preference.create({ user: req.user._id });
    }
    res.json(preference);
  } catch (error) {
    next(error);
  }
};

export const updatePreferences = async (req, res, next) => {
  try {
    const allowed = [
      "language",
      "profession",
      "interests",
      "narrator",
      "briefingTime",
      "briefLength",
      "locationEnabled",
      "notificationsEnabled",
      "onboardingComplete",
    ];

    const updates = {};
    for (const key of allowed) {
      if (req.body[key] !== undefined) updates[key] = req.body[key];
    }

    if (updates.interests && !Array.isArray(updates.interests)) {
      return res.status(400).json({ message: "Interests must be an array" });
    }

    const preference = await Preference.findOneAndUpdate(
      { user: req.user._id },
      { $set: updates },
      { returnDocument: "after", upsert: true, setDefaultsOnInsert: true }
    );

    res.json(preference);
  } catch (error) {
    next(error);
  }
};
