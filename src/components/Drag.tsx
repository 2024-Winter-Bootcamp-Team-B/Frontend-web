import React, { useRef, useEffect, useState } from 'react';

const Drag = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ left: 0, top: 0 });
  const ref = useRef<HTMLDivElement>(null);
  const shift = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  const handleMouseDown = (e: React.MouseEvent) => {
    if (ref.current) {
      setIsDragging(true);
      shift.current = {
        x: e.clientX - ref.current.offsetLeft,
        y: e.clientY - ref.current.offsetTop,
      };
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging && ref.current) {
      if (e.buttons !== 1) return;
      setPosition({
        left: e.clientX - shift.current.x,
        top: e.clientY - shift.current.y,
      });
    }
  };

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isDragging]);

  return (
    <div
      ref={ref}
      style={{
        position: 'fixed',
        top: position.top,
        left: position.left,
        width: '50px',
        height: '50px',
        backgroundColor: 'orange',
        cursor: isDragging ? 'grabbing' : 'grab',
      }}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      draggable={false}
    />
  );
};

export default Drag;
