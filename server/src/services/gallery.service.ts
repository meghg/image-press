import { GalleryImageModel, GalleryImage } from '../models/gallery-image.model';
import { Types } from "mongoose"

export class GalleryService {
  
  async addGalleryImage(userId: string, imageUrl: string, originalName: string): Promise<GalleryImage> {
    const galleryImage = new GalleryImageModel({
      userId,
      imageUrl,
      originalName,
    });
    await galleryImage.save();
    return galleryImage.toObject();
  }

  async getGalleryImages(): Promise<GalleryImage[]> {
    const galleryImages = await GalleryImageModel.find();
    return galleryImages.map((galleryImage) => galleryImage.toObject());
  }

  async getGalleryImagesByUserId(userId: string): Promise<GalleryImage[]> {
    const galleryImages = await GalleryImageModel.find({ userId });
    return galleryImages.map((galleryImage) => galleryImage.toObject());
  }

  async getGalleryImageById(id: string): Promise<GalleryImage | null> {
    const galleryImage = await GalleryImageModel.findById(id);
    return galleryImage ? galleryImage.toObject() : null;
  }

  async deleteGalleryImage(id: string): Promise<void> {
    await GalleryImageModel.findByIdAndDelete(id);
  }

  async likeGalleryImage(id: string, userId: Types.ObjectId): Promise<GalleryImage | null> {
    const galleryImage = await GalleryImageModel.findById(id);
    if (!galleryImage) {
      return null;
    }
    if (!galleryImage.likes.includes(userId)) {
      galleryImage.likes.push(userId);
      await galleryImage.save();
    }
    return galleryImage.toObject();
  }
}
