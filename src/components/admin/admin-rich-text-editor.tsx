"use client";

import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
import {
  Bold,
  Italic,
  LinkIcon,
  List,
  ListOrdered,
  Pilcrow,
  Redo2,
  Undo2,
} from "lucide-react";

type AdminRichTextEditorProps = {
  label: string;
  name: string;
  defaultValue?: string | null;
  helpText?: string;
};

export function AdminRichTextEditor({
  label,
  name,
  defaultValue = "",
  helpText,
}: AdminRichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement | null>(null);
  const [value, setValue] = useState(defaultValue || "");

  useEffect(() => {
    if (!editorRef.current) {
      return;
    }

    editorRef.current.innerHTML = defaultValue || "";
    setValue(defaultValue || "");
  }, [defaultValue]);

  function syncValue() {
    const html = editorRef.current?.innerHTML || "";
    setValue(html);
  }

  function focusEditor() {
    editorRef.current?.focus();
  }

  function runCommand(command: string, commandValue?: string) {
    focusEditor();

    setTimeout(() => {
      document.execCommand(command, false, commandValue);
      syncValue();
    }, 0);
  }

  function addLink() {
    const url = window.prompt("Paste the URL:");

    if (!url) {
      return;
    }

    runCommand("createLink", url);
  }

  function handlePaste(event: React.ClipboardEvent<HTMLDivElement>) {
    event.preventDefault();

    const text = event.clipboardData.getData("text/plain");

    document.execCommand("insertText", false, text);
    syncValue();
  }

  return (
    <div className="block">
      <span className="text-sm font-bold text-[#171614]">{label}</span>

      <input type="hidden" name={name} value={value} readOnly />

      <div className="mt-2 overflow-hidden rounded-[1.3rem] border border-[#171614]/10 bg-white shadow-sm">
        <div className="flex flex-wrap gap-2 border-b border-[#171614]/10 bg-[#f8f6f1] p-3">
          <EditorButton
            label="Bold"
            onClick={() => runCommand("bold")}
            icon={<Bold size={16} />}
          />

          <EditorButton
            label="Italic"
            onClick={() => runCommand("italic")}
            icon={<Italic size={16} />}
          />

          <EditorButton
            label="Paragraph"
            onClick={() => runCommand("formatBlock", "p")}
            icon={<Pilcrow size={16} />}
          />

          <EditorButton
            label="Bullet list"
            onClick={() => runCommand("insertUnorderedList")}
            icon={<List size={16} />}
          />

          <EditorButton
            label="Numbered list"
            onClick={() => runCommand("insertOrderedList")}
            icon={<ListOrdered size={16} />}
          />

          <EditorButton
            label="Link"
            onClick={addLink}
            icon={<LinkIcon size={16} />}
          />

          <EditorButton
            label="Undo"
            onClick={() => runCommand("undo")}
            icon={<Undo2 size={16} />}
          />

          <EditorButton
            label="Redo"
            onClick={() => runCommand("redo")}
            icon={<Redo2 size={16} />}
          />
        </div>

        <div
          ref={editorRef}
          role="textbox"
          tabIndex={0}
          contentEditable={true}
          suppressContentEditableWarning={true}
          onInput={syncValue}
          onBlur={syncValue}
          onKeyUp={syncValue}
          onMouseUp={syncValue}
          onPaste={handlePaste}
          onClick={focusEditor}
          className="admin-rich-editor min-h-[280px] w-full cursor-text bg-white px-5 py-4 text-sm leading-7 text-[#171614] outline-none focus:ring-2 focus:ring-[#c79a4b]/30"
        />
      </div>

      {helpText ? (
        <span className="mt-2 block text-xs leading-5 text-[#64748b]">
          {helpText}
        </span>
      ) : null}
    </div>
  );
}

function EditorButton({
  label,
  icon,
  onClick,
}: {
  label: string;
  icon: ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onMouseDown={(event) => {
        event.preventDefault();
      }}
      onClick={onClick}
      title={label}
      aria-label={label}
      className="inline-flex h-9 min-w-9 items-center justify-center rounded-full border border-[#171614]/10 bg-white px-3 text-[#171614] transition hover:border-[#c79a4b]/40 hover:bg-[#c79a4b]/10"
    >
      {icon}
    </button>
  );
}