import express from 'express';
import multer from 'multer';
import { extractTextFromFile } from '../services/parser.js';
import { analyzeContract } from '../services/gemini.js';

const router = express.Router();

// Configure multer memory storage (up to 10MB file size)
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 }
});

// Analyze raw pasted contract text
router.post('/text', async (req, res) => {
  try {
    const { text, documentTitle } = req.body;

    if (!text || text.trim().length < 20) {
      return res.status(400).json({
        error: 'Please provide at least a few sentences or clauses of contract text to analyze.'
      });
    }

    const analysis = await analyzeContract(text);
    if (documentTitle) {
      analysis.documentTitle = documentTitle;
    }

    return res.json({
      success: true,
      data: analysis
    });
  } catch (error) {
    console.error('Error analyzing contract text:', error);
    return res.status(500).json({
      error: 'Failed to complete contract analysis.',
      details: error.message
    });
  }
});

// Analyze uploaded file (PDF, DOCX, TXT)
router.post('/file', upload.single('document'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file was uploaded.' });
    }

    const extractedText = await extractTextFromFile(
      req.file.buffer,
      req.file.mimetype,
      req.file.originalname
    );

    if (!extractedText || extractedText.trim().length < 20) {
      return res.status(400).json({
        error: 'Could not extract readable text from the uploaded file. Please ensure the document is not an empty or password-protected file.'
      });
    }

    const analysis = await analyzeContract(extractedText);
    analysis.documentTitle = req.file.originalname;

    return res.json({
      success: true,
      data: analysis,
      filename: req.file.originalname
    });
  } catch (error) {
    console.error('Error analyzing contract file:', error);
    return res.status(500).json({
      error: 'Failed to process and analyze document.',
      details: error.message
    });
  }
});

export default router;
