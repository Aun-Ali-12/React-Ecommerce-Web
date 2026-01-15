const Pagination = ({ itemsPerPage, totalItems, onPageChange }) => {

    const totalPages = Math.ceil(totalItems / itemsPerPage)

    if (totalPages <= 1) return null

    return (
        <>
            <div className="flex justify-center gap-10">
                {
                    Array.from({ length: totalPages }).map((_, index) => {
                        const page = index + 1

                        return (
                            <button className="bg-blue-500 px-3 py-1 rounded-md text-white focus:bg-orange-500 focus:outline-none" key={page} onClick={() => { onPageChange(page) }}>{page}</button>
                        )
                    })
                }
            </div>
        </>
    )
}
export default Pagination