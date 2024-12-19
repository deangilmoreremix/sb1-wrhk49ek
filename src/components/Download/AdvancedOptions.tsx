import React from 'react';
import { Settings, Sliders, Video, Music, Gauge, Zap } from 'lucide-react';
import { cn } from '../../utils/cn';

interface AdvancedOptionsProps {
  onOptionsChange: (options: {
    preset: string;
    tune: string;
    audioCodec: string;
    audioBitrate: number;
    fps: number;
    pixelFormat: string;
  }) => void;
  className?: string;
}

export const AdvancedOptions: React.FC<AdvancedOptionsProps> = ({
  onOptionsChange,
  className
}) => {
  return (
    <div className={cn("space-y-6", className)}>
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium flex items-center space-x-2">
          <Settings className="w-4 h-4" />
          <span>Advanced Settings</span>
        </h3>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* Video Settings */}
        <div className="space-y-4">
          <h4 className="text-sm font-medium flex items-center space-x-2">
            <Video className="w-4 h-4" />
            <span>Video Settings</span>
          </h4>
          
          <div>
            <label className="block text-sm text-gray-700 mb-1">Encoding Preset</label>
            <select
              onChange={(e) => onOptionsChange({
                preset: e.target.value,
                tune: 'film',
                audioCodec: 'aac',
                audioBitrate: 128,
                fps: 30,
                pixelFormat: 'yuv420p'
              })}
              className="w-full rounded-lg border-gray-300"
              defaultValue="medium"
            >
              <option value="ultrafast">Ultrafast (Lowest Quality)</option>
              <option value="superfast">Superfast</option>
              <option value="veryfast">Very Fast</option>
              <option value="faster">Faster</option>
              <option value="fast">Fast</option>
              <option value="medium">Medium (Balanced)</option>
              <option value="slow">Slow</option>
              <option value="slower">Slower</option>
              <option value="veryslow">Very Slow (Best Quality)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-1">Tuning</label>
            <select
              onChange={(e) => onOptionsChange({
                preset: 'medium',
                tune: e.target.value,
                audioCodec: 'aac',
                audioBitrate: 128,
                fps: 30,
                pixelFormat: 'yuv420p'
              })}
              className="w-full rounded-lg border-gray-300"
              defaultValue="film"
            >
              <option value="film">Film</option>
              <option value="animation">Animation</option>
              <option value="grain">Grain</option>
              <option value="stillimage">Still Image</option>
              <option value="fastdecode">Fast Decode</option>
              <option value="zerolatency">Zero Latency</option>
            </select>
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-1">Frame Rate</label>
            <select
              onChange={(e) => onOptionsChange({
                preset: 'medium',
                tune: 'film',
                audioCodec: 'aac',
                audioBitrate: 128,
                fps: parseInt(e.target.value),
                pixelFormat: 'yuv420p'
              })}
              className="w-full rounded-lg border-gray-300"
              defaultValue="30"
            >
              <option value="60">60 FPS</option>
              <option value="30">30 FPS</option>
              <option value="24">24 FPS</option>
            </select>
          </div>
        </div>

        {/* Audio Settings */}
        <div className="space-y-4">
          <h4 className="text-sm font-medium flex items-center space-x-2">
            <Music className="w-4 h-4" />
            <span>Audio Settings</span>
          </h4>
          
          <div>
            <label className="block text-sm text-gray-700 mb-1">Audio Codec</label>
            <select
              onChange={(e) => onOptionsChange({
                preset: 'medium',
                tune: 'film',
                audioCodec: e.target.value,
                audioBitrate: 128,
                fps: 30,
                pixelFormat: 'yuv420p'
              })}
              className="w-full rounded-lg border-gray-300"
              defaultValue="aac"
            >
              <option value="aac">AAC (Recommended)</option>
              <option value="libmp3lame">MP3</option>
              <option value="libvorbis">Vorbis</option>
              <option value="libopus">Opus</option>
            </select>
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-1">Audio Bitrate</label>
            <select
              onChange={(e) => onOptionsChange({
                preset: 'medium',
                tune: 'film',
                audioCodec: 'aac',
                audioBitrate: parseInt(e.target.value),
                fps: 30,
                pixelFormat: 'yuv420p'
              })}
              className="w-full rounded-lg border-gray-300"
              defaultValue="128"
            >
              <option value="64">64 kbps</option>
              <option value="96">96 kbps</option>
              <option value="128">128 kbps</option>
              <option value="192">192 kbps</option>
              <option value="256">256 kbps</option>
              <option value="320">320 kbps</option>
            </select>
          </div>
        </div>
      </div>

      {/* Advanced Video Options */}
      <div className="space-y-4 pt-4 border-t">
        <h4 className="text-sm font-medium flex items-center space-x-2">
          <Sliders className="w-4 h-4" />
          <span>Advanced Video Options</span>
        </h4>

        <div>
          <label className="block text-sm text-gray-700 mb-1">Pixel Format</label>
          <select
            onChange={(e) => onOptionsChange({
              preset: 'medium',
              tune: 'film',
              audioCodec: 'aac',
              audioBitrate: 128,
              fps: 30,
              pixelFormat: e.target.value
            })}
            className="w-full rounded-lg border-gray-300"
            defaultValue="yuv420p"
          >
            <option value="yuv420p">YUV420P (Most Compatible)</option>
            <option value="yuv422p">YUV422P (Better Quality)</option>
            <option value="yuv444p">YUV444P (Best Quality)</option>
          </select>
        </div>
      </div>

      {/* Performance Tips */}
      <div className="p-4 bg-blue-50 rounded-lg">
        <h5 className="text-sm font-medium text-blue-900 mb-2 flex items-center">
          <Gauge className="w-4 h-4 mr-2" />
          Performance Tips
        </h5>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Faster presets = larger file size, lower CPU usage</li>
          <li>• Slower presets = smaller file size, higher CPU usage</li>
          <li>• YUV420P is recommended for maximum compatibility</li>
          <li>• AAC audio codec provides the best quality/size ratio</li>
        </ul>
      </div>
    </div>
  );
};