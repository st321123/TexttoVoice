import React, { useState, useEffect } from 'react';
import { useSpeechSynthesis } from 'react-speech-kit';

const TextToSpeech = () => {
  const [text, setText] = useState('');
  const { speak, voices, cancel, speaking, paused } = useSpeechSynthesis();
  const [selectedVoice, setSelectedVoice] = useState(null);

  // Fetch voices and select Google Hindi Voice
  useEffect(() => {
    // Try to find the Google Hindi voice (if available)
    const googleHindiVoice = voices.find(voice => voice.name === 'Google हिन्दी' && voice.lang === 'hi-IN');
    if (googleHindiVoice) {
      setSelectedVoice(googleHindiVoice);
    } else {
      setSelectedVoice(null); // Handle case if voice is not available
    }
  }, [voices]);

  const handleSpeak = () => {
    if (!text.trim()) return;

    speak({
      text,
      voice: selectedVoice, // Use the Google Hindi voice
      lang: 'hi-IN', // Language code for Hindi
      rate: 1, // Adjust speed
      pitch: 1, // Adjust pitch
    });
  };

  return (
    <div className="tts-container">
      <h1 className="text-2xl font-bold mb-4">Text to Speech (Google Hindi Voice)</h1>

      <textarea
        className="border rounded p-4 w-full min-h-[200px] resize-y" // Increased padding, full width, min height for bigger size and vertical resize
        rows="4"
        placeholder="Enter text here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      ></textarea>

      {/* Dropdown to select voice */}
      <div className="mt-4">
        <label className="block mb-2">Select Voice:</label>
        <select
          className="border rounded p-2 w-full"
          value={selectedVoice ? selectedVoice.name : ''}
          onChange={(e) => {
            const selected = voices.find(voice => voice.name === e.target.value);
            setSelectedVoice(selected);
          }}
        >
          {voices
            .filter((voice) => voice.lang === 'hi-IN') // Filter voices by Hindi language
            .map((voice, index) => (
              <option key={index} value={voice.name}>
                {voice.name} ({voice.lang})
              </option>
            ))}
        </select>
      </div>

      <button
        className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
        onClick={handleSpeak}
        disabled={speaking || paused}
      >
        {speaking ? 'Speaking...' : 'Speak'}
      </button>
      {speaking && <button onClick={cancel} className="bg-red-500 text-white px-4 py-2 rounded mt-2">Stop</button>}
    </div>
  );
};

export default TextToSpeech;
