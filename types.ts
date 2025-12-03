import React from 'react';

// Props for the UI Component
export interface DomainProps {
    title: string;
    description: string;
    icon: React.ReactNode;
    colorClass: string;
    iconBgClass: string;
    iconTextClass: string;
    svgPath: React.ReactNode;
    image: string;
}