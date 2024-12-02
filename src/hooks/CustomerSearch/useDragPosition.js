import { useState, useRef } from "react";
import useListPositionStore from "../../store/listPositionStore";

const useDragPosition = () => {
  const [isDragging, setIsDragging] = useState(false);
  const dragStartY = useRef(0);
  const dragStartPosition = useRef(0);
  const { listPosition, setListPosition } = useListPositionStore();

  const handleDragStart = (e) => {
    setIsDragging(true);
    // touchstart와 mousedown 이벤트를 모두 처리
    dragStartY.current = e.type.includes("touch") ? e.touches[0].clientY : e.clientY;
    dragStartPosition.current = listPosition;
  };

  const handleDrag = (e) => {
    if (!isDragging) return;

    // touchmove와 mousemove 이벤트를 모두 처리
    const currentY = e.type.includes("touch") ? e.touches[0].clientY : e.clientY;
    const deltaY = dragStartY.current - currentY;
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
    onMouseDown: (e) => handleDragStart(e),
    onTouchStart: (e) => handleDragStart(e),
    onMouseMove: (e) => handleDrag(e),
    onTouchMove: (e) => handleDrag(e),
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
