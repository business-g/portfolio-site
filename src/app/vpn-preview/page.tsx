import { VpnPreviewShot } from "@/components/VpnPreviewShot";

export const metadata = {
  title: "VPN Preview",
  robots: {
    index: false,
    follow: false,
  },
};

export default function VpnPreviewPage() {
  return (
    <>
      <style>{`
        html,
        body {
          background: transparent !important;
        }
      `}</style>
      <div
        style={{
          width: "100vw",
          height: "100vh",
          overflow: "hidden",
          background: "transparent",
        }}
      >
        <VpnPreviewShot />
      </div>
    </>
  );
}
