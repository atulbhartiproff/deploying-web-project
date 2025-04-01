
// This file imports components from Shadcn UI (card, button, input)
// and uses custom components from the project

import React, { useState, useRef, useEffect } from 'react';
import { Send, User, Bot, Sparkles, Brain } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import './Chat.css';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: 'Hello! I\'m your budget assistant. How can I help you manage your finances today?',
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [conversationContext, setConversationContext] = useState<string[]>([]);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  const handleSendMessage = () => {
    if (input.trim() === '') return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    
    // Update conversation context for more coherent responses
    setConversationContext(prev => [...prev, input]);
    
    setInput('');
    setIsThinking(true);
    
    // Simulate bot response after delay
    setTimeout(() => {
      const botResponse = generateBotResponse(input, conversationContext);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: botResponse,
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botMessage]);
      setIsThinking(false);
    }, 1500);
  };
  
  const generateBotResponse = (userInput: string, context: string[]): string => {
    const userInputLower = userInput.toLowerCase();
    const contextHistory = context.join(' ').toLowerCase();
    
    // Check for greetings
    if (userInputLower.match(/^(hello|hi|hey|greetings|namaste)/)) {
      return 'Hello! I\'m your AI budget assistant. How can I help with your finances today?';
    }
    
    // Check for gratitude
    if (userInputLower.match(/(thank|thanks|thank you|thx)/)) {
      return 'You\'re welcome! I\'m here to help with any other financial questions you might have.';
    }
    
    // Check for asking about the bot itself
    if (userInputLower.match(/(who are you|what are you|tell me about yourself|how do you work|what can you do)/)) {
      return 'I\'m an AI budget assistant designed to help you manage your finances better. I can provide advice on budgeting, saving, investing, and general financial planning. While I\'m not a licensed financial advisor, I can offer general guidance based on common financial principles.';
    }
    
    // Budget-related queries
    if (userInputLower.includes('budget') || userInputLower.includes('budgeting')) {
      if (userInputLower.includes('create') || userInputLower.includes('make') || userInputLower.includes('start')) {
        return 'To create an effective budget, start by tracking all your income sources and categorizing your expenses. The 50/30/20 rule is a good starting point: 50% on needs, 30% on wants, and 20% on savings and debt repayment. In this app, you can add your transactions and categorize them to automatically track against your budget.';
      }
      
      if (userInputLower.includes('tips') || userInputLower.includes('advice') || userInputLower.includes('help')) {
        return 'Here are some budgeting tips:\n\n1. Track every expense, no matter how small\n2. Set realistic spending limits for each category\n3. Review your budget regularly and adjust as needed\n4. Use automatic transfers for savings\n5. Plan for irregular expenses\n6. Include a small "fun money" category to avoid budget fatigue';
      }
      
      return 'Budgeting is the foundation of financial health. It helps you understand your cash flow, prioritize spending, and achieve your financial goals. Would you like specific advice on creating a budget or tips to stick to one?';
    }
    
    // Saving-related queries
    if (userInputLower.includes('save') || userInputLower.includes('saving')) {
      if (userInputLower.includes('emergency fund') || userInputLower.includes('emergency savings')) {
        return 'An emergency fund is crucial! Aim to save 3-6 months of essential expenses in an easily accessible account. Start small if needed - even ₹1,000 per month adds up. Consider automating transfers to your emergency fund on payday so you don\'t have to think about it.';
      }
      
      if (userInputLower.includes('tips') || userInputLower.includes('how')) {
        return 'To boost your savings:\n\n1. Automate your savings first - pay yourself first\n2. Follow the 24-hour rule for non-essential purchases\n3. Try the 50/30/20 rule (50% needs, 30% wants, 20% savings)\n4. Look for recurring subscriptions you can eliminate\n5. Consider using separate accounts for different savings goals\n6. Try no-spend days or weeks as a challenge';
      }
      
      return 'Saving money is crucial for financial security and achieving your goals. I recommend starting with an emergency fund, then saving for specific goals like major purchases, retirement, or education. How much of your income are you currently able to save?';
    }
    
    // Investment-related queries
    if (userInputLower.includes('invest') || userInputLower.includes('investment') || userInputLower.includes('stock') || userInputLower.includes('mutual fund')) {
      if (userInputLower.includes('begin') || userInputLower.includes('start') || userInputLower.includes('how to')) {
        return 'To start investing in India:\n\n1. First, ensure you have an emergency fund and manageable debt\n2. Open a demat and trading account with a broker\n3. Get your KYC done\n4. Consider starting with index funds or ETFs\n5. For most beginners, SIPs (Systematic Investment Plans) in mutual funds are a good starting point\n6. Only invest money you won\'t need for at least 5 years\n\nRemember that all investments carry risk.';
      }
      
      if (userInputLower.includes('option') || userInputLower.includes('type')) {
        return 'Common investment options in India include:\n\n1. Equity/Stocks - Higher risk, potentially higher returns\n2. Mutual Funds - Professionally managed, diversified portfolios\n3. Fixed Deposits - Lower risk, guaranteed returns\n4. Public Provident Fund (PPF) - Government-backed, tax advantages\n5. Real Estate - Physical property investment\n6. Gold - Traditional value storage\n7. National Pension System (NPS) - Long-term retirement saving\n\nThe right mix depends on your goals, timeline, and risk tolerance.';
      }
      
      return 'Investing is how you grow your wealth over time. It\'s important to understand that different investments carry different levels of risk and potential return. Before investing, consider your financial goals, time horizon, and risk tolerance. Would you like to know about specific investment options in India?';
    }
    
    // Default responses with financial wisdom
    const financialWisdom = [
      'A budget is telling your money where to go instead of wondering where it went.',
      'Financial freedom isn\'t about being rich, it\'s about having options.',
      'The best time to start saving was 10 years ago. The second best time is now.',
      'It\'s not how much money you make, but how much money you keep.',
      'Don\'t save what is left after spending; spend what is left after saving.',
      'Beware of little expenses; a small leak will sink a great ship.',
      'An investment in knowledge pays the best interest.',
      'In investing, what is comfortable is rarely profitable.',
      'The stock market is a device for transferring money from the impatient to the patient.'
    ];
    
    return 'I\'m not sure I understand that query specifically. ' + 
      financialWisdom[Math.floor(Math.random() * financialWisdom.length)] + 
      '\n\nCan you try rephrasing your question about budgeting, saving, investing, or debt management?';
  };
  
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  return (
    <div className="chat-page">
      <h1 className="chat-title">AI Budget Assistant</h1>
      <div className="chat-description">
        <p>Ask me anything about personal finance, budgeting, saving, investing, or debt management. I can provide financial tips, explain concepts, and help you make better financial decisions.</p>
      </div>
      <div className="chatbot-container">
        <Card className="chatbot-card">
          <CardHeader className="chatbot-header">
            <CardTitle className="chatbot-title">
              <Sparkles className="chatbot-icon" size={20} />
              Budget Assistant
            </CardTitle>
          </CardHeader>
          <CardContent className="chatbot-content">
            <div className="chatbot-messages">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`chat-message ${message.sender === 'user' ? 'user-message' : 'bot-message'}`}
                >
                  <div className="message-avatar">
                    {message.sender === 'user' ? <User size={16} /> : <Bot size={16} />}
                  </div>
                  <div className="message-bubble">
                    <div className="message-content">{message.content}</div>
                    <div className="message-time">{formatTime(message.timestamp)}</div>
                  </div>
                </div>
              ))}
              {isThinking && (
                <div className="chat-message bot-message">
                  <div className="message-avatar">
                    <Brain size={16} />
                  </div>
                  <div className="message-bubble thinking">
                    <div className="thinking-dots">
                      <span className="dot"></span>
                      <span className="dot"></span>
                      <span className="dot"></span>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </CardContent>
          <CardFooter className="chatbot-footer">
            <div className="chat-input-container">
              <Input
                type="text"
                placeholder="Ask something about your budget..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleSendMessage();
                }}
                className="chat-input"
              />
              <Button 
                onClick={handleSendMessage} 
                className="send-button"
                disabled={input.trim() === '' || isThinking}
              >
                <Send size={16} />
              </Button>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Chat;
