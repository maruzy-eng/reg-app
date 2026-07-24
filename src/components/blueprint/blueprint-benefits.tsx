import { blueprintBenefits } from "@/lib/blueprint/content";
import {
  BlueprintArrowIcon,
  BlueprintSectionHeading,
  blueprintContainer,
} from "@/components/blueprint/blueprint-ui";

export function BlueprintBenefits() {
  return (
    <section className="bg-[#f8f6f1] py-24 sm:py-28">
      <div className={blueprintContainer}>
        <BlueprintSectionHeading
          kicker="O que você recebe"
          title={
            <>
              O que o{" "}
              <span className="text-[#a77d28]">Checkmate Blueprint</span>{" "}
              entrega para você
            </>
          }
          description="Uma estrutura completa para quem quer entrar no mercado imobiliário dos EUA com educação, tecnologia, suporte e oportunidades reais."
        />
        <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {blueprintBenefits.map((item) => (
            <article
              key={item.number}
              className="group overflow-hidden rounded-[28px] border border-black/[0.07] bg-white shadow-[0_18px_60px_rgba(15,15,15,0.06)] transition duration-300 hover:-translate-y-2 hover:border-[#c9a24d]/35 hover:shadow-[0_30px_80px_rgba(15,15,15,0.11)]"
            >
              <div className="relative h-[245px] overflow-hidden">
                <img
                  src={item.image}
                  alt={item.alt}
                  loading="lazy"
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.06]"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.03),rgba(0,0,0,0.62))]" />
                <span className="absolute left-5 top-5 grid h-10 w-10 place-items-center rounded-full border border-white/25 bg-black/30 text-[0.68rem] font-bold text-white backdrop-blur-md">
                  {item.number}
                </span>
                <span className="absolute bottom-5 left-5 rounded-full bg-[#c9a24d] px-3 py-2 text-[0.6rem] font-bold uppercase tracking-[0.13em] text-white">
                  {item.tag}
                </span>
              </div>
              <div className="p-7">
                <h3 className="text-[1.32rem] font-semibold leading-[1.2] tracking-[-0.04em] text-[#171614]">
                  {item.title}
                </h3>
                <p className="mt-4 text-[0.84rem] leading-[1.7] text-[#68635b]">
                  {item.description}
                </p>
                <a
                  href="#formb"
                  className="mt-7 inline-flex items-center gap-2 text-[0.72rem] font-bold uppercase tracking-[0.12em] text-[#8b6721] transition hover:text-[#171614]"
                >
                  Saiba mais <BlueprintArrowIcon />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
