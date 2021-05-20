const mongoose = require("mongoose");
const { Schema } = mongoose;

const catSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      min: 1,
      max: 45,
    },
    isVaccinated: {
      type: Boolean,
      default: false,
    },
    features: {
      type: Array,
      set: (data) => data || [],
    },
    owner: {
      name: String,
      age: Number,
      address: String,
    },
  },
  {
    versionKey: false,
    timestamps: true,
    toObject: {
      virtuals: true,
      transform: function (doc, ret) {
        delete ret._id;
        return ret;
      },
    },
    toJSON: {
      virtuals: true,
      transform: function (doc, ret) {
        delete ret._id;
        return ret;
      },
    },
  }
);

catSchema.path("name").validate((value) => {
  const re = /[A-Z]\w+/;
  return re.test(String(value));
});

const Contact = mongoose.model("contact", catSchema);

module.exports = Contact;
