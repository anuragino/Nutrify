import { useEffect, useRef } from "react";
import "./typingText.css"

export default function TypingText({text}) {
  const textRef = useRef(null);

  useEffect(() => {
    const text = textRef.current;
    if (text) {
      text.style.animation = "none";
      text.offsetHeight; /* trigger reflow */
      text.style.animation = "typing 2s steps(20, end) infinite";
    }
  }, [text]);

  return (

    <div className="text-div">
        <p ref={textRef} className="add-food-text">
            {text}
        </p>
    </div>
    
  );
};