import { blueprintProjects } from "@/lib/blueprint/content";
import {
  BlueprintArrowIcon,
  BlueprintSectionHeading,
  blueprintContainer,
} from "@/components/blueprint/blueprint-ui";

export function BlueprintProjects() {
  return (
    <section className="bg-[#f8f6f1] py-24 sm:py-28">
      <div className={blueprintContainer}>
        <BlueprintSectionHeading
          kicker="Projetos reais"
          title={
            <>
              Alguns dos nossos projetos de{" "}
              <span className="text-[#a77d28]">Flip Houses</span>
            </>
          }
          description="Exemplos de operações imobiliárias realizadas com compra, reforma, estratégia de valorização, locação e venda no mercado americano."
        />
        <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {blueprintProjects.map((project) => (
            <article
              key={project.number}
              className="group overflow-hidden rounded-[28px] border border-black/[0.07] bg-white shadow-[0_18px_58px_rgba(15,15,15,0.06)] transition duration-300 hover:-translate-y-2 hover:border-[#c9a24d]/35 hover:shadow-[0_30px_80px_rgba(15,15,15,0.11)]"
            >
              <div className="relative h-[260px] overflow-hidden">
                <img
                  src={project.image}
                  alt={project.address}
                  loading="lazy"
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.04),rgba(0,0,0,0.62))]" />
                <span className="absolute left-5 top-5 grid h-10 w-10 place-items-center rounded-full bg-white text-[0.68rem] font-bold text-[#171614] shadow-lg">
                  {project.number}
                </span>
                <span className="absolute bottom-5 left-5 rounded-full border border-white/20 bg-black/35 px-3 py-2 text-[0.6rem] font-bold uppercase tracking-[0.13em] text-white backdrop-blur-md">
                  Projeto Checkmate
                </span>
              </div>
              <div className="p-7">
                <p className="text-[0.72rem] font-semibold text-[#8b6721]">
                  {project.address}
                </p>
                <h3 className="mt-3 text-[1.35rem] font-semibold leading-[1.18] tracking-[-0.04em] text-[#171614]">
                  Projeto de transformação imobiliária Checkmate
                </h3>
                <div className="mt-6 grid grid-cols-3 gap-2 border-y border-black/[0.07] py-4">
                  {(
                    [
                      ["Tipo", "Flip House"],
                      ["Estratégia", "Compra e reforma"],
                      ["Status", "Projeto realizado"],
                    ] as const
                  ).map(([label, value]) => (
                    <div key={label}>
                      <span className="text-[0.56rem] font-bold uppercase tracking-[0.11em] text-[#8a857c]">
                        {label}
                      </span>
                      <strong className="mt-1 block text-[0.72rem] font-semibold text-[#171614]">
                        {value}
                      </strong>
                    </div>
                  ))}
                </div>
                <a
                  href="#formb"
                  className="mt-6 inline-flex items-center gap-2 text-[0.72rem] font-bold uppercase tracking-[0.12em] text-[#8b6721]"
                >
                  Saiba mais <BlueprintArrowIcon />
                </a>
              </div>
            </article>
          ))}
        </div>
        <p className="mx-auto mt-8 max-w-[920px] text-center text-[0.72rem] leading-[1.6] text-[#7c776f]">
          Os projetos apresentados são exemplos reais de operações imobiliárias
          realizadas pela Checkmate. As informações detalhadas podem variar
          conforme cada projeto, etapa da obra, estratégia adotada e condições
          de mercado.
        </p>
      </div>
    </section>
  );
}
