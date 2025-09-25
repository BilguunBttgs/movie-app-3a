import { Search } from "lucide-react";
import { ThemeToggler } from "../home";
import { Input } from "../ui/input";
import { GenreDropdown } from "./GenreDropdown";
import { SearchSection } from "./SearchSection";
import { MobileSearch } from "./MobileSearch";
import { GenreResponseType } from "@/types";
import { getMovieGenres } from "@/utils/get-data";

export const Header = async () => {
  const genresResponse: GenreResponseType = await getMovieGenres();
  return (
    <header className="w-full">
      <div className="max-w-[1280px] flex justify-between m-auto items-center py-3">
        <div>
          <img src="/assets/moviez.png" className="h-5 hidden sm:block" />
        </div>

        {/* desktop */}
        <div className="gap-5 hidden sm:flex">
          <GenreDropdown genresResponse={genresResponse} />
          <div className="flex items-center">
            <Search className="-mr-8" />
            <SearchSection />
          </div>
        </div>

        {/* Mobile */}
        <MobileSearch genresResponse={genresResponse} />
        <div>
          <ThemeToggler />
        </div>
      </div>
    </header>
  );
};
