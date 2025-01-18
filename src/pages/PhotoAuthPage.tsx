import React, { useState } from 'react';
import Logo from '../components/Logo';
import { fetchUploadImg, UploadImgReq } from '../api/uploadImage';

const PhotoAuthPage = () => {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (files && files[0]) {
      setFile(files[0]);
    }
  };

  // 연동 확인 안됨
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      return;
    }
    const uploadImage: UploadImgReq = {
      hand_shape: [1, 1, 1, 1, 1],
      file: file,
      user_id: 1,
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
        <form onSubmit={handleSubmit}>
          <label
            htmlFor='image'
            className='flex w-[300px] h-[400px] bg-[#D1D5DB] rounded-md cursor-pointer'
          ></label>
          <input
            id='image'
            type='file'
            accept='image/*'
            className='hidden'
            onChange={handleFileChange}
          />
          <input
            type='submit'
            className='bg-white rounded-3xl w-24 h-12 self-center mt-auto'
            style={{
              boxShadow:
                '0px 2px 8px 0px rgba(40, 41, 61, 0.08), 0px 20px 32px 0px rgba(96, 97, 112, 0.24)',
            }}
          />
        </form>
      </div>
    </div>
  );
};

export default PhotoAuthPage;
