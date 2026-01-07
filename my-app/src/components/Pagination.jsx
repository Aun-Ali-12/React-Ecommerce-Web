const Pagination = ({ currentPage, itemsPerPage, totalItems, onPageChange }) => {

    const totalPages = Math.ceil(totalItems / itemsPerPage)

    if (totalPages <= 1) return null

    return (
        <>
            <div className="pagination">
                {
                    Array.from({ length: totalPages }).map((_, index) => {
                        const page = index + 1

                        return (
                            <button key={page} onClick={() => { onPageChange(page) }}>{page}</button>
                        )
                    })
                }
            </div>
        </>
    )
}
export default Pagination