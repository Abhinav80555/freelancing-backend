import {mongoose} from "mongoose";

const projectSchema = mongoose.Schema(
  {
    projectName: { type: String, required:true},
    projectDesc: { type: String, required:true},
    userId:{ type: String },
  },
  { timestamps: true }
);

export const Project = mongoose.model("Project", projectSchema);

