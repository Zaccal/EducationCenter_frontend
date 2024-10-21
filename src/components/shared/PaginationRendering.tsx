import { PaginationItem, PaginationLink } from '@/components/ui/pagination'

type TypeOnPagination = (index: number) => void

const PaginationRendering = (
    totalPages: number,
    currentPage: number,
    onPagination: TypeOnPagination
) => {
    const showLastPages = totalPages - currentPage <= 4
    const pageNumbers = []

    if (!showLastPages) {
        for (let i = totalPages - 3; i <= totalPages; i++) {
            pageNumbers.push(
                <PaginationItem key={i}>
                    <PaginationLink
                        isActive={i === currentPage}
                        onClick={() => onPagination(i)}
                        href="#"
                    >
                        {i}
                    </PaginationLink>
                </PaginationItem>
            )
        }
    } else {
        for (
            let i = currentPage;
            i <= Math.min(currentPage + 3, totalPages);
            i++
        ) {
            pageNumbers.push(
                <PaginationItem key={i}>
                    <PaginationLink
                        isActive={i === currentPage}
                        onClick={() => onPagination(i)}
                        href="#"
                    >
                        {i}
                    </PaginationLink>
                </PaginationItem>
            )
        }
    }

    return pageNumbers
}

export default PaginationRendering
