"use client";

import { useRef, useState } from "react";

const MAX_FILE_SIZE_MB = 1;
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;

type AdminFileFieldProps = {
  label: string;
  name: string;
  accept: string;
  helpText: string;
  maxSizeMb?: number;
};

function formatFileSize(bytes: number) {
  if (bytes < 1024) {
    return `${bytes} B`;
  }

  if (bytes < 1024 * 1024) {
    return `${(bytes / 1024).toFixed(1)} KB`;
  }

  return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
}

export function AdminFileField({
  label,
  name,
  accept,
  helpText,
  maxSizeMb = MAX_FILE_SIZE_MB,
}: AdminFileFieldProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedFileName, setSelectedFileName] = useState("");

  const maxSizeBytes = maxSizeMb * 1024 * 1024;

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    setErrorMessage("");
    setSelectedFileName("");

    if (!file) {
      return;
    }

    if (file.size > maxSizeBytes) {
      event.target.value = "";

      setErrorMessage(
        `This file is too large. Maximum allowed size is ${maxSizeMb} MB. Selected file size: ${formatFileSize(
          file.size,
        )}.`,
      );

      return;
    }

    setSelectedFileName(`${file.name} · ${formatFileSize(file.size)}`);
  }

  function clearSelectedFile() {
    if (inputRef.current) {
      inputRef.current.value = "";
    }

    setSelectedFileName("");
    setErrorMessage("");
  }

  return (
    <div className="block rounded-2xl border border-dashed border-[#53bc76]/35 bg-[#f8fafc] p-4">
      <label className="block">
        <span className="text-sm font-bold text-[#0e3541]">{label}</span>

        <input
          ref={inputRef}
          name={name}
          type="file"
          accept={accept}
          onChange={handleFileChange}
          className="mt-3 block w-full text-sm text-[#587469] file:mr-4 file:rounded-full file:border-0 file:bg-[#53bc76] file:px-4 file:py-2 file:text-sm file:font-bold file:text-white hover:file:bg-[#45a866]"
        />
      </label>

      {selectedFileName ? (
        <div className="mt-3 flex items-center justify-between gap-3 rounded-xl border border-[#53bc76]/20 bg-white px-3 py-2">
          <p className="min-w-0 truncate text-xs font-bold text-[#0e3541]">
            {selectedFileName}
          </p>

          <button
            type="button"
            onClick={clearSelectedFile}
            className="shrink-0 rounded-full bg-[#f8fafc] px-3 py-1 text-[11px] font-bold text-[#587469] transition hover:bg-red-50 hover:text-red-600"
          >
            Remove
          </button>
        </div>
      ) : null}

      {errorMessage ? (
        <div className="mt-3 rounded-xl border border-red-200 bg-red-50 px-3 py-2">
          <p className="text-xs font-bold leading-5 text-red-700">
            {errorMessage}
          </p>
        </div>
      ) : null}

      <span className="mt-2 block text-xs leading-5 text-[#64748b]">
        {helpText} Maximum file size: {maxSizeMb} MB.
      </span>
    </div>
  );
}