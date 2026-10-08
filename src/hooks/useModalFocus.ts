import { useEffect, useRef, type RefObject } from "react";

const FOCUSABLE =
    'a[href],button:not([disabled]),textarea:not([disabled]),input:not([disabled]),select:not([disabled]),[tabindex]:not([tabindex="-1"])';

type Options = {
    isOpen: boolean;
    onClose: () => void;
    initialFocusRef?: RefObject<HTMLElement | null>;
};

export function useModalFocus<T extends HTMLElement>({
    isOpen,
    onClose,
    initialFocusRef,
}: Options) {
    const containerRef = useRef<T>(null);
    const onCloseRef = useRef(onClose);

    useEffect(() => {
        onCloseRef.current = onClose;
    }, [onClose]);

    useEffect(() => {
        if (!isOpen) return;
        const container = containerRef.current;
        if (!container) return;

        const trigger = document.activeElement as HTMLElement | null;
        const getItems = () =>
            Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE));

        (initialFocusRef?.current ?? getItems()[0] ?? container).focus();

        function onKeyDown(e: KeyboardEvent) {
            if (e.key === "Escape") {
                e.stopPropagation();
                onCloseRef.current();
                return;
            }
            if (e.key !== "Tab" || !container) return;

            const items = getItems();
            if (items.length === 0) {
                e.preventDefault();
                container.focus();
                return;
            }
            const first = items[0];
            const last = items[items.length - 1];
            const active = document.activeElement;

            if (e.shiftKey && (active === first || active === container)) {
                e.preventDefault();
                last.focus();
            } else if (!e.shiftKey && active === last) {
                e.preventDefault();
                first.focus();
            }
        }

        document.addEventListener("keydown", onKeyDown);
        return () => {
            document.removeEventListener("keydown", onKeyDown);
            if (trigger && document.contains(trigger)) trigger.focus();
        };
    }, [isOpen, initialFocusRef]);

    return containerRef;
}