import HelpRequest from "../models/helpRequestModel.js";

// CREATE HELP REQUEST
export const createHelp = async (req, res) => {
  try {
    const { title, description, category, location, priority } = req.body;

    const help = await HelpRequest.create({
      user: req.user._id,
      title,
      description,
      category,
      location,
      priority,
    });

    res.status(201).json({
      success: true,
      message: "Help request created",
      data: help,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET ALL HELP REQUESTS (public feed)
export const getAllHelp = async (req, res) => {
  try {
    const helpRequests = await HelpRequest.find()
      .populate("user", "name email location")
      .sort({ createdAt: -1 });

    res.status(200).json(helpRequests);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET ONLY LOGGED-IN USER'S HELP REQUESTS
export const getMyHelp = async (req, res) => {
  try {
    const helpRequests = await HelpRequest.find({ user: req.user._id }).sort({
      createdAt: -1,
    });

    res.status(200).json(helpRequests);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// UPDATE HELP REQUEST
export const updateHelp = async (req, res) => {
  try {
    const help = await HelpRequest.findById(req.params.id);

    if (!help) {
      return res.status(404).json({ message: "Help request not found" });
    }

    // Only owner can update
    if (help.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not allowed" });
    }

    const updated = await HelpRequest.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json({
      success: true,
      data: updated,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// DELETE HELP REQUEST
export const deleteHelp = async (req, res) => {
  try {
    const help = await HelpRequest.findById(req.params.id);

    if (!help) {
      return res.status(404).json({ message: "Help request not found" });
    }

    if (help.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not allowed" });
    }

    await help.deleteOne();

    res.status(200).json({
      success: true,
      message: "Help request deleted",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
