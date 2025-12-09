
// Real-time resource loader

export const loadResources = async (
    data: any[], 
    onProgress: (percentage: number) => void
): Promise<void> => {
    return new Promise((resolve) => {
        // Extract all image URLs from data
        const imageUrls: string[] = [];
        
        data.forEach(item => {
            if (item.image) imageUrls.push(item.image);
            // Add other asset keys if necessary
        });

        // Add critical UI assets
        imageUrls.push("https://images.unsplash.com/photo-1531384441138-2736e62e0919?q=80&w=2574&auto=format&fit=crop"); 
        
        // Remove duplicates and empty strings
        const uniqueUrls = [...new Set(imageUrls)].filter(Boolean);

        const total = uniqueUrls.length;
        if (total === 0) {
            onProgress(100);
            resolve();
            return;
        }

        let loaded = 0;
        
        const updateProgress = () => {
            loaded++;
            const percent = Math.floor((loaded / total) * 100);
            onProgress(percent);
            
            if (loaded === total) {
                resolve();
            }
        };

        uniqueUrls.forEach(url => {
            const img = new Image();
            img.src = url;
            img.onload = updateProgress;
            img.onerror = updateProgress; // Continue even if error
        });
    });
};
