
import React, { useEffect, useState } from 'react';

const DynamicTitle: React.FC = () => {
  const [originalTitle, setOriginalTitle] = useState(document.title);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        setOriginalTitle(document.title);
        document.title = "Come back 🚀 | Yves-Landry";
      } else {
        document.title = originalTitle;
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, [originalTitle]);

  return null;
};

export default DynamicTitle;
