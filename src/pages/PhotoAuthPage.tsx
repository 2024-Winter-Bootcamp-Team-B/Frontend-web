import React, { useState } from 'react';
import Logo from '../components/Logo';
import { fetchUploadImg, UploadImgReq } from '../api/uploadImage';
import useAuthStore from '../store/authStore';
import photoButton from '../assets/photoButton.svg';

const PhotoAuthPage = () => {
  const [file, setFile] = useState<File | null>(null);
  const { user_id } = useAuthStore();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (files && files[0]) {
      setFile(files[0]);
    }
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!file) {
      return;
    }
    if (!user_id) {
      return;
    }
    const uploadImage: UploadImgReq = {
      hand_shape: [1, 1, 1, 1, 1],
      file: file,
      user_id,
    };
    fetchUploadImg(uploadImage)
      .then((response) => {
        if (response) {
          console.log(response);
        }
      })
      .catch((error) => console.error(error));
  };

  return (
    <div className='w-full flex flex-col items-center px-16 py-8'>
      <Logo />
      <p>예시 사진대로 사진을 찍어 업로드하세요</p>
      <div className='flex gap-3'>
        <div className='w-[300px] h-[400px] bg-[#D1D5DB] rounded-md'></div>
        <div className='w-[300px] h-[400px] bg-[#D1D5DB] rounded-md'>
          <label
            htmlFor='image'
            className='h-full flex justify-center items-center cursor-pointer'
          >
            {file ? (
              <img
                src={URL.createObjectURL(file)}
                className='w-full h-full object-cover rounded-md'
              />
            ) : (
              <img src={photoButton} className='w-16 h-16' />
            )}
          </label>
          <input
            id='image'
            type='file'
            accept='image/*'
            className='hidden'
            onChange={handleFileChange}
          />
        </div>
      </div>
      <button
        onClick={handleSubmit}
        className='bg-white rounded-3xl w-24 h-12 self-center'
        style={{
          boxShadow:
            '0px 2px 8px 0px rgba(40, 41, 61, 0.08), 0px 20px 32px 0px rgba(96, 97, 112, 0.24)',
        }}
      >
        제출
      </button>
    </div>
  );
};

export default PhotoAuthPage;
