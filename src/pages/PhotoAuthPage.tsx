import React, { useState, useEffect } from 'react';
import Logo from '../components/Logo';
import { fetchUploadImg, UploadImgReq } from '../api/uploadImage';
import useAuthStore from '../store/authStore';
import photoButton from '../assets/photoButton.svg';
import { useNavigate } from 'react-router-dom';

const PhotoAuthPage = () => {
  const [file, setFile] = useState<File | null>(null);
  const { user_id } = useAuthStore();
  const [exampleImage, setExampleImage] = useState<string>(''); // 랜덤 이미지 상태
  const navigate = useNavigate();

  // 이진수 기반 이미지 경로 배열 생성
  const exampleImages = Array.from({ length: 32 }, (_, i) => {
    const binaryString = i.toString(2).padStart(5, '0'); // 5자리 이진수 생성
    return `/assets/${binaryString}.png`;
  });

  // 컴포넌트 마운트 시 랜덤 이미지 선택
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * exampleImages.length);
    setExampleImage(exampleImages[randomIndex]);
  }, []);

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

    // exampleImage에서 handShape 배열 생성
    const binaryString = exampleImage.split('/').pop()?.split('.')[0]; // "00001"
    const handShapeArray = binaryString
      ? binaryString.split('').map(Number)
      : []; // [0, 0, 0, 0, 1]

    const uploadImage: UploadImgReq = {
      hand_shape: handShapeArray, // handShape 배열 추가
      file: file,
      user_id,
    };

    fetchUploadImg(uploadImage)
      .then((response) => {
        if (response?.task_id) {
          // 성공 시 밈 페이지 보여주기
          navigate('/meme');
        } else {
          // 실패 시 alert
          alert('인증 실패');
        }
      })
      .catch((error) => console.error(error));
  };

  return (
    <div className='w-full flex flex-col items-center px-16 py-8 gap-8'>
      <Logo />
      <p>예시 사진대로 사진을 찍어 업로드하세요</p>
      <div className='flex gap-8'>
        <div className='w-[350px] h-[450px] bg-[#D1D5DB] rounded-md flex flex-col gap-6 justify-center items-center'>
          {exampleImage && (
            <img
              src={exampleImage}
              className='w-[60%] h-[60%] object-contain'
            />
          )}
          <p>예시 사진</p>
        </div>
        <div className='w-[350px] h-[450px] bg-[#D1D5DB] rounded-md'>
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
