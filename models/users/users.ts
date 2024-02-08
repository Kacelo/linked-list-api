import mongoose, { Document, Schema } from "mongoose";
import bcrypt from "bcryptjs";

export interface IUser extends Document {
  username: string;
  email:string;
  password: string;
  comparePassword: (enteredPassword: string) => boolean;
}
const UserSchema = new Schema<IUser>({
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

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.comparePassword = async function (enteredPassword: string) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("users", UserSchema);

export default User;
