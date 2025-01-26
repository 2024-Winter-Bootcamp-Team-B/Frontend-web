import React, { useState, useEffect } from 'react';
import Logo from '../components/Logo';
import { fetchUploadImg, UploadImgReq } from '../api/uploadImage';
import useAuthStore from '../store/authStore';
import photoButton from '../assets/photoButton.svg';
import { useNavigate } from 'react-router-dom';
import { fetchTaskId, TaskIdReq } from '../api/taskId';

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
        const task_id = response?.task_id;

        if (task_id) {
          const interval = setInterval(() => {
            const taskId: TaskIdReq = {
              task_id,
            };
            fetchTaskId(taskId)
              .then((response) => {
                if (response?.status === 'SUCCESS') {
                  clearInterval(interval); // 상태 확인 중지
                  if (response?.result?.match) {
                    navigate('/meme'); // 성공 처리
                  } else {
                    alert(response?.result?.message || '인증 실패');
                  }
                } else if (response?.status === 'FAILURE') {
                  clearInterval(interval); // 상태 확인 중지
                  alert('작업 실패');
                }
              })
              .catch((error) => {
                clearInterval(interval);
                console.error(error);
                alert('작업 상태를 확인하는 중 오류가 발생했습니다.');
              });
          }, 1000); // 1초 간격으로 상태 확인
        } else {
          alert('작업 생성 실패');
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
        className='bg-white rounded-full self-center text-xl px-12 py-4 hover:text-white group relative flex items-center overflow-hidden '
        style={{
          boxShadow:
            '0px 2px 8px 0px rgba(40, 41, 61, 0.08), 0px 20px 32px 0px rgba(96, 97, 112, 0.24)',
        }}
      >
        <span className='absolute h-15 top-0 left-0 w-0 h-full transition-all bg-focus-color opacity-100 group-hover:w-full duration-400 ease'></span>
        <span className='relative'>제출</span>
      </button>
    </div>
  );
};

export default PhotoAuthPage;
