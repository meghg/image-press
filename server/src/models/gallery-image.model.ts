import mongoose, { Document, Schema, ObjectId } from 'mongoose';

export interface GalleryImage extends Document {
  imageUrl: string;
  originalName: string;
  userId: mongoose.Types.ObjectId;
  likes: mongoose.Types.ObjectId[];
  createdAt: string;
  updatedAt: string;
}

const galleryImageSchema = new Schema<GalleryImage>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  originalName: {
    type: String,
    required: true
  },
  likes: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
}, {
  timestamps: true
}, );

const GalleryImageModel = mongoose.model<GalleryImage>('GalleryImage', galleryImageSchema);

export { GalleryImageModel };