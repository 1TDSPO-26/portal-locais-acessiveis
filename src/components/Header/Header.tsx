import Menu from "../Menu/Menu";
import IconLogo from "../IconLogo/IconLogo";

export default function Header() {
  return (
    <header className="border-b border-gray-200 bg-white dark:border-slate-700 dark:bg-slate-900">
      <div className="relative mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="/" className="flex items-center gap-2 text-base font-semibold text-gray-900 dark:text-white">
          <IconLogo className="h-6 w-6" />
          ACESSO+
        </a>
        <Menu />
      </div>
    </header>
  );
}