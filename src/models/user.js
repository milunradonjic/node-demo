const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {
  USER_MODEL,
  PROJECT_MODEL,
  ROLE_MODEL,
} = require('../constants/model_names');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error('Email is invalid');
        }
      },
    },
    password: {
      type: String,
      minlength: 7,
      trim: true,
      validate(value) {
        if (value.toLowerCase().includes('password')) {
          throw new Error('Password can not contain word "password"');
        }
      },
    },
    projects: [
      {
        project: {
          type: mongoose.Schema.Types.ObjectId,
          ref: PROJECT_MODEL,
        },
        roles: [
          {
            type: mongoose.Schema.Types.ObjectId,
            ref: ROLE_MODEL,
          },
        ],
      },
    ],
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

userSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();

  delete userObject.password;
  delete userObject.tokens;

  return userObject;
};

userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET);

  user.tokens = user.tokens.concat({ token });
  await user.save();

  return token;
};

userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error('Unable to login');
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error('Unable to login');

  return user;
};

userSchema.statics.findPage = (pageable) => {
  if (!pageable) {
    pageable = {
      page: 1,
      size: 20,
    };
  }
  const { page, size } = pageable;
  return User.find()
    .sort({ createdAt: -1 })
    .skip((page - 1) * size)
    .limit(size);
};

userSchema.pre('save', async function (next) {
  const user = this;

  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8);
  }

  next();
});

const User = mongoose.model(USER_MODEL, userSchema);

module.exports = User;
