
import { useState, useEffect, useRef } from "react";

export const Clickoutside = () => {
    const [menuOpen, setMenuOpen] = useState(true);

    const menuRef = useRef<HTMLDivElement>();
    const buttonRef = useRef<HTMLButtonElement>();

    useEffect(() => {
        const handlerClickoutside = (e: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
                setMenuOpen(false);
            }
        };
        document.addEventListener('mousedown', handlerClickoutside);

        return () => {
            document.removeEventListener('mousedown', handlerClickoutside);
        };
    }, []);

    return { menuOpen, setMenuOpen, menuRef, buttonRef };
};
