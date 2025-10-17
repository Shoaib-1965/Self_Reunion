
export enum Page {
  WELCOME = 'WELCOME',
  UPLOAD = 'UPLOAD',
  PROCESSING = 'PROCESSING',
  RESULT = 'RESULT',
  GALLERY = 'GALLERY',
  PROFILE = 'PROFILE',
}

export interface GeneratedImage {
  id: string;
  src: string;
  timestamp: number;
}
