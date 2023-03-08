import express from 'express';
import multer from 'multer';
import { GalleryService } from '../services/gallery.service';
import { authenticateToken } from '../middleware/authenticateToken';

const router = express.Router();
const upload = multer({ dest: 'images/' });
const galleryService = new GalleryService();

router.post('/', authenticateToken, upload.single('image'), async (req, res) => {

  const { user } = req as any;
  const { originalname, filename } = req.file as any;

  const imageUrl = `${process.env.BASE_URL || 'http://localhost:3000'}/images/${filename}`;
  const galleryImage = await galleryService.addGalleryImage(user.userId, imageUrl, originalname);

  res.status(201).json(galleryImage);
});

router.get('/', async (req, res) => {

  const galleryImages = await galleryService.getGalleryImages();

  res.status(200).json(galleryImages);

});

router.get('/user', authenticateToken, async (req, res) => {

  const { user } = req as any;
  const galleryImages = await galleryService.getGalleryImagesByUserId(user.userId);
  res.status(200).json(galleryImages);

});

router.delete('/:id', authenticateToken, async (req, res) => {

  const { id } = req.params;
  const { user } = req as any;

  const galleryImage = await galleryService.getGalleryImageById(id);

  if (!galleryImage) {
    return res.status(404).json({ message: 'Gallery image not found' });
  }

  if (galleryImage.userId.toString() !== user.userId) {
    return res.status(403).json({ message: 'You are not authorized to delete this image' });
  }

  await galleryService.deleteGalleryImage(id);

  res.status(200).json({ message: 'Gallery image deleted successfully' });

});

router.put('/:id/like', authenticateToken, async (req, res) => {

  const { id } = req.params;
  const { user } = req as any;

  const galleryImage = await galleryService.likeGalleryImage(id, user.userId);
  res.status(200).json(galleryImage);

});

export { router as galleryRouter };
