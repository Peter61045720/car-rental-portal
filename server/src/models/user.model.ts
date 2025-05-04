import mongoose from 'mongoose';
import { compare, hash } from 'bcrypt';

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  isAdmin: boolean;
  verifyPassword(password: string): Promise<boolean>;
}

const userSchema = new mongoose.Schema<IUser>(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }

  const saltRound = Number(process.env.SALT_ROUNDS);
  this.password = await hash(this.password, saltRound);

  next();
});

userSchema.methods.verifyPassword = function (password: string): Promise<boolean> {
  return compare(password, this.password);
};

export const User = mongoose.model<IUser>('User', userSchema);
