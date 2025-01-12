import axios from 'axios';

export class AIService {
  private apiKey: string;
  
  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async transcribeAudio(audioBlob: Blob): Promise<string> {
    const formData = new FormData();
    formData.append('file', audioBlob);
    formData.append('model', 'whisper-1');

    const response = await axios.post('https://api.openai.com/v1/audio/transcriptions', formData, {
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data.text;
  }

  async analyzeText(text: string): Promise<any> {
    const response = await axios.post('https://api.openai.com/v1/chat/completions', {
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are a personal assistant that helps organize tasks and events. Extract events and tasks from the user's input and format them in a structured way."
        },
        {
          role: "user",
          content: text
        }
      ]
    }, {
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
      },
    });

    return response.data.choices[0].message.content;
  }

  async getRecommendations(userEvents: any[]): Promise<any> {
    const response = await axios.post('https://api.openai.com/v1/chat/completions', {
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "Based on the user's previous events and tasks, suggest relevant new activities and optimizations."
        },
        {
          role: "user",
          content: JSON.stringify(userEvents)
        }
      ]
    }, {
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
      },
    });

    return response.data.choices[0].message.content;
  }
} 