 
interface PaginatorProps {
  page: number;
  totalPages: number;
  onPageChange: (newPage: number) => void;
}

const Paginator = ({ page, totalPages, onPageChange }: PaginatorProps) => {
  const isFirstPage = page === 1;
  const isLastPage = page === totalPages;

  const handlePrevious = () => {
    if (!isFirstPage) {
      onPageChange(page - 1);
    }
  };

  const handleNext = () => {
    if (!isLastPage) {
      onPageChange(page + 1);
    }
  };

  return (
    <div className="flex items-center justify-center space-x-4 mt-8">
      <button 
        onClick={handlePrevious} 
        disabled={isFirstPage}
        className="px-4 py-2 border rounded-lg disabled:opacity-50 text-white"
      >
        Anterior
      </button>

      <span className="text-white">Página {page} de {totalPages}</span>

      <button 
        onClick={handleNext} 
        disabled={isLastPage}
        className="px-4 py-2 border rounded-lg disabled:opacity-50 text-white"
      >
        Siguiente
      </button>
    </div>
  );
};

export default Paginator;