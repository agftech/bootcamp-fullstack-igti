var schemaOptions = {
  toObject: {
    virtuals: true,
  },
  toJSON: {
    virtuals: true,
  },
};

export default (mongoose) => {
  const gradeSchema = mongoose.Schema(
    {
      name: {
        type: String,
        required: true,
      },
      subject: {
        type: String,
        required: true,
      },
      type: {
        type: String,
        required: true,
      },
      value: {
        type: Number,
        required: true,
        validate(value) {
          if (value < 0) throw new Error("A nota não pode ter valor negativo!");
        },
      },
      lastModified: {
        type: Date,
        default: Date.now,
      },
    },
    schemaOptions
  );

  const gradeModel = mongoose.model("IGTI", gradeSchema, "grades");

  gradeSchema.virtual("id").get(function () {
    return this._id;
  });

  return gradeModel;
};
