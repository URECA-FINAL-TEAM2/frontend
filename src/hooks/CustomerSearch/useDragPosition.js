import { useState, useRef } from "react";
import useListPositionStore from "../../store/listPositionStore";

const useDragPosition = () => {
  const [isDragging, setIsDragging] = useState(false);
  const dragStartY = useRef(0);
  const dragStartPosition = useRef(0);
  const { listPosition, setListPosition } = useListPositionStore();

  const handleDragStart = (e) => {
    setIsDragging(true);
    dragStartY.current = e.clientY;
    dragStartPosition.current = listPosition;
  };

  const handleDrag = (e) => {
    if (!isDragging) return;

    const deltaY = dragStartY.current - e.clientY;
    const deltaPercent = (deltaY / window.innerHeight) * 100;
    const newPosition = Math.max(0, Math.min(100, dragStartPosition.current + deltaPercent));
    setListPosition(newPosition);
  };

  const handleDragEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);

    // Snap to closest position
    if (listPosition < 35) {
      setListPosition(5.5);
    } else if (listPosition < 70) {
      setListPosition(60);
    } else {
      setListPosition(100);
    }
  };

  const dragHandlers = {
    onMouseDown: handleDragStart,
    onTouchStart: (e) => handleDragStart(e.touches[0]),
    onMouseMove: handleDrag,
    onTouchMove: (e) => handleDrag(e.touches[0]),
    onMouseUp: handleDragEnd,
    onTouchEnd: handleDragEnd
  };

  return {
    isDragging,
    listPosition,
    dragHandlers
  };
};

export default useDragPosition;
