import mongoose from "mongoose";

const syllabusSchema = new mongoose.Schema(
  {
    class: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Class",
      required: [true, "Class is required"],
    },
    subject: {
      type: String,
      required: [true, "Subject is required"],
      trim: true,
    },
    title: {
      type: String,
      trim: true,
      default: "",
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

// Compound index for filtering
syllabusSchema.index({ class: 1, subject: 1 });

const Syllabus = mongoose.model("Syllabus", syllabusSchema);

export default Syllabus;