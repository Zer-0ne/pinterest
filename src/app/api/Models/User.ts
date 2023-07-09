import mongoose, { Document, Schema } from 'mongoose';

export interface UserDocument extends Document {
  name: string;
  username: string;
  password: string;
  saved?: mongoose.SchemaDefinitionProperty<string[]>;
  posts?: mongoose.SchemaDefinitionProperty<string[]>;
  isAdmin: mongoose.SchemaDefinitionProperty<boolean>;
  email: string;
  followings: {
    userId: {
      type: typeof Schema.Types.ObjectId;
      ref: String;
    };
  }[]
  followers: {
    userId: {
      type: typeof Schema.Types.ObjectId;
      ref: String;
    };
  }[]
  image: {
    type: StringConstructor;
    required: boolean;
  }
}

const UserSchema = new Schema<UserDocument>({
  name: {
    type: String,
    // required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique:true
  },
  password: {
    type: String,
    required: true,
  },
  followers: [
    {
      userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
      }
    }
  ],
  followings: [
    {
      userId: {
        type: Schema.Types.ObjectId,
        ref: "User" as String,
      }
    }
  ],
  image: {
    type: String,
    required: true
  },
  saved: {
    type: [Schema.Types.ObjectId],
    ref: 'Pin',
    default: [],
  },
  posts: {
    type: [Schema.Types.ObjectId],
    ref: 'Pin',
    default: [],
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true
});

export default mongoose.models.User || mongoose.model<UserDocument>('User', UserSchema);
