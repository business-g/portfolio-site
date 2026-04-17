import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { AnalysisButtons } from "@/components/AnalysisButtons";

export const metadata: Metadata = {
  title: "Wawen case",
  description: "Case study for the Wawen router admin panel project.",
};

const introParagraph =
  "Wawen is a router with a built-in VPN. The brief was to design the admin panel from scratch. I worked on it end to end: from research and problem framing to information architecture, interaction design, and final interface.";

const challengeParagraph =
  "The admin panel had to serve two completely different people: someone who opens it once a year to change a\u00a0Wi-Fi password, and a network admin configuring WAN, LAN, and routing rules. On top of that, Wawen has a built-in Hybrid VPN where you control which traffic goes through the tunnel and which goes direct. A\u00a0feature most users have never seen before, which meant the interface had to explain it clearly enough that people actually use it.";

const researchParagraphs = [
  "I\u00a0was designing for a domain I knew nothing about, so first I had to figure out who I was actually designing for. Pretty quickly, it became obvious that a router admin panel has to serve two completely different people. One opens it once in a while to change a\u00a0Wi-Fi password. The other uses it to manage the network itself.",
  "To get a sense of how these panels usually work, I went through six router admin interfaces in emulators, including ASUS, TP-Link, and a few others. The same pattern showed up almost every time: simple actions were mixed with technical settings, with no real separation between them. Something as basic as changing a\u00a0Wi-Fi password was often sitting right next to encryption settings, channel controls, and other things most people would not know how to touch.",
  "Then I spoke with two network administrators to understand what the panel looks like from their side. They were not looking for “simple settings” or “advanced settings” as categories. They were looking for parts of the network: WAN, LAN, DHCP, routing, wireless, logs. In a lot of the panels I reviewed, those things were scattered across different tabs and sections, so even normal tasks meant jumping around the interface.",
  "That is what pushed the whole direction of the project. Casual users needed a\u00a0small set of obvious actions. Network admins needed the panel to follow the structure of the network. Trying to force both into the same interface was the problem, so I split the product into Basic and Advanced modes.",
] as const;

const homeTabParagraphs = [
  "After completing the research, defining the information architecture, and aligning on the visual style, the decision was made to use the home screen as a central dashboard. The dashboard provides a quick overview of the router’s current state and surfaces key controls and metrics that users interact with most often.",
  "From this screen, users can quickly manage VPN (on/off, quick server settings, hybrid mode), monitor traffic usage, view and control connected devices, check connection health, and review recent network activity — without navigating deep into settings.",
] as const;

const wirelessParagraph =
  "The Wireless tab is split to keep simple tasks simple. In Basic mode, users can quickly change the Wi-Fi name and password or turn Wi-Fi on and off. Advanced mode adds control over network mode, channel, transmit power, and encryption for more precise tuning.";

const networkParagraph =
  "The Network section follows the same logic as the rest of the admin. In Basic mode, it covers only what’s needed to get online, such as connection type and MAC address settings. Advanced mode unlocks full network configuration, including WAN, LAN, and DHCP server settings for more complex setups.";

const devicesParagraph =
  "The Devices section shows everything that is currently connected to the router. From here, users can see device types, connection status, signal strength, and access detailed device settings to manage behavior, limits, and network access.";

const vpnParagraph =
  "The key feature of the router is its built-in VPN and Hybrid VPN mode. The main challenge here was to clearly explain how Hybrid VPN works, what the difference is between Allowlist and Blacklist modes, and make managing these lists simple and intuitive. Since this functionality is new for most users, the interface intentionally includes clear explanations and guidance, so people don’t have to look elsewhere to understand how it works.";

const settingsParagraph =
  "This section is used for system preferences, firmware updates, access control, and basic router maintenance.";

const manualParagraph =
  "The Manual section covers main user scenarios and explains how key features work in real situations. It helps users understand what to do step by step, without digging into technical documentation or googling.";

const supportParagraph =
  "The Contact support section is used to send issues or questions directly to the support team and track submitted reports, with all communication handled via email.";

const impactItems = [
  "Designed the admin panel end to end: from competitive analysis and user interviews to information architecture and final interface.",
  "Translated two completely different use cases into one product by splitting the interface into Basic and Advanced modes, a decision that came directly from research.",
  "Designed the Hybrid VPN section from scratch, with inline explanations that make the concept clear enough to configure without googling what it means.",
  "The routers went to market and are in active use.",
] as const;

const headerNotes = [
  "Shows the current internet connection status at a glance.",
  "Allows switching between Basic and Advanced modes at any time.",
  "Provides quick access to router reboot without digging into settings.",
] as const;

const analysisButtons = [
  {
    id: "marinade",
    src: "/asus-logo.svg",
    alt: "Asus",
    width: 140,
    height: 40,
    className: "h-8 w-[110px] max-w-none object-contain md:h-12 md:w-[165px]",
  },
  {
    id: "everstake",
    src: "/tplink-logo.svg",
    alt: "TP-Link",
    width: 140,
    height: 40,
    className:
      "h-[35px] w-[120px] max-w-none object-contain md:h-[52.8px] md:w-[181.5px]",
  },
] as const;

const analysisContentOverrides = {
  marinade: {
    title: "Asus ZenWiFi AX",
    subtitle:
      "I started with ASUS since it’s a major player in the home router market, with around 12% global share. Looking through its admin panel helped me see how established brands approach router interfaces.",
    images: [
      {
        src: "/wawan/asus-interface-01.png",
        alt: "Asus ZenWiFi AX admin panel",
        width: 1024,
        height: 642,
        className: "block h-auto w-full",
      },
    ],
    items: [
      {
        label: "Powerful feature set with deep network control.",
        color: "#13A98B",
      },
      {
        label:
          "Clear separation between some feature groups for experienced users.",
        color: "#13A98B",
      },
      {
        label:
          "Supports complex scenarios like dual WAN and advanced routing.",
        color: "#13A98B",
      },
      {
        label: "Interface is overwhelming for non-technical users.",
        color: "#E4C723",
      },
      {
        label: "Basic tasks are mixed with low-level network options.",
        color: "#E4C723",
      },
      {
        label: "Heavy use of technical terminology without explanation.",
        color: "#E4C723",
      },
      {
        label: "Visual design feels dated and engineering-driven.",
        color: "#E4C723",
      },
    ],
  },
  everstake: {
    title: "Tp-link TUF Gaming BE6500",
    subtitle:
      "After ASUS, I tested a TP-Link router admin to see how another real product solves the same problems. Overall, the interface felt clearer and easier to work with, but not without issues.",
    images: [
      {
        src: "/wawan/tplink-interface-01.png",
        alt: "TP-Link TUF Gaming BE6500 admin panel",
        width: 1024,
        height: 642,
        className: "block h-auto w-full",
      },
    ],
    items: [
      {
        label:
          "Clear grouping of settings, basic and advanced features are well separated.",
        color: "#13A98B",
      },
      {
        label:
          "Most settings have short descriptions that explain their purpose.",
        color: "#13A98B",
      },
      {
        label:
          "The Advanced tab offers very fine-grained configuration control.",
        color: "#13A98B",
      },
      {
        label:
          "Heavy use of red makes errors and warnings hard to distinguish.",
        color: "#E4C723",
      },
      {
        label: "Spacing is inconsistent, with some screens feeling cramped.",
        color: "#E4C723",
      },
      {
        label: "Router reboot is hidden deep in the interface and hard to find.",
        color: "#E4C723",
      },
    ],
  },
} as const;

function HeroCover() {
  return (
    <div className="overflow-hidden rounded-[12px]">
      <Image
        src="/wawan-cover.svg"
        alt="Wawen router admin panel case study cover"
        width={1000}
        height={492}
        className="h-auto w-full"
        priority
      />
    </div>
  );
}

export default function WawanPage() {
  return (
    <main className="min-h-screen bg-[#fdfdfc] px-4 pb-8 pt-6 md:px-6 md:pb-24 md:pt-12 lg:px-12">
      <div className="mx-auto max-w-[1512px]">
        <div className="mx-auto max-w-[1000px]">
          <HeroCover />
        </div>

        <section className="mx-auto mt-8 max-w-[584px] md:mt-10">
          <h1 className="font-heading text-[20px] leading-6 font-medium text-[var(--text-strong)]">
            Wawen — router admin panel
          </h1>
          <p className="mt-3 type-body-large text-[var(--text-body)]">
            {introParagraph}
          </p>
        </section>

        <section className="mx-auto mt-14 max-w-[584px] md:mt-16">
          <h2 className="font-heading text-[17px] leading-6 font-medium text-[var(--text-strong)]">
            The challenge
          </h2>
          <p className="mt-3 type-body-large text-[var(--text-body)]">
            {challengeParagraph}
          </p>
        </section>

        <section className="mx-auto mt-14 max-w-[584px] md:mt-16">
          <h2 className="font-heading text-[17px] leading-6 font-medium text-[var(--text-strong)]">
            Research
          </h2>
          <div className="mt-3 space-y-3">
            {researchParagraphs.map((paragraph) => (
              <p key={paragraph} className="type-body-large text-[var(--text-body)]">
                {paragraph}
              </p>
            ))}
          </div>
        </section>
        <AnalysisButtons
          buttons={analysisButtons}
          contentOverrides={analysisContentOverrides}
        />

        <section className="mx-auto mt-14 max-w-[584px] md:mt-16">
          <h2 className="font-heading text-[17px] leading-6 font-medium text-[var(--text-strong)]">
            Home tab
          </h2>
          <div className="mt-3 space-y-3">
            {homeTabParagraphs.map((paragraph) => (
              <p key={paragraph} className="type-body-large text-[var(--text-body)]">
                {paragraph}
              </p>
            ))}
          </div>
        </section>

        <div className="mx-auto mt-6 max-w-[1000px]">
          <div className="overflow-hidden rounded-[12px] bg-[#F5F5F5] shadow-[0_0_0_1px_rgba(28,28,34,0.03)]">
            <Image
              src="/wawan/home-tab-01.svg"
              alt="Router admin panel home tab"
              width={1120}
              height={746}
              className="h-auto w-full"
            />
          </div>
          <div className="mt-3 grid grid-cols-2 gap-3">
            <div className="overflow-hidden rounded-[12px] bg-[#F5F5F5] shadow-[0_0_0_1px_rgba(28,28,34,0.03)]">
              <Image
                src="/wawan/vpn-control.svg"
                alt="VPN control panel"
                width={552}
                height={428}
                className="h-auto w-full"
              />
            </div>
            <div className="overflow-hidden rounded-[12px] bg-[#F5F5F5] shadow-[0_0_0_1px_rgba(28,28,34,0.03)]">
              <Image
                src="/wawan/traffic-usage.svg"
                alt="Traffic usage panel"
                width={552}
                height={428}
                className="h-auto w-full"
              />
            </div>
          </div>
          <div className="mt-3 overflow-hidden rounded-[12px] bg-[#F5F5F5] shadow-[0_0_0_1px_rgba(28,28,34,0.03)]">
            <Image
              src="/wawan/header.svg"
              alt="Router admin panel header"
              width={1120}
              height={94}
              className="h-auto w-full"
            />
          </div>
          <div className="mx-auto mt-6 max-w-[584px]">
            <p className="type-body-large text-[var(--text-body)]">
              The header keeps the most important controls and status always
              visible:
            </p>
            <div className="mt-3 space-y-3">
              {headerNotes.map((note) => (
                <p key={note} className="type-body-large text-[var(--text-body)]">
                  — {note}
                </p>
              ))}
            </div>
          </div>
        </div>

        <section className="mx-auto mt-14 max-w-[584px] md:mt-16">
          <h2 className="font-heading text-[17px] leading-6 font-medium text-[var(--text-strong)]">
            Wireless
          </h2>
          <p className="mt-3 type-body-large text-[var(--text-body)]">
            {wirelessParagraph}
          </p>
        </section>

        <div className="mx-auto mt-6 max-w-[1000px] space-y-6">
          <div>
            <div className="overflow-hidden rounded-[12px] bg-[#F5F5F5] shadow-[0_0_0_1px_rgba(28,28,34,0.03)]">
              <Image
                src="/wawan/wireless-basic.svg"
                alt="Wireless basic mode"
                width={1120}
                height={746}
                className="h-auto w-full"
              />
            </div>
            <p className="type-caption mt-3 text-center text-[#5F5D68]">
              Wireless Basic mode
            </p>
          </div>
          <div>
            <div className="overflow-hidden rounded-[12px] bg-[#F5F5F5] shadow-[0_0_0_1px_rgba(28,28,34,0.03)]">
              <Image
                src="/wawan/wireless-advanced.svg"
                alt="Wireless advanced mode"
                width={1120}
                height={746}
                className="h-auto w-full"
              />
            </div>
            <p className="type-caption mt-3 text-center text-[#5F5D68]">
              Wireless Advanced mode
            </p>
          </div>
        </div>

        <section className="mx-auto mt-14 max-w-[584px] md:mt-16">
          <h2 className="font-heading text-[17px] leading-6 font-medium text-[var(--text-strong)]">
            Network
          </h2>
          <p className="mt-3 type-body-large text-[var(--text-body)]">
            {networkParagraph}
          </p>
        </section>

        <div className="mx-auto mt-6 max-w-[1000px] space-y-6">
          <div>
            <div className="overflow-hidden rounded-[12px] bg-[#F5F5F5] shadow-[0_0_0_1px_rgba(28,28,34,0.03)]">
              <Image
                src="/wawan/network-basic.svg"
                alt="Network basic mode"
                width={1120}
                height={746}
                className="h-auto w-full"
              />
            </div>
            <p className="type-caption mt-3 text-center text-[#5F5D68]">
              Network Basic mode
            </p>
          </div>
          <div>
            <div className="overflow-hidden rounded-[12px] bg-[#F5F5F5] shadow-[0_0_0_1px_rgba(28,28,34,0.03)]">
              <Image
                src="/wawan/network-wan.svg"
                alt="Network WAN advanced mode"
                width={1120}
                height={746}
                className="h-auto w-full"
              />
            </div>
            <p className="type-caption mt-3 text-center text-[#5F5D68]">
              Network (WAN) Advanced
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <div className="overflow-hidden rounded-[12px] bg-[#F5F5F5] shadow-[0_0_0_1px_rgba(28,28,34,0.03)]">
                <Image
                  src="/wawan/network-lan.svg"
                  alt="Network LAN advanced mode"
                  width={552}
                  height={382}
                  className="h-auto w-full"
                />
              </div>
              <p className="type-caption mt-3 text-center text-[#5F5D68]">
                Network (LAN) Advanced
              </p>
            </div>
            <div>
              <div className="overflow-hidden rounded-[12px] bg-[#F5F5F5] shadow-[0_0_0_1px_rgba(28,28,34,0.03)]">
                <Image
                  src="/wawan/network-dhcp.svg"
                  alt="Network DHCP advanced mode"
                  width={552}
                  height={382}
                  className="h-auto w-full"
                />
              </div>
              <p className="type-caption mt-3 text-center text-[#5F5D68]">
                Network (DHCP) Advanced
              </p>
            </div>
          </div>
        </div>

        <section className="mx-auto mt-14 max-w-[584px] md:mt-16">
          <h2 className="font-heading text-[17px] leading-6 font-medium text-[var(--text-strong)]">
            Devices
          </h2>
          <p className="mt-3 type-body-large text-[var(--text-body)]">
            {devicesParagraph}
          </p>
        </section>

        <div className="mx-auto mt-6 max-w-[1000px] space-y-3">
          <div className="overflow-hidden rounded-[12px] bg-[#F5F5F5] shadow-[0_0_0_1px_rgba(28,28,34,0.03)]">
            <Image
              src="/wawan/devices.svg"
              alt="Devices overview"
              width={1120}
              height={746}
              className="h-auto w-full"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="overflow-hidden rounded-[12px] bg-[#F5F5F5] shadow-[0_0_0_1px_rgba(28,28,34,0.03)]">
              <Image
                src="/wawan/connected-devices.svg"
                alt="Connected devices list"
                width={552}
                height={711}
                className="h-auto w-full"
              />
            </div>
            <div className="overflow-hidden rounded-[12px] bg-[#F5F5F5] shadow-[0_0_0_1px_rgba(28,28,34,0.03)]">
              <Image
                src="/wawan/device-details.svg"
                alt="Device details screen"
                width={552}
                height={711}
                className="h-auto w-full"
              />
            </div>
          </div>
        </div>

        <section className="mx-auto mt-14 max-w-[584px] md:mt-16">
          <h2 className="font-heading text-[17px] leading-6 font-medium text-[var(--text-strong)]">
            VPN
          </h2>
          <p className="mt-3 type-body-large text-[var(--text-body)]">
            {vpnParagraph}
          </p>
        </section>

        <div className="mx-auto mt-6 max-w-[1000px] space-y-3">
          <div className="overflow-hidden rounded-[12px] bg-[#F5F5F5] shadow-[0_0_0_1px_rgba(28,28,34,0.03)]">
            <Image
              src="/wawan/vpn-main.svg"
              alt="VPN main screen"
              width={1120}
              height={746}
              className="h-auto w-full"
            />
          </div>
          <div className="overflow-hidden rounded-[12px] bg-[#F5F5F5] shadow-[0_0_0_1px_rgba(28,28,34,0.03)]">
            <Image
              src="/wawan/hybrid-vpn-settings.svg"
              alt="Hybrid VPN settings"
              width={1120}
              height={746}
              className="h-auto w-full"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="overflow-hidden rounded-[12px] bg-[#F5F5F5] shadow-[0_0_0_1px_rgba(28,28,34,0.03)]">
              <Image
                src="/wawan/hybrid-settings-2.svg"
                alt="Hybrid VPN settings step 2"
                width={552}
                height={382}
                className="h-auto w-full"
              />
            </div>
            <div className="overflow-hidden rounded-[12px] bg-[#F5F5F5] shadow-[0_0_0_1px_rgba(28,28,34,0.03)]">
              <Image
                src="/wawan/hybrid-settings-3.svg"
                alt="Hybrid VPN settings step 3"
                width={552}
                height={382}
                className="h-auto w-full"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="overflow-hidden rounded-[12px] bg-[#F5F5F5] shadow-[0_0_0_1px_rgba(28,28,34,0.03)]">
              <Image
                src="/wawan/hybrid-settings-4.svg"
                alt="Hybrid VPN settings step 4"
                width={552}
                height={382}
                className="h-auto w-full"
              />
            </div>
            <div className="overflow-hidden rounded-[12px] bg-[#F5F5F5] shadow-[0_0_0_1px_rgba(28,28,34,0.03)]">
              <Image
                src="/wawan/hybrid-settings-5.svg"
                alt="Hybrid VPN settings step 5"
                width={552}
                height={382}
                className="h-auto w-full"
              />
            </div>
          </div>
        </div>

        <section className="mx-auto mt-14 max-w-[584px] md:mt-16">
          <h2 className="font-heading text-[17px] leading-6 font-medium text-[var(--text-strong)]">
            Settings
          </h2>
          <p className="mt-3 type-body-large text-[var(--text-body)]">
            {settingsParagraph}
          </p>
        </section>

        <div className="mx-auto mt-6 max-w-[1000px] overflow-hidden rounded-[12px] bg-[#F5F5F5] shadow-[0_0_0_1px_rgba(28,28,34,0.03)]">
          <Image
            src="/wawan/settings.svg"
            alt="Router settings screen"
            width={1120}
            height={746}
            className="h-auto w-full"
          />
        </div>

        <section className="mx-auto mt-14 max-w-[584px] md:mt-16">
          <h2 className="font-heading text-[17px] leading-6 font-medium text-[var(--text-strong)]">
            Manual
          </h2>
          <p className="mt-3 type-body-large text-[var(--text-body)]">
            {manualParagraph}
          </p>
        </section>

        <div className="mx-auto mt-6 max-w-[1000px] space-y-3">
          <div className="overflow-hidden rounded-[12px] bg-[#F5F5F5] shadow-[0_0_0_1px_rgba(28,28,34,0.03)]">
            <Image
              src="/wawan/manual-1.svg"
              alt="Manual screen 1"
              width={1120}
              height={746}
              className="h-auto w-full"
            />
          </div>
          <div className="overflow-hidden rounded-[12px] bg-[#F5F5F5] shadow-[0_0_0_1px_rgba(28,28,34,0.03)]">
            <Image
              src="/wawan/manual-2.svg"
              alt="Manual screen 2"
              width={1120}
              height={746}
              className="h-auto w-full"
            />
          </div>
        </div>

        <section className="mx-auto mt-14 max-w-[584px] md:mt-16">
          <h2 className="font-heading text-[17px] leading-6 font-medium text-[var(--text-strong)]">
            Contact support
          </h2>
          <p className="mt-3 type-body-large text-[var(--text-body)]">
            {supportParagraph}
          </p>
        </section>

        <div className="mx-auto mt-6 max-w-[1000px] overflow-hidden rounded-[12px] bg-[#F5F5F5] shadow-[0_0_0_1px_rgba(28,28,34,0.03)]">
          <Image
            src="/wawan/support-img.svg"
            alt="Contact support screen"
            width={1120}
            height={746}
            className="h-auto w-full"
          />
        </div>

        <section className="mx-auto mt-14 max-w-[584px] md:mt-16">
          <h2 className="font-heading text-[17px] leading-6 font-medium text-[var(--text-strong)]">
            Impact
          </h2>
          <div className="mt-3 space-y-3">
            {impactItems.map((item) => (
              <p key={item} className="type-body-large text-[var(--text-body)]">
                — {item}
              </p>
            ))}
          </div>
        </section>

        <div className="mx-auto mt-6 max-w-[1000px] overflow-hidden rounded-[12px] bg-[#F5F5F5] shadow-[0_0_0_1px_rgba(28,28,34,0.03)]">
          <Image
            src="/wawan/login-screen.png"
            alt="Router login screen"
            width={2240}
            height={1492}
            className="h-auto w-full"
          />
        </div>

        <div className="mx-auto mt-12 max-w-[584px]">
          <Link
            href="/?tab=case-studies"
            className="type-body-medium flex h-12 items-center justify-center rounded-[12px] bg-[#F5F5F5] text-[var(--text-strong)] hover:bg-[#EBEBEB] focus-visible:bg-[#EBEBEB]"
          >
            Home page
          </Link>
        </div>
      </div>
    </main>
  );
}
