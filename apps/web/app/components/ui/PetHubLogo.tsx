import Link from "next/link";
import AppIcon from "./AppIcon";

type PetHubLogoProps = {
  href?: string;
  iconSize?: number;
  textSize?: "sm" | "md" | "lg";
  showIcon?: boolean;
  className?: string;
};

const textSizes = {
  sm: "text-lg",
  md: "text-xl",
  lg: "text-2xl",
};

export default function PetHubLogo({
  href = "/",
  iconSize = 25,
  textSize = "md",
  showIcon = true,
  className = "",
}: PetHubLogoProps) {
  return (
    <Link
      href={href}
      aria-label="PetHub.id - Beranda"
      className={`inline-flex w-fit items-center gap-2 ${className}`}
    >
      {showIcon && (
        <span className="flex shrink-0 items-center justify-center text-[#2F7D4A]">
          <AppIcon name="paw" size={iconSize} />
        </span>
      )}

      <span
        className={`${textSizes[textSize]} whitespace-nowrap font-medium tracking-tight`}
      >
        <span className="text-[#2F7D4A]">Pet</span>
        <span className="text-[#F28C28]">Hub</span>
        <span className="text-[#171717]">.id</span>
      </span>
    </Link>
  );
}
