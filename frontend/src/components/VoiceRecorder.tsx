import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface VoiceRecorderProps {
  onTaskCreated: (task: string) => void;
}

export default function VoiceRecorder({ onTaskCreated }: VoiceRecorderProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const audioChunks = useRef<Blob[]>([]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorder.current = new MediaRecorder(stream, {
        mimeType: 'audio/webm;codecs=opus'
      });
      audioChunks.current = [];

      mediaRecorder.current.ondataavailable = (event) => {
        audioChunks.current.push(event.data);
      };

      mediaRecorder.current.onstop = async () => {
        const audioBlob = new Blob(audioChunks.current, { type: 'audio/webm' });
        await processAudio(audioBlob);
      };

      mediaRecorder.current.start();
      setIsRecording(true);
    } catch (error) {
      console.error('Error accessing microphone:', error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorder.current && isRecording) {
      mediaRecorder.current.stop();
      setIsRecording(false);
      setIsProcessing(true);
    }
  };

  const processAudio = async (audioBlob: Blob) => {
    try {
      const formData = new FormData();
      formData.append('file', audioBlob, 'audio.webm');
      formData.append('model', 'whisper-1');

      console.log('Making request to OpenAI...');
      
      const response = await fetch('https://api.openai.com/v1/audio/transcriptions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_OPENAI_API_KEY.trim()}`
        },
        body: formData
      });

      console.log('OpenAI Response:', {
        status: response.status,
        statusText: response.statusText
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Full OpenAI Error:', errorText);
        throw new Error(`OpenAI API Error: ${response.status} - ${errorText}`);
      }

      const transcriptionData = await response.json();
      
      // Проверяваме дали имаме валиден текст
      if (!transcriptionData.text) {
        throw new Error('No transcription text received');
      }

      // Изпращаме текста към ChatGPT
      const eventsResponse = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [{
            role: "system",
            content: "Extract tasks and events from the following text and format them as a JSON array of objects with 'task' and 'date' properties. If no date is specified, use null for the date."
          }, {
            role: "user",
            content: transcriptionData.text
          }]
        })
      });

      if (!eventsResponse.ok) {
        throw new Error(`Events API error! status: ${eventsResponse.status}`);
      }

      const eventsData = await eventsResponse.json();
      const eventsContent = eventsData.choices[0].message.content;

      // Проверяваме дали отговорът е валиден JSON
      try {
        const events = JSON.parse(eventsContent);
        return events;
      } catch (parseError) {
        console.error('Failed to parse events JSON:', eventsContent);
        throw new Error('Invalid events format received');
      }
    } catch (error) {
      console.error('Detailed error:', error);
      throw error;
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={isRecording ? stopRecording : startRecording}
        className={`w-16 h-16 rounded-full flex items-center justify-center ${
          isRecording ? 'bg-red-500' : 'bg-blue-500'
        }`}
      >
        <motion.div
          animate={isRecording ? { scale: [1, 1.2, 1] } : {}}
          transition={{ repeat: Infinity, duration: 1 }}
        >
          <svg
            className="w-8 h-8 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
            />
          </svg>
        </motion.div>
      </motion.button>

      <AnimatePresence>
        {isProcessing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="mt-4 text-gray-400"
          >
            Processing your voice...
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 