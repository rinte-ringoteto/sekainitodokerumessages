"use client"

import React, { useEffect } from 'react';
import { CheckCircle, XCircle, X } from 'lucide-react';
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const toastVariants = cva(
  "fixed bottom-4 right-4 flex items-center gap-2 px-4 py-3 rounded-lg shadow-lg transition-all duration-300 ease-in-out",
  {
    variants: {
      type: {
        success: "bg-green-100 text-green-800 border-green-300",
        error: "bg-red-100 text-red-800 border-red-300",
      },
      visibility: {
        visible: "translate-y-0 opacity-100",
        hidden: "translate-y-2 opacity-0",
      },
    },
    defaultVariants: {
      type: "success",
      visibility: "hidden",
    },
  }
);

interface ToastProps extends VariantProps<typeof toastVariants> {
  message: string;
  onClose: () => void;
  duration?: number;
}

export function Toast({ message, type, onClose, duration = 3000 }: ToastProps) {
  const [isVisible, setIsVisible] = React.useState(false);

  useEffect(() => {
    setIsVisible(true);
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 300); // Wait for fade out animation before calling onClose
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div className={cn(toastVariants({ type, visibility: isVisible ? "visible" : "hidden" }))}>
      <div className="flex items-center gap-2">
        {type === 'success' ? (
          <CheckCircle className="h-5 w-5 text-green-500" />
        ) : (
          <XCircle className="h-5 w-5 text-red-500" />
        )}
        <span className="text-sm font-medium">{message}</span>
      </div>
      <button
        onClick={() => setIsVisible(false)}
        className="ml-2 text-gray-500 hover:text-gray-700 transition-colors duration-200"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}

