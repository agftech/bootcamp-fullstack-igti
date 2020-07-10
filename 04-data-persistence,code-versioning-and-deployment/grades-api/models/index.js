import mongoose from "mongoose";

import gradeModel from "./gradeModel.js";

const db = {};
db.grades = gradeModel(mongoose);
db.mongoose = mongoose;
db.url = process.env.MONGODB;

export { db };
