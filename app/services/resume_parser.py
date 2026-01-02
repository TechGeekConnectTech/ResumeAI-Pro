import PyPDF2
import docx
import io
import logging
from typing import Optional

logger = logging.getLogger(__name__)

class ResumeParser:
    @staticmethod
    def extract_text_from_pdf(file_content: bytes) -> str:
        """Extract text from PDF file"""
        try:
            pdf_file = io.BytesIO(file_content)
            pdf_reader = PyPDF2.PdfReader(pdf_file)
            text = ""
            
            for page in pdf_reader.pages:
                text += page.extract_text() + "\n"
            
            return text.strip()
        except Exception as e:
            logger.error(f"Error extracting text from PDF: {str(e)}")
            return ""
    
    @staticmethod
    def extract_text_from_docx(file_content: bytes) -> str:
        """Extract text from DOCX file"""
        try:
            docx_file = io.BytesIO(file_content)
            doc = docx.Document(docx_file)
            text = ""
            
            for paragraph in doc.paragraphs:
                text += paragraph.text + "\n"
            
            return text.strip()
        except Exception as e:
            logger.error(f"Error extracting text from DOCX: {str(e)}")
            return ""
    
    @staticmethod
    def extract_text_from_doc(file_content: bytes) -> str:
        """Extract text from DOC file (basic support)"""
        try:
            # For DOC files, we'll try to convert them as text
            # This is a simple implementation - for production, consider using python-docx2txt or similar
            text = file_content.decode('utf-8', errors='ignore')
            return text.strip()
        except Exception as e:
            logger.error(f"Error extracting text from DOC: {str(e)}")
            return ""
    
    @classmethod
    def parse_resume(cls, file_content: bytes, filename: str) -> Optional[str]:
        """Parse resume based on file extension"""
        try:
            file_extension = filename.lower().split('.')[-1]
            
            if file_extension == 'pdf':
                return cls.extract_text_from_pdf(file_content)
            elif file_extension in ['docx']:
                return cls.extract_text_from_docx(file_content)
            elif file_extension in ['doc']:
                return cls.extract_text_from_doc(file_content)
            else:
                logger.error(f"Unsupported file format: {file_extension}")
                return None
                
        except Exception as e:
            logger.error(f"Error parsing resume {filename}: {str(e)}")
            return None