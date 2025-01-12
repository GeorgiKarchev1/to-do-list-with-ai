import { useState } from 'react';
import { AudioRecorder } from '../lib/audioRecorder';
import { AIService } from '../lib/api';

export const useVoiceRecorder = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [events, setEvents] = useState<any[]>([]);
  const [recommendations, setRecommendations] = useState<any[]>([]);

  const recorder = new AudioRecorder();
  const aiService = new AIService(import.meta.env.VITE_OPENAI_API_KEY!);

  const startRecording = async () => {
    try {
      await recorder.startRecording();
      setIsRecording(true);
    } catch (error) {
      console.error('Failed to start recording:', error);
    }
  };

  const stopRecording = async () => {
    try {
      const audioBlob = await recorder.stopRecording();
      setIsRecording(false);

      // Транскрибиране
      const text = await aiService.transcribeAudio(audioBlob);
      setTranscript(text);

      // Анализ и създаване на събития
      const analyzedEvents = await aiService.analyzeText(text);
      setEvents(prev => [...prev, ...analyzedEvents]);

      // Получаване на препоръки
      const newRecommendations = await aiService.getRecommendations(events);
      setRecommendations(newRecommendations);
    } catch (error) {
      console.error('Failed to process recording:', error);
    }
  };

  return {
    isRecording,
    transcript,
    events,
    recommendations,
    startRecording,
    stopRecording
  };
}; 