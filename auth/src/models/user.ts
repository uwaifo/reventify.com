import mongoose, { Schema } from "mongoose";

//Local
import { Password } from "../services/password";
//An interface that describes the p[operties that are required of the model]
interface UserAttributes {
  email: string;
  password: string;
}

//An interface that describes the functions that a model has
interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttributes): UserDoc;
}

//An interface that describes the properties that a User document has
interface UserDoc extends mongoose.Document {
  email: string;
  password: string;
}
const userSchema = new mongoose.Schema(
  {
    social_credential: {
      type: Boolean,
      default: false,
    },
    social_credential_provider: {
      type: String,
      required: false,
      enum: ["google", "linkedin"],
    },
    first_name: {
      type: String,
      required: true,
      default: "",
    },
    last_name: {
      type: String,
      required: true,
      default: "",
    },
    phone_number: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    email_verified_status: {
      default: false,
      type: Boolean,
    },
    country_of_residence: {
      type: String,
      required: false,
    },
    city_of_residence: {
      type: String,
      required: false,
    },
    user_linkedin: {
      type: String,
      required: false,
    },
    user_portfolio_url: {
      type: String,
      required: false,
    },
    password: {
      type: String,
      required: true,
    },
    user_industry_id: {
      type: Schema.Types.ObjectId!,
      ref: "JobIndustry",
      required: false,
    },
    user_experience_years: {
      type: Number,
      min: 0,
      max: 50,
      default: 1,
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
userSchema.pre("save", async function(done) {
  if (this.isModified("password")) {
    const hashed = await Password.toHash(this.get("password"));
    this.set("password", hashed);
  }
});
userSchema.statics.build = (attr: UserAttributes) => {
  return new User(attr);
};

const User = mongoose.model<UserDoc, UserModel>("User", userSchema);

export { User };

//TEST CASES
