

export type Result<T> = {
  success: true;
  data: T;
} | {
  success: false;
  error: string;
};

export type ContactFormData = {
  name: string;
  email: string;
  message: string;
};