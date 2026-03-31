import Class from "../../Model/ClassModel.js"

export const getClasses = async (req, res) => {
  try {
    const classes = await Class.find();

    res.status(200).json({
      data: classes,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};