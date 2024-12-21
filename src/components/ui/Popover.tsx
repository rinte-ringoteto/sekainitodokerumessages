import React, { useState, useRef, useEffect } from 'react';
import { HelpCircle } from 'lucide-react';

interface PopoverProps {
  content: React.ReactNode;
  children: React.ReactNode;
}

export function Popover({ content, children }: PopoverProps) {
  const [isOpen, setIsOpen] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block" ref={popoverRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="text-gray-500 hover:text-gray-700 focus:outline-none"
      >
        {children}
      </button>

      {isOpen && (
        <div className="absolute z-10 w-96 mt-2 -right-2 transform translate-y-1">
          <div className="bg-white rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 p-4">
            {content}
          </div>
        </div>
      )}
    </div>
  );
}