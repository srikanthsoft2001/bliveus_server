// src/chatbot/chatbot.service.ts
import { Injectable } from '@nestjs/common';
@Injectable()
export class ChatbotService {
  getReply(message: string): string {
    const lower = message.toLowerCase();

    if (lower.includes('return') || lower.includes('refund')) {
      return '🛍️ You can return products within 7 days of delivery. Refunds are processed within 3-5 business days.';
    }

    if (lower.includes('delivery') || lower.includes('shipping')) {
      return '📦 We usually deliver within 3 to 5 working days. You will receive a tracking link once your order is shipped.';
    }

    if (lower.includes('cancel')) {
      return '❌ Orders can be canceled before they are shipped. Please go to "My Orders" > "Cancel".';
    }

    if (lower.includes('price')) {
      return '💰 Please mention the product name so I can help you with the price.';
    }

    if (lower.includes('offer') || lower.includes('discount') || lower.includes('coupon')) {
      return '🎁 Great news! We have discounts running every weekend. Use code **SAVE10** for 10% off.';
    }

    if (lower.includes('payment')) {
      return '💳 We accept UPI, Netbanking, Credit/Debit Cards, and Cash on Delivery.';
    }

    if (lower.includes('track')) {
      return '📍 You can track your order in the "My Orders" section once it is shipped.';
    }

    if (lower.includes('product') || lower.includes('available')) {
      return '🔍 Please specify the product name to check availability.';
    }

    return "🤖 I'm here to help you with product info, returns, delivery, and more. Please ask your question.";
  }
}
