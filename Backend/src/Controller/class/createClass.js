import Class  from "../../Model/ClassModel.js"

export const createClass = async (req, res) => {
  try {
    const { name, subjects } = req.body;

    const exists = await Class.findOne({ name });
    if (exists) {
      return res.status(400).json({ message: "Class already exists" });
    }

    const newClass = await Class.create({
      name,
      subjects,
    });

    res.status(201).json({
      message: "Class created successfully",
      data: newClass,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};