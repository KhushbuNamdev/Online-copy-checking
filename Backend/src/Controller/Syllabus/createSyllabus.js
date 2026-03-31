import Syllabus from "../../Model/SyllabusModel.js";
import Class from "../../Model/ClassModel.js";

export const createSyllabus = async (req, res) => {
  try {
    const { class: classId, subject, title } = req.body;

    // 1. Validate class
    const selectedClass = await Class.findById(classId);
    if (!selectedClass) {
      return res.status(400).json({ message: "Invalid class" });
    }

    // 2. Validate subject
    if (!selectedClass.subjects.includes(subject)) {
      return res.status(400).json({
        message: "Invalid subject for selected class",
      });
    }

    // 3. Check file
    if (!req.file) {
      return res.status(400).json({ message: "PDF file is required" });
    }

    // 4. Create file URL
    const pdfUrl = `/uploads/${req.file.filename}`;

    // 5. Save to DB
    const syllabus = await Syllabus.create({
      class: classId,
      subject,
      title,
      pdfUrl,
      uploadedBy: req.user._id, // assuming auth middleware
    });

    res.status(201).json({
      message: "Syllabus uploaded successfully",
      data: syllabus,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};