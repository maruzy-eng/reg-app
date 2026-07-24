type BlueprintLightboxProps = {
  image: string | null;
  onClose: () => void;
};

export function BlueprintLightbox({ image, onClose }: BlueprintLightboxProps) {
  if (!image) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Imagem ampliada"
      className="fixed inset-0 z-[2000] grid place-items-center bg-black/90 p-4 backdrop-blur-sm"
      onMouseDown={onClose}
    >
      <div
        className="relative max-h-[92vh] max-w-[1100px]"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          aria-label="Fechar"
          onClick={onClose}
          className="absolute -right-2 -top-12 grid h-10 w-10 place-items-center rounded-full border border-white/20 bg-white/10 text-2xl text-white transition hover:bg-white hover:text-black"
        >
          ×
        </button>
        <img
          src={image}
          alt="Imagem ampliada"
          className="max-h-[88vh] max-w-full rounded-[20px] object-contain shadow-2xl"
        />
      </div>
    </div>
  );
}
