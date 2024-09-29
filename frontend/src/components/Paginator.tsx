interface TablePaginatorProps {
  pageNumber: number
  totalPages: number
  setPageNumber: (pageNumber: number) => void
}

export const TablePaginator = ({
  pageNumber,
  totalPages,
  setPageNumber
}: TablePaginatorProps) => {
  const handleFirst = () => {
    setPageNumber(0)
  }
  const handlePrev = () => {
    if (pageNumber > 0) {
      setPageNumber(pageNumber - 1)
    }
  }
  const handleNext = () => {
    if (pageNumber < totalPages - 1) {
      setPageNumber(pageNumber + 1)
    }
  }
  const handleLast = () => {
    setPageNumber(totalPages - 1)
  }

  const isLast = pageNumber === totalPages - 1
  const isFirst = pageNumber === 0

  return (
    <div className="paginator">
      <md-text-button onClick={handleFirst} disabled={isFirst ? true : null}>
        First
      </md-text-button>
      <md-text-button onClick={handlePrev} disabled={isFirst ? true : null}>
        Previous
      </md-text-button>
      <md-text-button onClick={handleNext} disabled={isLast ? true : null}>
        Next
      </md-text-button>
      <md-text-button onClick={handleLast} disabled={isLast ? true : null}>
        Last
      </md-text-button>
    </div>
  )
}
