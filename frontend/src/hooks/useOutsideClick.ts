import { useEffect, RefObject } from "react";

export function useOutsideClick(ref: RefObject<HTMLElement | null>, onClickOut: () => void) {
    useEffect(() => {
        const onClick = (event: MouseEvent) => {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                onClickOut();
            }
        };

        document.addEventListener("mousedown", onClick);
        return () => document.removeEventListener("mousedown", onClick);
    }, [ref, onClickOut]);
}