import React from 'react';

interface SectionHeaderProps {
  number: string;
  title: string;
  subtitle: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ number, title, subtitle }) => {
  return (
    <div className="pillar-header">
      <div className="pillar-title-group">
        <span className="pillar-number">{number}</span>
        <h2 className="pillar-title">{title}</h2>
        <p className="pillar-subtitle">{subtitle}</p>
      </div>
    </div>
  );
};

export default SectionHeader; // This export is CRITICAL