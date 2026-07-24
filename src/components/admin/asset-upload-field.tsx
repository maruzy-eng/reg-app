"use client";

import { ImageIcon, Upload } from "lucide-react";
import { useMemo, useState } from "react";

type AssetUploadFieldProps = {
  name: string;
  title: string;
  description: string;
  currentUrl?: string;
  accept: string;
  disabled?: boolean;
  previewSize?: "logo" | "favicon";
};

export function AssetUploadField({
  name,
  title,
  description,
  currentUrl,
  accept,
  disabled,
  previewSize = "logo",
}: AssetUploadFieldProps) {
  const [selectedFileName, setSelectedFileName] = useState("");
  const [previewUrl, setPreviewUrl] = useState("");

  const visiblePreviewUrl = previewUrl || currentUrl || "";

  const previewClassName = useMemo(() => {
    if (previewSize === "favicon") {
      return "max-h-12 max-w-12 object-contain";
    }

    return "max-h-16 max-w-32 object-contain";
  }, [previewSize]);

  return (
    <div className="admin-card rounded-[1.5rem] p-5">
      <div className="flex items-start gap-4">
        <div className="flex min-h-20 min-w-20 items-center justify-center rounded-2xl border border-[rgba(23,22,20,0.1)] bg-white p-3 shadow-[0_14px_30px_rgba(23,22,20,0.06)]">
          {visiblePreviewUrl ? (
            <img
              src={visiblePreviewUrl}
              alt={title}
              className={previewClassName}
            />
          ) : (
            <ImageIcon className="text-[#94a3b8]" size={28} />
          )}
        </div>

        <div className="flex-1">
          <h3 className="font-bold text-[#171614]">{title}</h3>

          <p className="mt-1 text-sm leading-6 text-[#64748b]">
            {description}
          </p>

          {selectedFileName ? (
            <p className="admin-badge mt-2 px-3 py-1 text-xs">
              Selected: {selectedFileName}
            </p>
          ) : currentUrl ? (
              <p className="admin-badge mt-2 px-3 py-1 text-xs text-[#171614]">
                Current file loaded
              </p>
          ) : (
            <p className="admin-badge mt-2 px-3 py-1 text-xs text-[#64748b]">
              No file uploaded yet
            </p>
          )}
        </div>
      </div>

      <label className="mt-5 flex cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-[rgba(23,22,20,0.1)] bg-white px-4 py-6 text-center transition hover:bg-[#f8f6f1]">
        <Upload className="text-[#c79a4b]" size={24} />

        <span className="mt-2 text-sm font-bold text-[#171614]">
          Upload {title}
        </span>

        <span className="mt-1 text-xs text-[#64748b]">
          Select a file from your computer, then click Save Settings.
        </span>

        <input
          type="file"
          name={name}
          accept={accept}
          disabled={disabled}
          className="sr-only"
          onChange={(event) => {
            const file = event.target.files?.[0];

            if (!file) {
              setSelectedFileName("");
              setPreviewUrl("");
              return;
            }

            setSelectedFileName(file.name);

            const nextPreviewUrl = URL.createObjectURL(file);
            setPreviewUrl(nextPreviewUrl);
          }}
        />
      </label>
    </div>
  );
}
