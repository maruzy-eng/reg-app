import { blueprintExperience as content } from "@/lib/blueprint/experience";
import { BlueprintEyebrow, blueprintContainer } from "./shared";

export function Blueprint009Financing() {
  return (
    <section className="border-t border-white/10 bg-[#0B0B0A] py-20 text-white sm:py-24 lg:py-28 xl:py-32">
      <div className={blueprintContainer}>
        <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
          <div>
            <BlueprintEyebrow dark>
              {content.sections.financing.eyebrow}
            </BlueprintEyebrow>

            <h2 className="mt-7 max-w-[560px] text-[clamp(2.4rem,4.5vw,4.5rem)] font-medium leading-[0.98] tracking-[-0.055em] text-[#F5F3EE]">
              {content.sections.financing.title}
            </h2>

            <p className="mt-7 max-w-[500px] text-[0.98rem] leading-[1.85] text-white/65">
              {content.sections.financing.description}
            </p>
          </div>

          <div className="border-t border-white/15">
            {content.financingSteps.map(([number, title, text]) => (
              <article
                key={number}
                className="grid gap-4 border-b border-white/10 py-8 sm:grid-cols-[70px_1fr] sm:gap-8"
              >
                <span className="pt-1 text-[0.58rem] font-bold text-[#D3B264]">
                  {number}
                </span>
                <div>
                  <h3 className="text-[1.25rem] font-medium tracking-[-0.03em] text-white">
                    {title}
                  </h3>
                  <p className="mt-3 max-w-[580px] text-[0.88rem] leading-[1.8] text-white/60">
                    {text}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>

        <p className="mt-12 max-w-[1050px] border-t border-white/10 pt-6 text-[0.7rem] leading-[1.75] text-white/50">
          {content.financingDisclaimer}
        </p>
      </div>
    </section>
  );
}
