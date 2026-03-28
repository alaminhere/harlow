'use client';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const AppPagination = ({ totalPage }) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const route = useRouter();
  const [currentPage, setCurrentPage] = useState();

  const pages = Array.from({ length: totalPage }, (_, index) => index);

  const getPages = () => {
    const page = [];
    const start = Math.max(currentPage - 2, 1);
    const end = Math.min(currentPage + 2, totalPage);
    for (let i = start; i <= end; i++) page.push(i);
    return page;
  };

  const handlePage = value => {
    const params = new URLSearchParams(searchParams);
    params.set('page', value);
    route.push(`${pathname}?${params}`);
  };

  useEffect(() => {
    const defaultPage = () => {
      setCurrentPage(Number(searchParams.get('page') || 1));
    };
    defaultPage();
  }, [searchParams]);

  return (
    <Pagination>
      <PaginationContent>
        {currentPage >= 2 && (
          <PaginationItem>
            <PaginationPrevious
              onClick={() => handlePage(currentPage - 1)}
              className="cursor-pointer text-text-muted transition-colors hover:bg-surface hover:text-primary"
            />
          </PaginationItem>
        )}

        {getPages().map((item, index) =>
          item === '...' ? (
            <PaginationItem key={`ellipsis-${index}`}>
              <PaginationEllipsis className="text-text-muted" />
            </PaginationItem>
          ) : (
            <PaginationItem key={item}>
              <PaginationLink
                className={
                  item === currentPage
                    ? 'cursor-pointer border border-primary bg-btn-primary-bg text-btn-primary-text hover:bg-btn-primary-bg hover:text-btn-primary-text'
                    : 'cursor-pointer border border-border bg-surface text-text transition-colors hover:border-border-hover hover:bg-background hover:text-primary'
                }
                isActive={item === currentPage}
                onClick={() => handlePage(item)}
              >
                {item}
              </PaginationLink>
            </PaginationItem>
          ),
        )}

        {currentPage < totalPage && (
          <PaginationItem>
            <PaginationNext
              onClick={() => handlePage(currentPage + 1)}
              className="cursor-pointer text-text-muted transition-colors hover:bg-surface hover:text-primary"
            />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
};
export default AppPagination;
