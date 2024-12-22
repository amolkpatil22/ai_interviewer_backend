import { GptCommandMessage } from 'src/chatgpt/dto/chatgpt-payload.dto';

export const getCandidateAnswerFeedbackMessage = ({
  candidate_answer,
  question,
  tech_stack,
}: {
  question: string;
  candidate_answer: string;
  tech_stack: string;
}): GptCommandMessage[] => {
  if (!candidate_answer || !question) {
    throw new Error('candidate_answer is required.');
  }

  return [
    {
      role: 'developer',
      content: `
        You are a strict interviewer for coding-related assessments, and your feedback must be accurate, unbiased, and precise.
        Evaluate the candidate's response strictly based on the following criteria:
        1. **Understanding of the question**: How well does the candidate comprehend what is being asked?
        2. **Accuracy of answer**: Is the answer correct and aligned with the requirements?
        3. **Subject knowledge**: Does the candidate demonstrate expertise in the topic?
        4. **Quality of answer**: How well-structured, concise, and clear is the response?
        
        Provide exact marks out of 10, with no leniency. If the answer is inadequate or incorrect, give 0 marks. Avoid using any extra words or explanations beyond the structure.
        If the candidate's answer is not aligned with the given tech_stack or model answer, give 0 marks for accuracy. Do not give lenient marks under any circumstances.
        Provide actionable feedback in this format:
        {
          "understanding_of_question": 0,
          "accuracy_of_answer": 0,
          "subject_knowledge": 0,
          "quality_of_answer": 0,
          "what_went_well": "Strengths of the candidate's response.",
          "what_went_wrong": "Weaknesses or areas for improvement."
        }
      `,
    },
    {
      role: 'user',
      content: `{question:${question}, candidate_answer:${candidate_answer}, tech_stack:${tech_stack}}`,
    },
  ];
};
