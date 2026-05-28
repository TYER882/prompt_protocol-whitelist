//src/components/Logo.tsx
import LogoGif from "../assets/Frame21-ezgif.com-crop.png";
export default function Logo() {
  return (
    <div className="grid size-[50px] place-items-center rounded-md border border-emerald-300/40 shadow-glow">
      <img src={LogoGif} alt="Terminal9X Logo" width={60} height={60} />
    </div>
  );
}
