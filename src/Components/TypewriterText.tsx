import {useState,useEffect} from "react";
import * as React from "react";

const TypewriterText: React.FC<{ texts: string[] }> = ({ texts }) => {
    const [currentText, setCurrentText] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const timeout = setTimeout(() => {
            const fullText = texts[currentIndex];

            if (isDeleting) {
                setCurrentText(fullText.substring(0, currentText.length - 1));
                if (currentText === '') {
                    setIsDeleting(false);
                    setCurrentIndex((prev) => (prev + 1) % texts.length);
                }
            } else {
                setCurrentText(fullText.substring(0, currentText.length + 1));
                if (currentText === fullText) {
                    setTimeout(() => setIsDeleting(true), 2000);
                }
            }
        }, isDeleting ? 50 : 100);

        return () => clearTimeout(timeout);
    }, [currentText, currentIndex, isDeleting, texts]);

    return (
        <span className="text-blue-600 dark:text-blue-400">
      {currentText}
            <span className="animate-pulse">|</span>
    </span>
    );
};

export default TypewriterText;