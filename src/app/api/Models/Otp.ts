import mongoose, { Document, Schema } from 'mongoose';

export interface UserDocument extends Document {
    email: string;
    otp: string;
}

const UserSchema = new Schema<UserDocument>({
    email: {
        type: String,
        required: true,
        unique: true
    },
    otp: {
        type: String,
        required: true,
    },
}, {
    timestamps: true
});

export default mongoose.models.Otp || mongoose.model<UserDocument>('Otp', UserSchema);
