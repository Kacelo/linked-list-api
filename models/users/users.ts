import mongoose from "mongoose";
const UserSchema = new mongoose.Schema({
  email: {
    type: String,
  },
  username: {
    type: String,
  },
  password: {
    type: String,
  },
});

const User = mongoose.model("users", UserSchema);

export default User;
