import { Router, Request, Response, NextFunction } from 'express';
import multer from 'multer';
import { shareService } from '../services/share.service';
import { ShareCreateSchema, ShareCodeParamSchema } from '../validators/share.validators';
import { enforceRateLimit } from '../http/rate-limiter';
import { UnprocessableEntityError } from '../http/errors';
import { sendSuccess } from '../http/express-helpers';

export const shareRouter = Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: Number(process.env.UPLOAD_MAX_BYTES) || 5 * 1024 * 1024,
  },
});

// POST /api/share
shareRouter.post('/share', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const ip = (req.headers['x-forwarded-for'] as string) || req.ip || '127.0.0.1';
    await enforceRateLimit(`share:create:${ip}`, 20, 60 * 1000);

    const validated = ShareCreateSchema.parse(req.body);
    const result = await shareService.createShareLink(validated);
    return sendSuccess(res, result, undefined, 201);
  } catch (error) {
    next(error);
  }
});

// GET /api/share/:code
shareRouter.get('/share/:code', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { code } = ShareCodeParamSchema.parse(req.params);
    const result = await shareService.getShareByCode(code);
    return sendSuccess(res, result);
  } catch (error) {
    next(error);
  }
});

// POST /api/share/photo (multipart/form-data)
shareRouter.post('/share/photo', upload.fields([{ name: 'file', maxCount: 1 }, { name: 'photo', maxCount: 1 }]), async (req: Request, res: Response, next: NextFunction) => {
  try {
    const ip = (req.headers['x-forwarded-for'] as string) || req.ip || '127.0.0.1';
    await enforceRateLimit(`share_photo:${ip}`, 15, 60 * 1000);

    const files = req.files as { [fieldname: string]: Express.Multer.File[] } | undefined;
    const uploadedFile = files?.file?.[0] || files?.photo?.[0] || req.file;

    if (!uploadedFile) {
      throw new UnprocessableEntityError('File foto tidak ditemukan dalam form upload (field: file atau photo).');
    }

    const result = await shareService.createPhotoShare({
      buffer: uploadedFile.buffer,
      mimeType: uploadedFile.mimetype,
      sizeBytes: uploadedFile.size,
    });

    return sendSuccess(res, result, undefined, 201);
  } catch (error) {
    next(error);
  }
});
