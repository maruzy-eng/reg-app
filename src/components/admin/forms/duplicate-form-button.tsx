"use client";

import { useFormStatus } from "react-dom";
import { Copy } from "lucide-react";

type DuplicateFormButtonProps = {
  className?: string;
  label?: string;
};

export function DuplicateFormButton({
  className = "admin-secondary-button min-h-[40px] gap-2 px-4 text-xs",
  label = "Duplicate",
}: DuplicateFormButtonProps) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className={className}
      onClick={(event) => {
        const confirmed = window.confirm(
          "Deseja duplicar este formulário com todos os campos e configurações?",
        );

        if (!confirmed) {
          event.preventDefault();
        }
      }}
    >
      <Copy size={15} />
      {pending ? "Duplicating..." : label}
    </button>
  );
}
