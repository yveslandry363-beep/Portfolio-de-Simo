
export const triggerHaptic = (pattern: number | number[] = 10) => {
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
        // Only vibrate if user hasn't reduced motion preferences (often linked to sensory overload)
        const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        if (!motionQuery.matches) {
            navigator.vibrate(pattern);
        }
    }
};

export const Patterns = {
    Success: [10, 30, 10],
    Error: [50, 30, 50, 30, 50],
    Click: 8,
    Hover: 2,
    Heavy: 20
};
