import React, { useRef, useState } from 'react';

const ResizablePanel = ({ children }) => {
  const [width, setWidth] = useState(300); // Initial width of the conversation list
  const resizableRef = useRef(null);

  const handleMouseDown = (e) => {
    e.preventDefault();
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleMouseMove = (e) => {
    e.preventDefault();
    if (resizableRef.current) {
      const newWidth = e.clientX - resizableRef.current.getBoundingClientRect().left;
      if (newWidth >= 200 && newWidth <= 500) { // Set min and max width
        setWidth(newWidth);
      }
    }
  };

  const handleMouseUp = () => {
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  };

  return (
    <div className="flex h-full w-full">
      <div ref={resizableRef} style={{ width }} className="relative h-full">
        {children[0]}
        <div
          className="absolute top-0 right-0 h-full w-2 cursor-col-resize bg-gray-400 hover:bg-gray-600"
          onMouseDown={handleMouseDown}
        />
      </div>
      <div className="flex-1 h-full">
        {children[1]}
      </div>
    </div>
  );
};

export default ResizablePanel;
