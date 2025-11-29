// src/components/ScrollStack.tsx
import React from 'react';
import './ScrollStack.css';

interface ScrollStackProps {
  children: React.ReactNode;
  className?: string;
}

export const ScrollStack: React.FC<ScrollStackProps> = ({ children, className = '' }) => {
  return (
    <div className={`scroll-stack ${className}`}>
      {children}
    </div>
  );
};

export interface ScrollStackItemProps {
  children: React.ReactNode;
  className?: string;
}

export const ScrollStackItem: React.FC<ScrollStackItemProps> = ({ children, className = '' }) => {
  return (
    <div className={`scroll-stack-item ${className}`}>
      {children}
    </div>
  );
};

export default ScrollStack;