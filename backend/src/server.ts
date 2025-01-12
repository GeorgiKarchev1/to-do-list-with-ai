import express, { Request, Response, NextFunction } from 'express';
import multer from 'multer';
import OpenAI from 'openai';
import dotenv from 'dotenv';
import cors from 'cors';
import fs from 'fs';
import path from 'path';

dotenv.config();

const app = express();
app.use(cors());
const upload = multer({ storage: multer.memoryStorage() });

if (!process.env.OPENAI_API_KEY) {
  throw new Error('OPENAI_API_KEY is not set in environment variables');
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function testOpenAIConnection() {
  try {
    console.log('Testing OpenAI connection...');
    const models = await openai.models.list();
    console.log('OpenAI connection successful');
  } catch (error: any) {
    console.error('OpenAI connection test failed:', error.message);
    if (error.message.includes('auth')) {
      console.error('API key might be invalid or expired');
    }
    if (error.message.includes('network')) {
      console.error('Check your internet connection or proxy settings');
    }
  }
}

app.post('/api/transcribe', upload.single('audio'), async (
  req: Request & { file?: Express.Multer.File },
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    if (!req.file) {
      res.status(400).json({ error: 'No audio file provided' });
      return;
    }

    console.log('Received audio file:', {
      mimetype: req.file.mimetype,
      size: req.file.size,
      originalname: req.file.originalname
    });

    const tempDir = path.join(__dirname, '../temp');
    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir, { recursive: true });
    }
    
    const tempFilePath = path.join(tempDir, `${Date.now()}.mp3`);
    fs.writeFileSync(tempFilePath, req.file.buffer);

    try {
      const fileStream = fs.createReadStream(tempFilePath);
      console.log('Calling OpenAI API with file:', tempFilePath);
      
      const transcription = await openai.audio.transcriptions.create({
        file: fileStream,
        model: "whisper-1",
        language: "bg"
      });

      fs.unlinkSync(tempFilePath);
      console.log('Transcription success:', transcription.text);
      
      res.json({ text: transcription.text });
    } catch (error: any) {
      console.error('OpenAI API Error:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status
      });
      
      res.status(500).json({ 
        error: 'Error processing audio',
        details: error.message 
      });
    }
  } catch (error: any) {
    console.error('Server Error:', error);
    res.status(500).json({ 
      error: 'Server error',
      details: error.message 
    });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
  console.log('OpenAI API Key:', process.env.OPENAI_API_KEY ? 'Set' : 'Not set');
  await testOpenAIConnection();
}); 