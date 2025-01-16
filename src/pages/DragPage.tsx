import React from 'react';
import Drag from '../components/Drag';

const Dragpage: React.FC = () => {
  return (
    <div className='relative w-screen h-screen bg-gray-100'>
      <h1 className='text-center text-2xl font-bold mt-4'>
        Draggable Character
      </h1>
      <Drag />
    </div>
  );
};

export default Dragpage;
