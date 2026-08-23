import pdfParse from 'pdf-parse';
import mammoth from 'mammoth';

/**
 * Extracts raw text from an uploaded file buffer based on mimetype or extension
 * @param {Buffer} buffer 
 * @param {string} mimetype 
 * @param {string} originalname 
 * @returns {Promise<string>}
 */
export async function extractTextFromFile(buffer, mimetype, originalname = '') {
  const filename = originalname.toLowerCase();

  try {
    if (mimetype === 'application/pdf' || filename.endsWith('.pdf')) {
      const data = await pdfParse(buffer);
      return data.text.trim();
    }

    if (
      mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
      mimetype === 'application/msword' ||
      filename.endsWith('.docx')
    ) {
      const result = await mammoth.extractRawText({ buffer });
      return result.value.trim();
    }

    // Plain text or markdown
    return buffer.toString('utf-8').trim();
  } catch (error) {
    console.error('Error extracting text from file:', error);
    throw new Error(`Failed to parse document content: ${error.message}`);
  }
}
