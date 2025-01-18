import api from './api';

export interface UploadImgReq {
  hand_shape: number[];
  file: File;
  user_id: number;
}

export interface UploadImgRes {
  message?: string;
  file_path?: string;
  task_id?: string;
  detail?: string;
}

export const fetchUploadImg = async (req: UploadImgReq) => {
  const { hand_shape, file, user_id } = req;
  const formData = new FormData();

  // formData는 문자열과 파일만 허용하기 때문에 문자열로 변환
  formData.append('hand_shape', JSON.stringify(hand_shape));
  formData.append('file', file);
  formData.append('user_id', user_id.toString());

  try {
    const response = await api.post<UploadImgRes>(
      '/lock/upload-image',
      formData,
      {
        headers: { 'Content-Type': 'multipart/form-data' },
      },
    );
    return response.data;
  } catch (error) {
    Promise.reject(error);
  }
};
