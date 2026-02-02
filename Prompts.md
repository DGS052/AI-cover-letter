# Mission 4: AI Cover Letter Generator - Prompts

## System Architecture
I used a NodeJS backend to parse the PDF resume using `pdf-parse`. The raw text is then sent to Google Gemini 1.5 Flash.

## The Prompt Engineering
The core logic resides in the backend where I inject the parsed resume text and job description into a dynamic template.

**My Prompt Template:**
> "Write a professional cover letter for a candidate with this Resume Content: 
> [Parsed_Resume_Text]
> 
> Applying for this Job Description: 
> [User_Job_Description]
> 
> Keep it concise, professional, and standard format."

## Challenges Solved
- **PDF Parsing:** Used a buffer to handle file uploads without saving to disk.
- **Security:** Kept the API Key in a `.env` file on the backend, ensuring it is never exposed to the client.