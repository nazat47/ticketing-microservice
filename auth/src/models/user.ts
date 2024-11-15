import mongoose from "mongoose";
import bcrypt from "bcryptjs";

interface UserAttrs {
  email: string;
  password: string;
}

export interface UserDoc extends mongoose.Document {
  email: string;
  password: string;
  compare(candidatePassword: string): Promise<boolean>;
}

export interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;
        delete ret.__v;
      },
    },
  }
);

userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
};

userSchema.pre("save", async function () {
  if (this.isModified("password")) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
});

userSchema.methods.compare = async function (storedPassword: string) {
  const isMatched = await bcrypt.compare(storedPassword, this.password);
  return isMatched;
};

const User = mongoose.model<UserDoc, UserModel>("User", userSchema);

export { User };
