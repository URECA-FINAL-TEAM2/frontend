import { useState, useEffect } from "react";

const TypingEffect = ({ text, speed = 100, delay = 0 }) => {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    if (!text) return;

    let index = 0;

    // 2초 대기 후 타이핑 효과 시작
    const timeout = setTimeout(() => {
      setDisplayedText(text[index] || "");
      index++;

      const interval = setInterval(() => {
        if (index < text.length - 1) {
          setDisplayedText((prev) => prev + text[index]);
          index++;
        } else {
          clearInterval(interval);
        }
      }, speed);

      // 클린업 함수
      return () => clearInterval(interval);
    }, delay);

    // 클린업 함수
    return () => clearTimeout(timeout);
  }, [text, speed]);

  return <div>{displayedText}</div>;
};

export default TypingEffect;
