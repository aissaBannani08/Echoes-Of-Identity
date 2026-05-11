import React from "react";

interface SEOKeywordsProps {
  keywords: string[];
}

/**
 * A visually hidden component that adds keyword signals for crawlers
 * without cluttering the UI. Uses the recommended CSS approach from the SEO guide.
 */
const SEOKeywords: React.FC<SEOKeywordsProps> = ({ keywords }) => {
  return (
    <div 
      className="seo-keywords" 
      aria-hidden="true"
      style={{
        position: 'absolute',
        width: '1px',
        height: '1px',
        overflow: 'hidden',
        clip: 'rect(0,0,0,0)',
        whiteSpace: 'nowrap',
      }}
    >
      {keywords.join(", ")}
    </div>
  );
};

export default SEOKeywords;
