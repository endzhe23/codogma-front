import { axiosInstance } from '@/helpers/axiosInstance';

export const uploadImage = async (formData: FormData): Promise<string> => {
  const response = await axiosInstance.post('/images/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return `${process.env.NEXT_PUBLIC_BASE_URL}${response.data}`;
};
