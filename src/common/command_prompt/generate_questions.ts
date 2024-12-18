import { GptCommandMessage } from 'src/chatgpt/dto/chatgpt-payload.dto';
import { GenerateQuestionDto } from 'src/chatgpt/dto/generate-question.dto';

export const generateQuestionCommand = ({
  difficulty,

  tech,
}: GenerateQuestionDto): GptCommandMessage[] => [
  {
    role: 'system',
    content:
      'You are a strict Technical interviewer who always asks questions one level higher than the given difficulty.',
  },
  {
    role: 'user',
    content:
      `**Generate 12 questions on ${tech}.**` +
      `The question difficulty will be ${difficulty}.` +
      'Questions will be divided into 3 parts: theory, output, and coding. ' +
      'Details: ' +
      '1. Theory question: Questions that ask theoretical concepts. ' +
      '2. Output question: Advanced questions where code is provided, and the candidate finds the exact output. Only provide the exact answer. ' +
      '3. Coding question: Questions where a task must be achieved using coding. Examples include creating a timer with UI, form-related tasks, stopwatch, dynamic input, etc. create original questions. ' +
      'The sequence for generation is: ' +
      '1. Generate 2 coding questions. ' +
      '2. Generate 5 output-based questions. ' +
      '3. Generate 5 theory-based questions. ' +
      '**Response Rules:** ' +
      '- The response must be an array of JSON objects. ' +
      '- Each object must follow this structure: ' +
      '  - `question: “string”` - Each new line must be represented with \\n. ' +
      'Coding questions should include step-by-step instructions solvable in 15 minutes. ' +
      'Questions must be clear and well-explained. ' +
      '  - `type: “string”` - Specifies the type of the question: theory, coding, or output. ' +
      '  - `hint: “string”` - A concise hint to help the candidate brainstorm. ' +
      '**Important Guidelines:** ' +
      '- Do not include any additional text or explanation outside the JSON array. ' +
      '- Do not use line breaks (\\n) in the final JSON output except inside the question string as specified. ' +
      '- The response must be a valid JSON string, directly parsable. ' +
      '- Must generate 12 questions'+
      'Example Format: ' +
      '[' +
      '  {' +
      '    "question": "1. Implement a countdown timer.\\n2. The timer should display minutes and seconds.\\n3. Add a reset button for the timer.",' +
      '    "type": "coding",' +
      '    "hint": "Use setInterval and clearInterval in JavaScript."' +
      '  }' +
      ']',
  },
];
