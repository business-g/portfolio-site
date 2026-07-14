import { Suspense } from "react";
import Image from "next/image";
import { HomePortfolioContent } from "@/components/HomePortfolioContent";
import { UpButton } from "@/components/UpButton";

export default function RussianHome() {
  return (
    <main
      id="top"
      className="relative min-h-screen overflow-x-hidden bg-[var(--page-background)] pb-8"
    >
      <section className="mx-auto max-w-[1120px] pt-4 md:pt-[4.5rem]">
        <div className="mx-auto w-full px-4 md:max-w-[508px] md:px-0">
          <div className="home-reveal relative inline-flex" style={{ animationDelay: "0ms" }}>
            <Image
              src="/avatar-site.webp"
              alt="Bogdan avatar"
              width={60}
              height={60}
              sizes="60px"
              priority
              className="size-[60px] rounded-full object-cover shadow-[var(--shadow-soft)]"
            />
            <div className="absolute bottom-0 right-[-4px] size-5 overflow-hidden rounded-[4px] bg-white shadow-[0_0_1px_rgba(0,0,0,0.12)]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/coffee-icon.gif"
                alt=""
                width={12}
                height={14}
                loading="eager"
                decoding="async"
                fetchPriority="high"
                className="absolute left-1/2 top-1/2 h-[14px] w-3 -translate-x-1/2 -translate-y-1/2 object-cover"
              />
            </div>
          </div>

          <div className="mt-4 max-w-[508px] space-y-3">
            <p className="home-reveal type-body-large text-[var(--text-strong)]" style={{ animationDelay: "40ms" }}>
              Привет, я Богдан — продуктовый дизайнер с 6+ годами опыта.
            </p>
            <p className="home-reveal type-body-large text-[var(--text-body)]" style={{ animationDelay: "75ms" }}>
              Более 10 запущенных B2B- и B2C-продуктов. В числе проектов
              криптокошелёк, стейкинг-платформы, VPN-приложение,
              блокчейн-эксплорер, маркетплейс, роутер-админка, корпоративный
              мессенджер и платформа мотивации сотрудников.
            </p>
          </div>

        </div>
        <Suspense fallback={null}>
          <HomePortfolioContent
            tabLabels={{
              visual: "Визуал",
              interactive: "Прототипы",
              "case-studies": "Кейсы",
            }}
            caseStudiesNote="В процессе перевода"
            interactiveShotBadgeLabel="Кликабельный"
            gemraCaseStudyHref="/gemra?from=ru"
            gemraCaseStudyTitle="Gemra — стейкинг платформа"
            gemraCaseStudyDescription={
              <>
                Спроектировал стейкинг платформу с локапом с нуля до запуска:
                ресёрч, продуктовые решения, дизайн интерфейса.{" "}
                <span className="text-[#1C1C22]">
                  Привлёк $500K+ в&nbsp;застейканных токенах.
                </span>{" "}
                Итерация после запуска{" "}
                <span className="text-[#1C1C22]">
                  увеличила использование авто-реинвестирования на 44%.
                </span>
              </>
            }
            wawenCaseStudyHref="/wawen?from=ru"
            wawenCaseStudyTitle="Wawen — админ-панель роутера"
            wawenCaseStudyDescription={
              <>
                Разработал дизайн админ-панели роутера с нуля. Проработал
                информационную архитектуру, сценарии управления сетью и настройки
                VPN — так, чтобы интерфейс был понятен новичку и не ограничивал
                опытного пользователя.
              </>
            }
            kelvpnCaseStudyTitle="KelVPN — VPN-приложение"
            kelvpnCaseStudyDescription={
              <>
                Разработал дизайн VPN-приложения с двумя способами активации:
                подключением через ключ и&nbsp;арендой VPS. Проработал
                сценарии аренды серверов за криптовалюту, управления ордерами
                и настройки Hybrid VPN.
              </>
            }
          />
        </Suspense>
      </section>

      <UpButton />
    </main>
  );
}
