'use client';

import { useState, useEffect } from "react";
import { AlertCircle, Wrench, Cpu, GitBranch } from "lucide-react";

// 52 lines of mocked code demonstrating the maintenance fix
const codeString = `// 🚨 404 Page Under Maintenance
// Our team is actively working on a fix.
import { useState, useEffect } from 'react';
import { AlertCircle, Loader } from '@/components/ui';
import { MaintenanceService } from '@/lib/services';

interface PageStatus {
  isOperational: boolean;
  estimatedTimeToFix: number;
  lastUpdated: string;
}

export default function MaintenanceHandler() {
  const [status, setStatus] = useState<PageStatus | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Initialize crash report and recovery sequence
    const reportCrash = async () => {
      try {
        console.error('404 Detected. Initiating recovery...');
        const response = await MaintenanceService.initiateHotfix();
        setStatus(response);
      } catch (err) {
        console.error('Recovery failed. Manual override required.');
      }
    };

    reportCrash();
  }, []);

  useEffect(() => {
    // Simulate build progress while fixing
    const interval = setInterval(() => {
      setProgress((prev) => (prev >= 95 ? prev : prev + 5));
    }, 500);
    return () => clearInterval(interval);
  }, []);

  if (!status) {
    return <Loader text="Analyzing missing dependencies..." />;
  }

  return (
    <div className="error-container">
      <AlertCircle size={48} color="#ff0000" />
      <h1>System Unavailable</h1>
      <p>We are currently deploying a critical patch.</p>
      <ProgressBar value={progress} />
    </div>
  );
}`;

// Simple syntax highlighter tailored for White/Red/Black theme
const highlightLine = (line: string) => {
  if (line.trim().startsWith("//")) {
    return <span className="text-neutral-400 italic">{line}</span>;
  }

  // Split by strings, whitespace, and common punctuation
  const parts = line.split(/('(?:[^'\\]|\\.)*'|\s+|[(){}[\]=;:<>|,]+)/);
  
  return parts.map((part, index) => {
    if (!part) return null;

    // Strings
    if (part.startsWith("'") || part.startsWith('"')) {
      return <span key={index} className="text-neutral-500">{part}</span>;
    }

    // Keywords
    const keywords = ['import', 'from', 'export', 'default', 'function', 'const', 'return', 'interface', 'try', 'catch', 'if', 'await', 'async', 'true', 'false', 'null', 'void', 'new'];
    if (keywords.includes(part)) {
      return <span key={index} className="text-red-600 font-bold">{part}</span>;
    }

    // Types / Components (Starts with uppercase)
    if (/^[A-Z]/.test(part)) {
      return <span key={index} className="text-black font-semibold">{part}</span>;
    }

    // Default text
    return <span key={index} className="text-neutral-800">{part}</span>;
  });
};

export default function NotFound() {
  const [displayedLength, setDisplayedLength] = useState(0);
  const [cursorVisible, setCursorVisible] = useState(true);

  const totalLength = codeString.length;

  // Slow typing animation effect
  useEffect(() => {
    if (displayedLength < totalLength) {
      const timeout = setTimeout(() => {
        setDisplayedLength((l) => l + 1);
      }, 65); // Slowed down to 65ms per character
      return () => clearTimeout(timeout);
    } else {
      // Pause for 5 seconds, then restart the animation loop
      const resetTimeout = setTimeout(() => {
        setDisplayedLength(0);
      }, 5000);
      return () => clearTimeout(resetTimeout);
    }
  }, [displayedLength, totalLength]);

  // Blinking cursor effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCursorVisible((v) => !v);
    }, 530);
    return () => clearInterval(interval);
  }, []);

  // Calculate currently displayed code
  const displayedCode = codeString.substring(0, displayedLength);
  const lines = displayedCode.split("\n");

  // Calculate cursor line and column for the status bar
  const lastNewLineIndex = displayedCode.lastIndexOf("\n");
  const typingLine = (displayedCode.match(/\n/g) || []).length + 1;
  const typingCol = displayedLength - (lastNewLineIndex === -1 ? 0 : lastNewLineIndex + 1) + 1;

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-white flex flex-col items-center justify-center p-4 font-sans">
      
      {/* Background Grid & Red Glow */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:2.5rem_2.5rem] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_110%)] opacity-60" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[400px] w-[800px] bg-red-100/50 rounded-full blur-[120px] -z-10 pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center gap-8 w-full max-w-3xl">
        
        {/* Header Message */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-red-200 bg-red-50 px-3 py-1 text-xs font-medium text-red-600">
            <AlertCircle className="h-3.5 w-3.5" />
            System Maintenance
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-black">
            Page Under Maintenance
          </h1>
          <p className="text-neutral-500 max-w-md mx-auto">
            Our team is actively working on fixing this page. Please check back shortly.
          </p>
        </div>

        {/* IDE Window (Light Theme) */}
        <div className="w-full rounded-xl border border-neutral-200 bg-white shadow-2xl shadow-red-100/40 overflow-hidden transform md:scale-100 scale-95">
          
          {/* Window Top Bar */}
          <div className="flex items-center justify-between border-b border-neutral-200 bg-neutral-50 px-4 py-3">
            <div className="flex items-center gap-1.5">
              {/* Themed window controls */}
              <div className="h-3 w-3 rounded-full bg-red-500" />
              <div className="h-3 w-3 rounded-full bg-neutral-800" />
              <div className="h-3 w-3 rounded-full bg-neutral-300" />
            </div>
            <div className="flex items-center gap-2 text-xs text-neutral-500 font-mono">
              <GitBranch className="h-3.5 w-3.5 text-red-500" />
              <span>fix-404-issue.tsx</span>
            </div>
            <div className="flex items-center gap-1.5 rounded-full border border-red-200 bg-red-50 px-2 py-0.5 text-[10px] font-semibold text-red-600">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500"></span>
              </span>
              IN PROGRESS
            </div>
          </div>

          {/* Code Body */}
          <div className="overflow-x-auto p-4 bg-white font-mono text-xs md:text-sm leading-relaxed h-[450px]">
            {lines.map((line, lineIndex) => {
              const isLastLine = lineIndex === lines.length - 1;
              return (
                <div key={lineIndex} className="flex group hover:bg-neutral-50 transition-colors duration-100 min-h-[1.5rem]">
                  <span className="select-none text-right pr-4 pl-2 w-10 md:w-12 w-12 text-neutral-300 group-hover:text-neutral-400 group-hover:bg-neutral-50">
                    {lineIndex + 1}
                  </span>
                  <span className="flex-1 whitespace-pre relative">
                    {line.length === 0 ? "\u00A0" : highlightLine(line)}
                    {isLastLine && (
                      <span
                        className={`inline-block w-[2px] h-4 md:h-5 bg-red-600 align-text-bottom ml-0.5 transition-opacity duration-100 ${
                          cursorVisible ? "opacity-100" : "opacity-0"
                        }`}
                      />
                    )}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Status Bar */}
          <div className="flex items-center justify-between border-t border-neutral-200 bg-neutral-50 px-4 py-2 text-[10px] text-neutral-500 font-mono">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5 text-red-600 font-medium">
                <Wrench className="h-3 w-3" />
                Compiling Hotfix...
              </span>
              <span className="hidden md:flex items-center gap-1.5 text-neutral-500">
                <Cpu className="h-3 w-3" />
                CPU 42%
              </span>
            </div>
            <div className="flex items-center gap-4">
              <span className="hidden md:inline">UTF-8</span>
              <span className="hidden md:inline">TypeScript React</span>
              <span className="text-neutral-700">Ln {typingLine}, Col {typingCol}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}