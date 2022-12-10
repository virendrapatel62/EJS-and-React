const { default: mongoose } = require("mongoose");
const { User } = require("./user");

const todoSchema = new mongoose.Schema(
  {
    title: {
      type: "String",
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: User,
    },
  },
  {
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    },
  }
);

const Todo = mongoose.model("Todo", todoSchema);

exports.Todo = Todo;
