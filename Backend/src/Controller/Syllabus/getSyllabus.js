import Syllabus from "../../Model/SyllabusModel.js";

export const getSyllabus = async (req, res) => {
  try {
    const { classId, subject } = req.query;

    let filter = {};

    if (classId) filter.class = classId;
    if (subject) filter.subject = subject;

    const syllabus = await Syllabus.find(filter)
      .populate("class", "name")
      .populate("uploadedBy", "name email");

    res.status(200).json({
      count: syllabus.length,
      data: syllabus,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};