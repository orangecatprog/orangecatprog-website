import { useEffect, useState } from "react";

interface DynamicTextProps {
    texts: string[];
    typingSpeed?: number;
    deletingSpeed?: number;
    pause?: number;
}

export default function DynamicText({
    texts,
    typingSpeed = 100,
    deletingSpeed = 50,
    pause = 1500,
}: DynamicTextProps) {
    const [text, setText] = useState("");
    const [index, setIndex] = useState(0);
    const [deleting, setDeleting] = useState(false);

    useEffect(() => {
        const current = texts[index];

        let timeout: ReturnType<typeof setTimeout>;

        if (!deleting) {
            if (text.length < current.length) {
                timeout = setTimeout(() => {
                    setText(current.slice(0, text.length + 1));
                }, typingSpeed);
            } else {
                timeout = setTimeout(() => {
                    setDeleting(true);
                }, pause);
            }
        } else {
            if (text.length > 0) {
                timeout = setTimeout(() => {
                    setText(current.slice(0, text.length - 1));
                }, deletingSpeed);
            } else {
                setDeleting(false);
                setIndex((index + 1) % texts.length);
            }
        }

        return () => clearTimeout(timeout);
    }, [text, deleting, index, texts, typingSpeed, deletingSpeed, pause]);

    return <>{text}</>;
}
