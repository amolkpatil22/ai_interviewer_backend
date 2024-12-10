import { Injectable } from '@nestjs/common';
import { CreateChatgptDto } from './dto/create-chatgpt.dto';
import { UpdateChatgptDto } from './dto/update-chatgpt.dto';
import { UserCommandMessageDto } from 'src/common/interfaces/messageJson.dto';
import {
  AxiosService,
  BaseAPI,
} from 'src/axios_interceptor/axios_interceptor.service';
import { ChatGptPayloadDto } from './dto/chatgpt-payload.dto';
import { ConfigService } from '@nestjs/config';
import { systemCommandMessage } from 'src/common/command_prompt/command_prompt';
import { generateQuestionCommand } from 'src/common/command_prompt/generate_questions';
import { GenerateQuestionDto } from './dto/generate-question.dto';

@Injectable()
export class ChatgptService {
  private readonly axiosService: AxiosService;

  constructor(private configService: ConfigService) {
    this.axiosService = new AxiosService(configService, 'chatGpt');
  }

  async getFeedBack(messageJson: UserCommandMessageDto[]) {
    let finalPayload: ChatGptPayloadDto = {
      model: this.configService.get('GPT_MODEL'),
      messages: [systemCommandMessage],
      temperature: 0,
    };

    messageJson.forEach((item) => {
      finalPayload.messages.push({
        role: 'user',
        content: JSON.stringify(item),
      });
    });

    const gptResponse = await this.axiosService.post(
      '/completions',
      finalPayload,
    );
    return gptResponse;
  }

  async generateQuestions({
    category_id,
    difficulty,
    sub_category_id,
    tech,
  }: GenerateQuestionDto) {
    let finalPayload: ChatGptPayloadDto = {
      model: this.configService.get('GPT_MODEL'),
      messages: generateQuestionCommand({
        category_id,
        difficulty,
        sub_category_id,
        tech,
      }),
      temperature: 0,
    };
    const gptResponse = await this.axiosService.post(
      '/completions',
      finalPayload,
    );
    return gptResponse;

   
    // let data= "[\n  {\n    \"_id\": ObjectId(\"64b1c1e7e4b0c1a1a4e1f1a1\"),\n    \"category_id\": ObjectId(\"67436207ec98901ac3e4b699\"),\n    \"sub_category_id\": ObjectId(\"674362e3c94b679a47aa4f5c\"),\n    \"question\": \"Explain the role of middleware in Express.js and how it can be used to handle errors. Provide an example of a custom error-handling middleware. \",\n    \"difficulty\": \"hard\",\n    \"type\": \"theory\",\n    \"hint\": \"Middleware functions can access the request and response objects and can modify them.\"\n  },\n  {\n    \"_id\": ObjectId(\"64b1c1e7e4b0c1a1a4e1f1a2\"),\n    \"category_id\": ObjectId(\"67436207ec98901ac3e4b699\"),\n    \"sub_category_id\": ObjectId(\"674362e3c94b679a47aa4f5c\"),\n    \"question\": \"What is the purpose of the 'useEffect' hook in React? Explain how it can be used to manage side effects in functional components.\",\n    \"difficulty\": \"hard\",\n    \"type\": \"theory\",\n    \"hint\": \"useEffect can be used to perform side effects such as data fetching, subscriptions, or manually changing the DOM.\"\n  },\n  {\n    \"_id\": ObjectId(\"64b1c1e7e4b0c1a1a4e1f1a3\"),\n    \"category_id\": ObjectId(\"67436207ec98901ac3e4b699\"),\n    \"sub_category_id\": ObjectId(\"674362e3c94b679a47aa4f5c\"),\n    \"question\": \"Describe the concept of 'props drilling' in React. What are the potential issues it can cause, and how can you avoid it?\",\n    \"difficulty\": \"hard\",\n    \"type\": \"theory\",\n    \"hint\": \"Props drilling occurs when you pass data through many layers of components.\"\n  },\n  {\n    \"_id\": ObjectId(\"64b1c1e7e4b0c1a1a4e1f1a4\"),\n    \"category_id\": ObjectId(\"67436207ec98901ac3e4b699\"),\n    \"sub_category_id\": ObjectId(\"674362e3c94b679a47aa4f5c\"),\n    \"question\": \"What is the purpose of the 'useReducer' hook in React? How does it differ from 'useState'?\",\n    \"difficulty\": \"hard\",\n    \"type\": \"theory\",\n    \"hint\": \"useReducer is used for managing complex state logic in components.\"\n  },\n  {\n    \"_id\": ObjectId(\"64b1c1e7e4b0c1a1a4e1f1a5\"),\n    \"category_id\": ObjectId(\"67436207ec98901ac3e4b699\"),\n    \"sub_category_id\": ObjectId(\"674362e3c94b679a47aa4f5c\"),\n    \"question\": \"Explain the concept of 'virtual DOM' in React. How does it improve performance?\",\n    \"difficulty\": \"hard\",\n    \"type\": \"theory\",\n    \"hint\": \"Virtual DOM is a lightweight copy of the actual DOM that React uses to optimize rendering.\"\n  },\n  {\n    \"_id\": ObjectId(\"64b1c1e7e4b0c1a1a4e1f1a6\"),\n    \"category_id\": ObjectId(\"67436207ec98901ac3e4b699\"),\n    \"sub_category_id\": ObjectId(\"674362e3c94b679a47aa4f5c\"),\n    \"question\": \"Given the following code, what will be the output when the button is clicked? \\n\\n```javascript\\nimport React, { useState } from 'react';\\n\\nfunction App() {\\n  const [count, setCount] = useState(0);\\n\\n  const handleClick = () => {\\n    setCount(count + 1);\\n  };\\n\\n  return (\\n    <div>\\n      <p>You clicked {count} times</p>\\n      <button onClick={handleClick}>Click me</button>\\n    </div>\\n  );\\n}\\nexport default App;\\n```\",\n    \"difficulty\": \"hard\",\n    \"type\": \"output\",\n    \"hint\": \"The output will show the number of times the button has been clicked.\"\n  },\n  {\n    \"_id\": ObjectId(\"64b1c1e7e4b0c1a1a4e1f1a7\"),\n    \"category_id\": ObjectId(\"67436207ec98901ac3e4b699\"),\n    \"sub_category_id\": ObjectId(\"674362e3c94b679a47aa4f5c\"),\n    \"question\": \"What will be the output of the following code snippet? \\n\\n```javascript\\nconst arr = [1, 2, 3, 4];\\nconst newArr = arr.map(num => num * 2);\\nconsole.log(newArr);\\n```\",\n    \"difficulty\": \"hard\",\n    \"type\": \"output\",\n    \"hint\": \"The output will be an array with each element multiplied by 2.\"\n  },\n  {\n    \"_id\": ObjectId(\"64b1c1e7e4b0c1a1a4e1f1a8\"),\n    \"category_id\": ObjectId(\"67436207ec98901ac3e4b699\"),\n    \"sub_category_id\": ObjectId(\"674362e3c94b679a47aa4f5c\"),\n    \"question\": \"What will be the output of the following code when executed? \\n\\n```javascript\\nconst obj = { a: 1, b: 2 };\\nconst { a, b } = obj;\\nconsole.log(a + b);\\n```\",\n    \"difficulty\": \"hard\",\n    \"type\": \"output\",\n    \"hint\": \"The output will be the sum of the properties 'a' and 'b' of the object.\"\n  },\n  {\n    \"_id\": ObjectId(\"64b1c1e7e4b0c1a1a4e1f1a9\"),\n    \"category_id\": ObjectId(\"67436207ec98901ac3e4b699\"),\n    \"sub_category_id\": ObjectId(\"674362e3c94b679a47aa4f5c\"),\n    \"question\": \"What will be the output of the following code snippet? \\n\\n```javascript\\nconst greet = (name) => `Hello, ${name}!`;\\nconsole.log(greet('World'));\\n```\",\n    \"difficulty\": \"hard\",\n    \"type\": \"output\",\n    \"hint\": \"The output will be a greeting message with the provided name.\"\n  },\n  {\n    \"_id\": ObjectId(\"64b1c1e7e4b0c1a1a4e1f1aa\"),\n    \"category_id\": ObjectId(\"67436207ec98901ac3e4b699\"),\n    \"sub_category_id\": ObjectId(\"674362e3c94b679a47aa4f5c\"),\n    \"question\": \"Create a simple React application that includes a form with two input fields (name and email) and a submit button. On submission, display the entered values below the form. \\n\\n1. Create a functional component named 'UserForm'. \\n2. Use 'useState' to manage the form inputs. \\n3. Implement a submit handler to display the values.\",\n    \"difficulty\": \"hard\",\n    \"type\": \"coding\",\n    \"hint\": \"Use useState to manage form inputs and handle form submission.\"\n  },\n  {\n    \"_id\": ObjectId(\"64b1c1e7e4b0c1a1a4e1f1ab\"),\n    \"category_id\": ObjectId(\"67436207ec98901ac3e4b699\"),\n    \"sub_category_id\": ObjectId(\"674362e3c94b679a47aa4f5c\"),\n    \"question\": \"Build a simple stopwatch application using React. \\n\\n1. Create a functional component named 'Stopwatch'. \\n2. Use 'useState' to manage the elapsed time and 'useEffect' to handle the timer. \\n3. Include start, stop, and reset buttons to control the stopwatch.\",\n    \"difficulty\": \"hard\",\n    \"type\": \"coding\",\n    \"hint\": \"Use setInterval to update the elapsed time and clearInterval to stop it.\"\n  }\n]"
    // return JSON.parse(data)
  }
}
