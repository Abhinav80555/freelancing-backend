import {mongoose} from "mongoose";

const projectSchema = mongoose.Schema(
  {
    projectName: { type: 'string', required: true},
    projectDesc: { type: 'string', required: true},
    userId:{ type: 'string'},
    userEmail:{ type: 'string'},
    userName:{ type: 'string'},
    freelancers: {
      type: 'array'
    }
  },
  { timestamps: true }
);

export const Project = mongoose.model("Project", projectSchema);

