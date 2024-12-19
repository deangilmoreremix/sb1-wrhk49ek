import { FFmpeg } from '@ffmpeg/ffmpeg';
import { fetchFile } from '@ffmpeg/util';
import { toBlobURL } from '@ffmpeg/util';

interface RenderOptions {
  codec?: string;
  crf?: number;
  format?: string;
  preset?: string;
  tune?: string;
  audioCodec?: string;
  audioBitrate?: number;
  fps?: number;
  pixelFormat?: string;
  onProgress?: (progress: number) => void;
}

export const renderAndDownloadVideo = async (
  videoBlob: Blob,
  options: RenderOptions = {}
): Promise<void> => {
  const {
    codec = 'h264',
    crf = 23,
    format = 'mp4',
    preset = 'medium',
    tune = 'film',
    audioCodec = 'aac',
    audioBitrate = 128,
    fps = 30,
    pixelFormat = 'yuv420p',
    onProgress
  } = options;

  try {
    const ffmpeg = new FFmpeg();
    
    // Load FFmpeg with proper core URL
    const baseURL = 'https://unpkg.com/@ffmpeg/core@0.12.6/dist/umd';
    await ffmpeg.load({
      coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, 'text/javascript'),
      wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, 'application/wasm')
    });

    // Set up progress handler
    if (onProgress) {
      ffmpeg.on('progress', ({ progress }) => {
        onProgress(Math.round(progress * 100));
      });
    }

    // Write input file
    await ffmpeg.writeFile('input.webm', await fetchFile(videoBlob));

    // Build FFmpeg command
    const args = [
      '-i', 'input.webm',
      '-c:v', codec,
      '-preset', preset,
      '-tune', tune,
      '-crf', crf.toString(),
      '-r', fps.toString(),
      '-pix_fmt', pixelFormat,
      '-c:a', audioCodec,
      '-b:a', `${audioBitrate}k`,
      '-movflags', '+faststart',
      `output.${format}`
    ];

    // Process video
    await ffmpeg.exec(args);

    // Read output file
    const data = await ffmpeg.readFile(`output.${format}`);
    const outputBlob = new Blob([data], { type: `video/${format}` });

    // Trigger download
    const url = URL.createObjectURL(outputBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `recorded-video.${format}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Error processing video:', error);
    throw new Error('Failed to process and download video');
  }
};