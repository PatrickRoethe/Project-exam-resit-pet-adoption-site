import Button from "./Button";

/**
 * Pagination
 * Props:
 * - page          (nåværende side, 1-indeksert)
 * - totalPages    (antall sider)
 * - onChange(pageNumber)
 */
export default function Pagination({ page, totalPages, onChange }) {
  const isFirst = page === 1;
  const isLast = page === totalPages || totalPages === 0;

  return (
    <div className="flex items-center justify-center gap-4">
      {/* First Page */}
      <Button
        variant={isFirst ? "disabled" : "secondary"}
        onClick={() => !isFirst && onChange(1)}
        disabled={isFirst}
      >
        First
      </Button>

      {/* Previous */}
      <Button
        variant={isFirst ? "disabled" : "secondary"}
        onClick={() => !isFirst && onChange(page - 1)}
        disabled={isFirst}
      >
        Prev
      </Button>

      {/* Teller */}
      <span className="text-sm">
        Page {page} of {totalPages || 1}
      </span>

      {/* Next */}
      <Button
        variant={isLast ? "disabled" : "secondary"}
        onClick={() => !isLast && onChange(page + 1)}
        disabled={isLast}
      >
        Next
      </Button>
    </div>
  );
}
