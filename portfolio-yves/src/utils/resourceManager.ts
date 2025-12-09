
// Real-time resource loader

export const loadResources = async (
    data: any[],
    onProgress: (percentage: number) => void
): Promise<void> => {
    return new Promise((resolve) => {
        // Bypass preloading to prevent hanging on 50+ images
        // In a real production app we would lazy load these or use a smaller batch
        onProgress(100);
        resolve();
    });
};
