import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="text-center py-4">
      <p>made by &nbsp;
        <Link className="hover:text-red-600 transition-colors duration-150" href="https://github.com/rockleona" target="_blank" rel="noreferrer">
          rockleona
        </Link>
        &nbsp; with ❤️ and chill vibe 🍵</p>
    </footer>
  );
}