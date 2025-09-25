import { MovieCard } from "@/components/home";
import { movieResponseType } from "@/types";
import { getMoviesList } from "@/utils/get-data";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

type MorePageProps = {
  searchParams: Promise<{ title: string; page: string }>;
  params: Promise<{ link: string }>;
};

const MorePage = async ({ searchParams, params }: MorePageProps) => {
  const dynamicRoute = await params;
  const link = dynamicRoute.link;

  // https://localhost:3000/seeMore/upcoming?page=1

  const searchQuery = await searchParams;
  const title = searchQuery.title;
  const page = searchQuery.page || "1";

  const moviesRes: movieResponseType = await getMoviesList(title, page);
  // /more?title=upcoming&page=3

  const currentUrl = `/more?title=${title}&`;
  return (
    <>
      <div className="flex gap-4 flex-wrap">
        {moviesRes.results.map((movie) => (
          <MovieCard
            key={movie.id}
            id={movie.id}
            title={movie.title}
            score={movie.vote_average}
            image={movie.poster_path}
          />
        ))}
      </div>

      <Pagination>
        <PaginationContent>
          {page !== "1" && (
            <>
              <PaginationItem>
                <PaginationPrevious
                  href={`${currentUrl}page=${Number(page) - 1}`}
                />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href={`${currentUrl}page=${Number(page) - 1}`}>
                  {Number(page) - 1}
                </PaginationLink>
              </PaginationItem>
            </>
          )}

          <PaginationItem>
            <PaginationLink isActive href="#">
              {page}
            </PaginationLink>
          </PaginationItem>

          <PaginationItem>
            <PaginationLink href={`${currentUrl}page=${Number(page) + 1}`}>
              {Number(page) + 1}
            </PaginationLink>
          </PaginationItem>

          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href={`${currentUrl}page=${Number(page) + 1}`} />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </>
  );
};

export default MorePage;
