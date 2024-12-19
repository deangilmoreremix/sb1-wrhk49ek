import React, { useState, useCallback, useRef } from 'react';
import { 
  Volume2, VolumeX, Settings, Play, Pause, Save, 
  RotateCcw, Filter, Sliders, Activity, Music,
  Brain, Wand2, Sparkles, Gauge, Clock, Layers,
  AlertCircle, ChevronDown, ChevronUp, Eye, Check,
  Mic, MessageCircle, Scissors, Plus, X
} from 'lucide-react';
import { Tooltip } from '../ui/Tooltip';
import { Switch } from '../ui/Switch';
import { motion, AnimatePresence } from 'framer-motion';
import * as tf from '@tensorflow/tfjs';
import '@tensorflow/tfjs-backend-webgl';

export const SilentRemoval: React.FC = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [settings, setSettings] = useState({
    threshold: -40,
    minDuration: 0.5,
    padding: 0.1,
    preserveMusic: true,
    autoAnalyze: true,
    smartDetection: true,
    batchProcessing: false,
    removeFillers: true,
    musicSensitivity: 0.8
  });
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [detectedSegments, setDetectedSegments] = useState<{
    start: number;
    end: number;
    type: 'silence' | 'filler' | 'music';
  }[]>([]);

  const audioContext = useRef<AudioContext>();
  const audioAnalyzer = useRef<AnalyserNode>();

  // Initialize audio analyzer
  const initAudioAnalyzer = () => {
    if (!audioContext.current) {
      audioContext.current = new AudioContext();
      audioAnalyzer.current = audioContext.current.createAnalyser();
      audioAnalyzer.current.fftSize = 2048;
    }
  };

  // Detect silence using Web Audio API
  const detectSilence = (audioData: Float32Array): boolean => {
    const rms = Math.sqrt(audioData.reduce((sum, val) => sum + val * val, 0) / audioData.length);
    const db = 20 * Math.log10(rms);
    return db < settings.threshold;
  };

  // Detect music using frequency analysis
  const detectMusic = (audioData: Float32Array): boolean => {
    if (!audioAnalyzer.current) return false;
    
    const frequencyData = new Uint8Array(audioAnalyzer.current.frequencyBinCount);
    audioAnalyzer.current.getByteFrequencyData(frequencyData);
    
    // Check for consistent frequency patterns typical in music
    const averageEnergy = frequencyData.reduce((sum, val) => sum + val, 0) / frequencyData.length;
    return averageEnergy > settings.musicSensitivity * 255;
  };

  // Detect filler words using simple pattern matching
  const detectFillerWords = (audioData: Float32Array): boolean => {
    // Simplified pattern matching for demonstration
    // In a real implementation, this would use a trained ML model
    const energyPattern = audioData.reduce((acc, val, i) => {
      if (i > 0) {
        acc.push(Math.abs(val - audioData[i - 1]));
      }
      return acc;
    }, [] as number[]);

    const avgEnergy = energyPattern.reduce((sum, val) => sum + val, 0) / energyPattern.length;
    return avgEnergy > 0.1 && avgEnergy < 0.3; // Typical range for speech fillers
  };

  const handleProcess = async () => {
    setIsProcessing(true);
    try {
      initAudioAnalyzer();

      // Process in chunks for better performance
      const chunkSize = 2048;
      const chunks = Math.ceil(100 / chunkSize);
      const newSegments = [];

      for (let i = 0; i < chunks; i++) {
        setProgress((i / chunks) * 100);

        // Simulate processing each chunk
        await new Promise(resolve => setTimeout(resolve, 100));

        // Add detected segments (mock data for demonstration)
        if (i % 3 === 0) {
          newSegments.push({
            start: i * 0.5,
            end: (i + 1) * 0.5,
            type: Math.random() > 0.5 ? 'silence' : Math.random() > 0.5 ? 'music' : 'filler'
          });
        }
      }

      setDetectedSegments(newSegments);
    } catch (error) {
      console.error('Processing failed:', error);
    } finally {
      setIsProcessing(false);
      setProgress(0);
    }
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Silent Removal</h3>
        <div className="flex space-x-2">
          <Tooltip content="Configure advanced settings for silence detection and removal">
            <button
              onClick={() => setShowAdvanced(!showAdvanced)}
              className={`p-2 rounded-lg ${
                showAdvanced ? 'bg-[#E44E51]/10 text-[#E44E51]' : 'hover:bg-gray-100'
              }`}
            >
              <Settings className="w-5 h-5" />
            </button>
          </Tooltip>
        </div>
      </div>

      {/* Main Settings */}
      <div className="space-y-4 mb-6">
        <div>
          <Tooltip content="Set how quiet audio needs to be to be considered silence. Lower values detect more silence.">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Silence Threshold (dB)
            </label>
          </Tooltip>
          <input
            type="range"
            min="-60"
            max="-20"
            value={settings.threshold}
            onChange={(e) => setSettings({ ...settings, threshold: parseInt(e.target.value) })}
            className="w-full accent-[#E44E51]"
          />
          <div className="flex justify-between text-sm text-gray-500">
            <span>Quieter</span>
            <span>{settings.threshold} dB</span>
            <span>Louder</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Tooltip content="Minimum duration of silence to be removed. Shorter silences will be kept.">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Minimum Duration (s)
              </label>
            </Tooltip>
            <input
              type="number"
              min="0.1"
              max="5"
              step="0.1"
              value={settings.minDuration}
              onChange={(e) => setSettings({ ...settings, minDuration: parseFloat(e.target.value) })}
              className="w-full rounded-lg border-gray-300"
            />
          </div>
          <div>
            <Tooltip content="Add padding before and after removed segments to prevent abrupt cuts">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Padding (s)
              </label>
            </Tooltip>
            <input
              type="number"
              min="0"
              max="1"
              step="0.1"
              value={settings.padding}
              onChange={(e) => setSettings({ ...settings, padding: parseFloat(e.target.value) })}
              className="w-full rounded-lg border-gray-300"
            />
          </div>
        </div>

        <div className="flex items-center justify-between">
          <Tooltip content="Detect and preserve music sections even if they contain quiet parts">
            <label className="flex items-center space-x-2">
              <span className="text-sm font-medium text-gray-700">Preserve Music</span>
              <Switch
                checked={settings.preserveMusic}
                onChange={(checked) => setSettings({ ...settings, preserveMusic: checked })}
              />
            </label>
          </Tooltip>
          <Tooltip content="Automatically analyze audio for silence when video is loaded">
            <label className="flex items-center space-x-2">
              <span className="text-sm font-medium text-gray-700">Auto Analyze</span>
              <Switch
                checked={settings.autoAnalyze}
                onChange={(checked) => setSettings({ ...settings, autoAnalyze: checked })}
              />
            </label>
          </Tooltip>
        </div>
      </div>

      {/* Advanced Settings */}
      <AnimatePresence>
        {showAdvanced && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="space-y-4 mb-6 overflow-hidden"
          >
            <div className="p-4 bg-gray-50 rounded-lg space-y-4">
              <div className="flex items-center justify-between">
                <Tooltip content="Use AI to improve silence detection accuracy">
                  <label className="flex items-center space-x-2">
                    <span className="text-sm font-medium text-gray-700">Smart Detection</span>
                    <Switch
                      checked={settings.smartDetection}
                      onChange={(checked) => setSettings({ ...settings, smartDetection: checked })}
                    />
                  </label>
                </Tooltip>
                <Tooltip content="Process multiple segments simultaneously for faster results">
                  <label className="flex items-center space-x-2">
                    <span className="text-sm font-medium text-gray-700">Batch Processing</span>
                    <Switch
                      checked={settings.batchProcessing}
                      onChange={(checked) => setSettings({ ...settings, batchProcessing: checked })}
                    />
                  </label>
                </Tooltip>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Detection Features
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <Tooltip content="Use AI to detect and remove filler words (umms, ahhs)">
                    <button 
                      onClick={() => setSettings(s => ({ ...s, removeFillers: !s.removeFillers }))}
                      className={`p-2 ${
                        settings.removeFillers 
                          ? 'bg-[#E44E51]/10 text-[#E44E51]' 
                          : 'bg-gray-100 text-gray-700'
                      } rounded-lg flex items-center space-x-2`}
                    >
                      <Brain className="w-4 h-4" />
                      <span className="text-sm">Speech Enhancement</span>
                    </button>
                  </Tooltip>
                  <Tooltip content="Detect music sections to preserve them during silence removal">
                    <button 
                      onClick={() => setSettings(s => ({ ...s, preserveMusic: !s.preserveMusic }))}
                      className={`p-2 ${
                        settings.preserveMusic 
                          ? 'bg-[#E44E51]/10 text-[#E44E51]' 
                          : 'bg-gray-100 text-gray-700'
                      } rounded-lg flex items-center space-x-2`}
                    >
                      <Music className="w-4 h-4" />
                      <span className="text-sm">Music Detection</span>
                    </button>
                  </Tooltip>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Detected Segments */}
      {detectedSegments.length > 0 && (
        <div className="mb-6">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Detected Segments</h4>
          <div className="space-y-2">
            {detectedSegments.map((segment, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-2 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center space-x-2">
                  {segment.type === 'silence' && <VolumeX className="w-4 h-4 text-gray-500" />}
                  {segment.type === 'music' && <Music className="w-4 h-4 text-blue-500" />}
                  {segment.type === 'filler' && <MessageCircle className="w-4 h-4 text-green-500" />}
                  <span className="text-sm">
                    {formatTime(segment.start)} - {formatTime(segment.end)}
                  </span>
                  <span className="text-xs text-gray-500 capitalize">({segment.type})</span>
                </div>
                <button className="p-1 hover:bg-gray-200 rounded">
                  <X className="w-4 h-4 text-gray-500" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Process Button */}
      <div className="flex justify-end">
        <Tooltip content="Analyze and remove silent segments from the video">
          <button
            onClick={handleProcess}
            disabled={isProcessing}
            className="px-4 py-2 bg-[#E44E51] text-white rounded-lg hover:bg-[#D43B3E]
              disabled:opacity-50 disabled:cursor-not-allowed shadow-lg 
              hover:shadow-[#E44E51]/25 flex items-center space-x-2"
          >
            {isProcessing ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Processing... {progress}%</span>
              </>
            ) : (
              <>
                <Scissors className="w-4 h-4" />
                <span>Remove Silence</span>
              </>
            )}
          </button>
        </Tooltip>
      </div>
    </div>
  );
};