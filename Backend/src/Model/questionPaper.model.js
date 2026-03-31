import mongoose from "mongoose";

const QUESTION_PAPER_TYPES = ["midterm", "final", "unit-test", "preboard", "other"];

const questionPaperSchema = new mongoose.Schema(
  {
    class: {
      type: String,
      required: [true, "Class is required"],
      trim: true,
    },
    subject: {
      type: String,
      required: [true, "Subject is required"],
      trim: true,
    },
    examType: {
      type: String,
      required: [true, "Exam type is required"],
      enum: {
        values: QUESTION_PAPER_TYPES,
        message: "Invalid exam type",
      },
    },
    year: {
      type: Number,
      required: [true, "Year is required"],
      min: [1900, "Year must be valid"],
      max: [new Date().getFullYear(), "Year cannot be in future"],
    },
    totalMarks: {
      type: Number,
      required: [true, "Total marks are required"],
      min: [1, "Marks must be greater than 0"],
    },
    duration: {
      type: String,
      required: [true, "Duration is required"],
      trim: true,
    },
    pdfUrl: {
      type: String,
      required: [true, "PDF URL is required"],
      trim: true,
    },
    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "UploadedBy is required"],
    },
  },
  {
    timestamps: true,
  }
);

// Indexing for filtering/search
questionPaperSchema.index({ class: 1, subject: 1, year: -1 });

const QuestionPaper = mongoose.model("QuestionPaper", questionPaperSchema);

export default QuestionPaper;