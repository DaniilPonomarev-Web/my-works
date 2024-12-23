import { Module } from '@nestjs/common';
import { ChatGptAiService } from './chat-gpt-ai.service';

@Module({
  controllers: [],
  providers: [ChatGptAiService],
  exports: [ChatGptAiService],
})
export class ChatGptAiModule {}
