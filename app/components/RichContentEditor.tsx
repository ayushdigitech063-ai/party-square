"use client";

import React, { useRef } from "react";
import { Bold, Italic, Link as LinkIcon, Underline, List, Heading2 } from "lucide-react";

interface RichContentEditorProps {
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  rows?: number;
  label?: string;
}

export default function RichContentEditor({
  value,
  onChange,
  placeholder = "Write content here...",
  rows = 4,
  label
}: RichContentEditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const insertTag = (openTag: string, closeTag: string, defaultText = "text") => {
    const el = textareaRef.current;
    if (!el) return;

    const start = el.selectionStart;
    const end = el.selectionEnd;
    const selected = value.substring(start, end) || defaultText;
    const replacement = `${openTag}${selected}${closeTag}`;

    const updated = value.substring(0, start) + replacement + value.substring(end);
    onChange(updated);

    setTimeout(() => {
      el.focus();
      el.setSelectionRange(start + openTag.length, start + openTag.length + selected.length);
    }, 50);
  };

  const handleAddLink = () => {
    const el = textareaRef.current;
    const start = el ? el.selectionStart : 0;
    const end = el ? el.selectionEnd : 0;
    const selected = value.substring(start, end) || "Click Here";

    const url = window.prompt("Enter destination URL (e.g. /services/birthday or https://...):", "https://");
    if (!url) return;

    const replacement = `<a href="${url.trim()}" target="_blank" rel="noopener noreferrer" class="text-[#8CBC67] underline hover:text-[#7AB055] font-semibold">${selected}</a>`;
    const updated = value.substring(0, start) + replacement + value.substring(end);
    onChange(updated);
  };

  return (
    <div className="space-y-1.5 w-full">
      {label && (
        <label className="block text-xs font-semibold text-[#202522]">
          {label}
        </label>
      )}

      <div className="border border-[#E8E8E3] rounded-xl overflow-hidden bg-neutral-50 focus-within:bg-white focus-within:border-[#8CBC67] transition">
        {/* Simple Formatting Toolbar */}
        <div className="flex items-center gap-1 px-2.5 py-1.5 bg-neutral-100/80 border-b border-[#E8E8E3] text-neutral-600 text-xs">
          <button
            type="button"
            title="Bold"
            onClick={() => insertTag("<strong>", "</strong>", "bold text")}
            className="p-1.5 rounded hover:bg-neutral-200 hover:text-black transition cursor-pointer"
          >
            <Bold size={13} />
          </button>
          <button
            type="button"
            title="Italic"
            onClick={() => insertTag("<em>", "</em>", "italic text")}
            className="p-1.5 rounded hover:bg-neutral-200 hover:text-black transition cursor-pointer"
          >
            <Italic size={13} />
          </button>
          <button
            type="button"
            title="Underline"
            onClick={() => insertTag("<u>", "</u>", "underlined text")}
            className="p-1.5 rounded hover:bg-neutral-200 hover:text-black transition cursor-pointer"
          >
            <Underline size={13} />
          </button>

          <span className="h-4 w-px bg-neutral-300 mx-1" />

          <button
            type="button"
            title="Add Link / URL"
            onClick={handleAddLink}
            className="p-1.5 rounded hover:bg-[#EEF6EB] hover:text-[#8CBC67] transition flex items-center gap-1 font-semibold text-[11px] cursor-pointer"
          >
            <LinkIcon size={13} />
            <span>Link</span>
          </button>

          <button
            type="button"
            title="Bullet point"
            onClick={() => insertTag("<li>", "</li>", "Bullet item")}
            className="p-1.5 rounded hover:bg-neutral-200 hover:text-black transition cursor-pointer ml-auto"
          >
            <List size={13} />
          </button>
        </div>

        {/* Textarea */}
        <textarea
          ref={textareaRef}
          rows={rows}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full px-3.5 py-2.5 text-xs text-[#202522] leading-relaxed bg-transparent focus:outline-none resize-y font-sans"
        />
      </div>

      <p className="text-[10px] text-neutral-400">
        Formatting tips: Use <strong>Link</strong> button to add clickable links. Standard HTML tags are supported.
      </p>
    </div>
  );
}
