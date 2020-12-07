import { Link } from 'gatsby';
import React from 'react';
import styled from 'styled-components';

const PaginationStyles = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid var(--grey);
  margin: 2rem 0;
  border-radius: 5px;
  gap: 1rem;
  text-align: center;
  & > * {
    border-right: 1px solid var(--grey);
    text-align: center;
    flex: 1;
    text-decoration: none;
    &[aria-current],
    &.current {
      color: var(--red);
    }
    &[disabled] {
      pointer-events: none;
      color: var(--grey);
    }
  }
`;

export default function Pagination({
  pageSize,
  totalCount,
  currentPage,
  skip,
  base,
}) {
  const totalPages = Math.ceil(totalCount / pageSize);
  const nextPage = currentPage + 1;
  const prevPage = currentPage - 1;

  const hasNextPage = nextPage <= totalPages;
  const hasPrevPage = prevPage >= 1;

  return (
    <PaginationStyles>
      <Link disabled={!hasPrevPage} to={`${base}/${prevPage}`}>
        ← Prev
      </Link>
      {Array.from({ length: totalPages }).map((_, i) => (
        <Link
          className={currentPage === 1 && i === 0 ? 'current' : ''}
          key={i}
          to={`${base}/${i + 1}`}
        >
          {i + 1}
        </Link>
      ))}
      <Link disabled={!hasNextPage} to={`${base}/${nextPage}`}>
        Next →
      </Link>
    </PaginationStyles>
  );
}