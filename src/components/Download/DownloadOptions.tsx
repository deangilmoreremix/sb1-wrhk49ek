import React from 'react';
import { Settings } from 'lucide-react';
import { cn } from '../../utils/cn';

interface DownloadOptionsProps {
  onOptionsChange: (options: {
    codec: string;
    crf: number;
    format: string;
  }) => void;
  className?: string;
}

export const DownloadOptions: React.FC<DownloadOptionsProps> = ({
  onOptionsChange,
  className
}) => {
  return (
    <div className={cn("space-y-4", className)}>
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium">Download Options</h3>
        <Settings className="w-4 h-4 text-gray-500" />
      </div>

      <div className="space-y-3">
        <div>
          <label className="block text-sm text-gray-700 mb-1">Format</label>
          <select
            onChange={(e) => onOptionsChange({
              codec: 'h264',
              crf: 23,
              format: e.target.value
            })}
            className="w-full rounded-lg border-gray-300"
            defaultValue="mp4"
          >
            <option value="mp4">MP4</option>
            <option value="webm">WebM</option>
            <option value="mov">MOV</option>
          </select>
        </div>

        <div>
          <label className="block text-sm text-gray-700 mb-1">Quality</label>
          <select
            onChange={(e) => onOptionsChange({
              codec: 'h264',
              crf: parseInt(e.target.value),
              format: 'mp4'
            })}
            className="w-full rounded-lg border-gray-300"
            defaultValue="23"
          >
            <option value="18">High (Larger file)</option>
            <option value="23">Medium</option>
            <option value="28">Low (Smaller file)</option>
          </select>
        </div>
      </div>
    </div>
  );
};