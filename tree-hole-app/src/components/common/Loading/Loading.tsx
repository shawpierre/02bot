import React from 'react';

interface LoadingProps {
  fullscreen?: boolean;
  text?: string;
}

export function Loading({ fullscreen = false, text = '加载中...' }: LoadingProps) {
  const content = (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className="relative w-16 h-16">
        <div className="firefly absolute top-0 left-0"></div>
        <div className="firefly absolute top-0 right-0 animation-delay-200"></div>
        <div className="firefly absolute bottom-0 left-0 animation-delay-400"></div>
        <div className="firefly absolute bottom-0 right-0 animation-delay-600"></div>
      </div>
      {text && <p className="text-gray-400 text-sm">{text}</p>}
    </div>
  );

  if (fullscreen) {
    return (
      <div className="fixed inset-0 bg-forest-dark/80 backdrop-blur-sm flex items-center justify-center z-50">
        {content}
      </div>
    );
  }

  return <div className="py-8">{content}</div>;
}
