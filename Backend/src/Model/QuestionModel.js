import mongoose from "mongoose";

const questionSchema = new mongoose.Schema(
  {
    questionPaperId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "QuestionPaper",
      required: [true, "QuestionPaperId is required"],
    },
    questionText: {
      type: String,
      required: [true, "Question text is required"],
      trim: true,
    },
    marks: {
      type: Number,
      required: [true, "Marks are required"],
      min: [1, "Marks must be greater than 0"],
    },
    correctAnswer: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// Index for fast lookup of questions per paper
questionSchema.index({ questionPaperId: 1 });

const Question = mongoose.model("Question", questionSchema);

export default Question;