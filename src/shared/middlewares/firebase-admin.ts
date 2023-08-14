import { Request, Response, NextFunction } from 'express';
import { v4 as uuidv4 } from "uuid";

import admin from 'firebase-admin';
import serviceAccount from '../config/firebase/auth.json';

const serviceAcconuntVar: any = serviceAccount;

const BUCKET = "funnify-9dc0b.appspot.com";

admin.initializeApp({
  credential: admin.credential.cert(serviceAcconuntVar),
  storageBucket: BUCKET
});

const bucket = admin.storage().bucket();

const uploadFile = (req: Request, res: Response, next: NextFunction) => {
  if (!req.file) return next();

  const file = req.file;
  const uuid = uuidv4();
  const fileFormat = file.originalname.split('.').pop();
  const filename = `${uuid}.${fileFormat}`;
  
  let prefix = '';

  if (file.mimetype.startsWith('video/') && req.path.includes('/post')) {
    prefix = 'posts/videos/';
  } else if (file.mimetype.startsWith('image/') && req.path.includes('/post')) {
    prefix = 'posts/images/'
  } else if (req.path.includes('/profile') && file.mimetype.startsWith('image/')) {
    prefix = 'users/'
  }

  const storageFile = bucket.file(prefix + filename);

  const stream = storageFile.createWriteStream({
    metadata: {
      contentType: file.mimetype,
    }
  });

  stream.on("error", (e: any) => {
    console.error(e);
  });

  stream.on("finish", async () => {
    await storageFile.makePublic();

    (file as any).firebaseUrl = `https://storage.googleapis.com/${BUCKET}/${prefix}${filename}`;
    (file as any).filename = filename;

    next();
  });

  stream.end(file.buffer);
};

export default uploadFile;
