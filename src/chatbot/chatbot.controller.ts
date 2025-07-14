// src/chatbot/chatbot.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { ChatbotService } from './chatbot.service';

@Controller('chatbot')
export class ChatbotController {
  constructor(private readonly chatbotService: ChatbotService) {}

  @Post('message')
  handleMessage(@Body('message') message: string) {
    const reply = this.chatbotService.getReply(message); // ✅ No await
    return { reply };
  }
}
