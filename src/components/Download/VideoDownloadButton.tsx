import React, { useState } from 'react';
import { Download, Loader } from 'lucide-react';
import { renderAndDownloadVideo } from '../../utils/download';
import { cn } from '../../utils/cn';

interface VideoDownloadButtonProps {
  videoBlob: Blob;
  className?: string;
  onError?: (error: Error) => void;
}

export const VideoDownloadButton: React.FC<VideoDownloadButtonProps> = ({
  videoBlob,
  className,
  onError
}) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleDownload = async () => {
    setIsProcessing(true);
    setProgress(0);
    try {
      await renderAndDownloadVideo(videoBlob, {
        codec: 'h264',
        crf: 23,
        format: 'mp4',
        onProgress: setProgress
      });
    } catch (error) {
      console.error('Download failed:', error);
      onError?.(error as Error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <button
      onClick={handleDownload}
      disabled={isProcessing}
      className={cn(
        "flex items-center space-x-2 px-4 py-2 bg-[#E44E51] text-white rounded-lg",
        "hover:bg-[#D43B3E] disabled:opacity-50 shadow-lg hover:shadow-[#E44E51]/25",
        "transition-all duration-200",
        className
      )}
    >
      {isProcessing ? (
        <>
          <Loader className="w-4 h-4 animate-spin" />
          <span>Processing... {progress}%</span>
        </>
      ) : (
        <>
          <Download className="w-4 h-4" />
          <span>Download Video</span>
        </>
      )}
    </button>
  );
};