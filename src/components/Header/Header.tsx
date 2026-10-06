import Menu from "../Menu/Menu";
import IconLogo from "../IconLogo/IconLogo";
import { focusRing } from "../../design-system/tokens";

export default function Header() {
  return (
    <header className="border-line border-b bg-surface">
      <div className="relative mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a
          href="/"
          className={`flex items-center gap-2 rounded text-base font-semibold text-text-main ${focusRing}`}
        >
          <IconLogo className="h-6 w-6" />
          ACESSO+
        </a>
        <Menu />
      </div>
    </header>
  );
}