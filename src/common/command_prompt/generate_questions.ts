import { GptCommandMessage } from 'src/chatgpt/dto/chatgpt-payload.dto';
import { GenerateQuestionDto } from 'src/chatgpt/dto/generate-question.dto';

export const generateQuestionCommand = ({
  category_id,
  difficulty,
  sub_category_id,
  tech,
}: GenerateQuestionDto): GptCommandMessage[] => [
  {
    role: 'system',
    content:
      'Your are strict Technical interviewer and always give one level up question than the given difficulty level',
  },
  {
    role: 'user',
    content:
      `give 12 questions on ${tech}.` +
      `question difficulty will be ${difficulty}.` +
      'question will be divided into 3 parts theory,output,coding' +
      'theory question: question in which theory will be asked' +
      'output question:advanced questions in which code will be given and candidate has to find out output.just exact answer' +
      'coding question: questions in which a task will be given to achieve with coding for given tech stack. eg. creating timer with ui, related to some form task, stopwatch, dynamic input etc. use your own questions' +
      'generate 2 coding questions' +
    //   'then generate 5 output based and' +
    //   'then generate 5 theory based .' +
      'Response must be array of objects. **dont use any additional word*****' +
      'Only questions each new line must be denoted with \n. Response should not contain \n. Respone must be string only, response must be parsable' +
      'Follow the below format ' +
      '[{ _id: "string",// generate valid and unique mongo id //' +
      `category_id: ${category_id} // fixed value dont change //` +
      `sub_category_id: ${sub_category_id} // fixed value dont change //` +
      'question:  “string” , // each new line must be denoted with \n. Coding questions must be in steps like 1,2,3 . Coding question must be solvable in 15 minutes . Question must have proper explanation //' +
      `difficulty: "${difficulty}", // fixed value//` +
      'type:”string”, // based on question theory | coding | output//' +
      'hint: “string” , // concise hint which will contain answer// }]',
  },
];
