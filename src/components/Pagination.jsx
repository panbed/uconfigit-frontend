import LeftArrowIcon from './Icons/LeftArrowIcon'
import RightArrowIcon from './Icons/RightArrowIcon'

function Pagination({ currentPage, totalPages, onPageChange }) {
  return (
    <>
      <button className='btn btn-small btn-link btn-icon-left' onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 0}>
        <LeftArrowIcon />
        Previous
      </button>

      <span>
        Page {currentPage + 1} of {totalPages + 1}
      </span>

      <button className='btn btn-small btn-link btn-icon-right' onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages}>
        Next
        <RightArrowIcon />
      </button>
    </>
  )
}

export default Pagination;