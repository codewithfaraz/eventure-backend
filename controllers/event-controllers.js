const Event = require("../modals/event-schema");
exports.addEvent = async (req, res) => {
  try {
    console.log(req.body);
    const newEvent = await Event.create(req.body);
    if (newEvent) {
      return res.status(200).json({
        data: newEvent,
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
exports.getEvents = async (req, res) => {
  try {
    console.log(req.query.email);
    const events = await Event.find({ email: req.query.email });
    return res.status(200).json({
      data: events,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
exports.deleteEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndDelete(req.query.id);
    if (!event) {
      return res.status(404).json({
        message: "Event not found",
      });
    }
    return res.status(200);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
exports.updateEvent = async (req, res) => {
  try {
    console.log(req.body.params.data);
    const event = await Event.findByIdAndUpdate(
      req.body.params.data._id,
      req.body.params.data,
      { new: true }
    );
    return res.status(200).json({
      event,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
exports.getSingleEvent = async (req, res) => {
  try {
    console.log(req.query.id);
    const event = await Event.findById(req.query.id);
    return res.status(200).json({
      event,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

exports.getFeaturedEvents = async (req, res) => {
  try {
    const events = await Event.find().sort({ createdAt: -1 }).limit(6);

    return res.status(200).json({
      events,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
exports.getUpcomingEvents = async (req, res) => {
  try {
    // Get today's date in "YYYY-MM-DD" format
    const today = new Date().toISOString().split("T")[0]; // e.g. "2025-05-22"

    const events = await Event.find({
      date: { $gte: today },
    })
      .sort({ date: 1 }) // earliest dates first
      .limit(6);
    console.log(events);
    return res.status(200).json({
      events,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
exports.getAllEvents = async (req, res) => {
  try {
    const events = await Event.find();
    console.log(events);
    return res.status(200).json({
      events,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
