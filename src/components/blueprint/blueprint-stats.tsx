import { blueprintStats } from "@/lib/blueprint/content";
import {
  BlueprintSectionHeading,
  blueprintContainer,
} from "@/components/blueprint/blueprint-ui";

export function BlueprintStats() {
  return (
    <section className="relative overflow-hidden bg-[#f7f4ed] py-24 sm:py-28 lg:py-32">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-45 [background-image:linear-gradient(rgba(201,162,77,0.07)_1px,transparent_1px),linear-gradient(90deg,rgba(201,162,77,0.07)_1px,transparent_1px)] [background-size:48px_48px]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-[-180px] top-[-120px] h-[420px] w-[420px] rounded-full bg-[#c9a24d]/10 blur-[120px]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[-180px] right-[-120px] h-[460px] w-[460px] rounded-full bg-[#a77d28]/[0.08] blur-[130px]"
      />

      <div className={`relative z-[1] ${blueprintContainer}`}>
        <div className="border-b border-black/[0.08] pb-10 lg:pb-14">
          <BlueprintSectionHeading
            kicker="Números Checkmate Group"
            title={
              <>
                Experiência real no mercado imobiliário{" "}
                <span className="text-[#a77d28]">americano.</span>
              </>
            }
            description="Um ecossistema construído com projetos reais, operação prática e resultados concretos no mercado dos Estados Unidos."
          />
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-3 lg:gap-6">
          {blueprintStats.map((item, index) => (
            <article
              key={item.label}
              className={[
                "group relative isolate overflow-hidden",
                "min-h-[290px]",
                "rounded-[30px]",
                "border border-black/[0.07]",
                "bg-white/95 p-7 sm:p-8",
                "shadow-[0_22px_65px_rgba(15,15,15,0.07)]",
                "transition-[transform,box-shadow,border-color] duration-500",
                "ease-[cubic-bezier(0.22,1,0.36,1)]",
                "hover:-translate-y-2",
                "hover:border-[#c9a24d]/35",
                "hover:shadow-[0_34px_90px_rgba(15,15,15,0.13)]",
              ].join(" ")}
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-16 -top-16 -z-10 h-44 w-44 rounded-full bg-[#c9a24d]/0 blur-[80px] transition-colors duration-500 group-hover:bg-[#c9a24d]/10"
              />

              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-[12px] -z-10 rounded-[22px] border border-[#c9a24d]/[0.08]"
              />

              <div className="flex items-start justify-between gap-5">
                <span className="inline-flex rounded-full border border-[#c9a24d]/25 bg-[#f7efd9] px-3 py-2 text-[0.6rem] font-bold uppercase tracking-[0.15em] text-[#76591f]">
                  {item.label}
                </span>

                <span className="text-[0.62rem] font-bold tracking-[0.16em] text-[#a77d28]/45">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>

              <div className="mt-16">
                <strong className="block text-[clamp(3rem,5vw,4.4rem)] font-semibold leading-[0.88] tracking-[-0.065em] text-[#171614]">
                  {item.value}
                </strong>

                <div className="mt-6 flex items-start gap-4">
                  <span className="mt-2 h-px w-8 shrink-0 bg-[#a77d28]/50 transition-all duration-500 group-hover:w-12 group-hover:bg-[#a77d28]" />

                  <p className="max-w-[320px] text-[0.94rem] leading-[1.68] text-[#68635b]">
                    {item.text}
                  </p>
                </div>
              </div>

              <span
                aria-hidden="true"
                className="absolute inset-x-0 bottom-0 h-[3px] origin-left scale-x-0 bg-[linear-gradient(90deg,#9f7625,#e6ca7a,#9f7625)] transition-transform duration-500 group-hover:scale-x-100"
              />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}