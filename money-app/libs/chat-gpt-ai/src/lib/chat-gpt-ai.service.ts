import { Injectable } from '@nestjs/common';
import { Configuration, OpenAIApi, CreateCompletionRequest } from 'openai';
import * as fs from 'fs';

const DEFAULT_MODEL_ID = 'text-davinci-003';
const DEFAULT_TEMPERATURE = 0.9;

@Injectable()
export class ChatGptAiService {
  private readonly openAiApi: OpenAIApi;
  private readonly openAiApi2: OpenAIApi;
  private selectModelId: string | undefined;

  constructor() {
    const configuration = new Configuration({
      organization: process.env['ORGANIZATION_ID'],
      apiKey: process.env['OPENAI_API_KEY'],
    });
    const configuration2 = new Configuration({
      apiKey: process.env['OPENAI_API_KEY'],
    });

    this.openAiApi = new OpenAIApi(configuration);
    this.openAiApi2 = new OpenAIApi(configuration2);
  }

  setModelId(modelId: string) {
    if (modelId.includes(':')) {
      modelId = modelId.replace(':', '-');
    }
    this.selectModelId = modelId;
  }

  async listModels() {
    const models = await this.openAiApi.listModels();
    return models.data;
  }

  async getModelAnswer(
    question: string,
    prevContext?: string,
    temperature?: number
  ) {
    try {
      const params: CreateCompletionRequest = {
        prompt: prevContext + '\n' + question,
        model: this.selectModelId ? this.selectModelId : DEFAULT_MODEL_ID,
        temperature:
          temperature != undefined ? temperature : DEFAULT_TEMPERATURE,
        max_tokens: 2048,
      };
      const response = await this.openAiApi.createCompletion(params);
      const { data } = response;

      if (data.choices.length) {
        return data.choices[0].text;
      }
      return response.data;
    } catch (error) {
      return 'Ошибка';
    }
  }

  // sendVoiceFile(fileMp3Path: string) {

  // 	// Проверяем наличие файла каждую секунду
  // 	const checkFileInterval = setInterval(() => {
  // 		if (fs.existsSync(fileMp3Path)) {

  // 			// Если файл стал доступен, прекращаем проверять наличие файла
  // 			console.log('Файл стал доступен');

  // 			fs.unwatchFile(fileMp3Path);
  // 			clearInterval(checkFileInterval);

  // 			// Читаем содержимое файла в буфер
  // 			const fileContent = fs.readFileSync(fileMp3Path);
  // 			const fileReadStream = fs.createReadStream(fileMp3Path);

  // 			// Отправляем запрос на OpenAI API с помощью Axios
  // 			const sendRequest = async () => {
  // 				//const base64Data = fileContent.toString('base64');
  // 				// const transcriptionRequest = {
  // 				// 	file: base64Data,
  // 				// 	model: 'text-davinci-002',
  // 				// 	prompt: 'Transcribe the following audio file: file.mp3',
  // 				// };

  // 				// const fileContent = fs.readFileSync(fileMp3Path);
  // 				// const blob = new Blob([fileContent], { type: 'audio/mpeg' });
  // 				// const file = new File([blob], 'tempFile.mp3', { type: 'audio/mpeg' });
  // 				// const transcriptionResponse = await this.openAiApi2.createTranscription(
  // 				// 	file,
  // 				// 	'whisper-2',
  // 				// 	`Transcribe the following audio file: ${fileMp3Path}`,
  // 				// 	'text'
  // 				// );
  // 				// console.log(transcriptionResponse);

  // 				// const base64Data = fileContent.toString('base64');
  // 				// console.log(fileMp3Path);
  // 				// const params = {
  // 				// 	prompt: 'Some text prompt',
  // 				// 	file: base64Data,
  // 				// 	model: 'davinci-codex',
  // 				// 	temperature: 0.5,
  // 				// 	max_tokens: 2048,
  // 				// };

  // 				// // отправляем запрос к OpenAI API с помощью метода createCompletion()
  // 				// const response = await this.openAiApi.createCompletion(params)
  // 				// 	.then((response) => {
  // 				// 		console.log(response.data.choices[0].text);
  // 				// 	})
  // 				// 	.catch((error) => {
  // 				// 		console.log('_________________________________________________________________________');

  // 				// 		console.error(error);
  // 				// 	});

  // 				const resp = await this.openAiApi2.createTranscription(fs.createReadStream(fileMp3Path) as any, 'whisper-1');
  // 				console.log('😆😆😆😆😆😆😆😆😆😆😆😆😆😆😆😆😆😆😆😆😆😆😆😆😆😆😆😆😆😆😆😆😆😆😆😆😆😆😆😆😆😆😆😆😆😆😆😆😆😆😆😆😆');
  // 				console.log(resp.data.text);
  // 				const { data } = resp;

  // 				if (data.text.length) {
  // 					return data.text
  // 				}
  // 				return resp.data;
  // 			};
  // 			sendRequest();
  // 		}
  // 	}, 1000);
  //}
  async sendVoiceFile(fileMp3Path: string): Promise<string> {
    const resp = await this.openAiApi2.createTranscription(
      fs.createReadStream(fileMp3Path) as any,
      'whisper-1'
    );
    const { data } = resp;
    //console.log(data);
    if (data.text.length) {
      //const answerAudio = await this.getModelAnswer(resp.data.text);
      return data.text;
    }
    return resp.data.text;
  }
}
