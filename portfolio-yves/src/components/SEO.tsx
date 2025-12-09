
import React, { useEffect } from 'react';

interface SEOProps {
  title: string;
  description?: string;
}

const SEO: React.FC<SEOProps> = ({ title, description }) => {
  useEffect(() => {
    const baseTitle = "Yves-Landry Simo Yomgni";
    const fullTitle = title === "Home" ? `${baseTitle} | Portfolio` : `${title} | ${baseTitle}`;
    const defaultDesc = "Portfolio of Yves-Landry Simo Yomgni, a Mathematics Student and Software Engineer based in Germany.";

    // Update Title
    document.title = fullTitle;

    // Update Meta Description
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
        metaDesc.setAttribute('content', description || defaultDesc);
    } else {
        const meta = document.createElement('meta');
        meta.name = "description";
        meta.content = description || defaultDesc;
        document.head.appendChild(meta);
    }
    
    // Cleanup not strictly necessary for document.title but good practice if we wanted to revert
  }, [title, description]);

  return null;
};

export default SEO;
