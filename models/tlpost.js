const mongoose = require("mongoose");

const tlpostSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    comments: {
      type: Object,
    },
    // user: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "User",
    //     required: true,
    // },
    user: {
        type: String,
        required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("tlpost", tlpostSchema);
