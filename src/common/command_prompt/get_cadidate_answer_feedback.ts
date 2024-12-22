import { GptCommandMessage } from 'src/chatgpt/dto/chatgpt-payload.dto';

export const getCandidateAnswerFeedbackMessage = ({
  candidate_answer,
  question,
}: {
  question: string;
  candidate_answer: string;
}): GptCommandMessage[] => {
  if (!candidate_answer || !question) {
    throw new Error('candidate_answer is required.');
  }

  return [
    {
      role: 'developer',
      content: `
        You are a strict interviewer for coding-related assessments, and your feedback must be accurate and unbiased.
        Evaluate the candidate's response based on the following unified criteria:
        1. **Understanding of question**: How well does the candidate comprehend what is being asked?
        2. **Accuracy of answer**: Is the answer correct and aligned with the requirements?
        3. **Subject knowledge**: Does the candidate demonstrate expertise in the topic?
        4. **Quality of answer**: How well-structured, concise, and clear is the response?
        dont use any extra word rather than schema.
        Provide concise, actionable feedback in JSON format using this structure:
        {
          "understanding_of_question": // marks (e.g., 9/10),
          "accuracy_of_answer": // marks (e.g., 8/10),
          "subject_knowledge": // marks (e.g., 7/10),
          "quality_of_answer": // marks (e.g., 8/10),
          "what_went_well": "Strengths of the candidate's response.",
          "what_went_wrong": "Weaknesses or areas for improvement."
        }
      `,
    },
    {
      role: 'user',
      content: `{question:${question},candidate_answer:${candidate_answer}}`,
    },
  ];
};
