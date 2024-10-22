import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '@/components/ui/pagination'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'

interface PaginationWithLinksProps {
    pageSizeSelectOptions?: {
        pageSizeSearchParam?: string
        pageSizeOptions: number[]
    }
    totalCount: number
    pageSize: number
    page: number
    pageSearchParam?: string
    className?: string
}

export function PaginationDashboard({
    pageSizeSelectOptions,
    pageSize,
    totalCount,
    page,
    pageSearchParam,
    className,
}: PaginationWithLinksProps) {
    const navigate = useNavigate()
    const totalPageCount = Math.ceil(totalCount / pageSize)

    const buildLink = useCallback(
        (newPage: number) => {
            const key = pageSearchParam || 'page'
            const searchParams = new URLSearchParams(window.location.search)
            searchParams.set(key, String(newPage))
            return `${window.location.pathname}?${searchParams.toString()}`
        },
        [pageSearchParam]
    )

    const navigateToPage = useCallback(
        (newPage: number) => {
            const link = buildLink(newPage)
            navigate(link, { replace: true }) // This will navigate without reloading the page
        },
        [navigate, buildLink]
    )

    const navToPageSize = useCallback(
        (newPageSize: number) => {
            const key = pageSizeSelectOptions?.pageSizeSearchParam || 'pageSize'
            const searchParams = new URLSearchParams(window.location.search)
            searchParams.set(key, String(newPageSize))
            const link = `${
                window.location.pathname
            }?${searchParams.toString()}`
            navigate(link, { replace: true }) // Navigate without reloading the page
        },
        [navigate, pageSizeSelectOptions]
    )

    const renderPageNumbers = () => {
        const items = []
        const maxVisiblePages = 5

        if (totalPageCount <= maxVisiblePages) {
            for (let i = 1; i <= totalPageCount; i++) {
                items.push(
                    <PaginationItem key={i}>
                        <PaginationLink
                            onClick={() => navigateToPage(i)}
                            isActive={page === i}
                        >
                            {i}
                        </PaginationLink>
                    </PaginationItem>
                )
            }
        } else {
            items.push(
                <PaginationItem key={1}>
                    <PaginationLink
                        onClick={() => navigateToPage(1)}
                        isActive={page === 1}
                    >
                        1
                    </PaginationLink>
                </PaginationItem>
            )

            if (page > 3) {
                items.push(
                    <PaginationItem key="ellipsis-start">
                        <PaginationEllipsis />
                    </PaginationItem>
                )
            }

            const start = Math.max(2, page - 1)
            const end = Math.min(totalPageCount - 1, page + 1)
            for (let i = start; i <= end; i++) {
                items.push(
                    <PaginationItem key={i}>
                        <PaginationLink
                            onClick={() => navigateToPage(i)}
                            isActive={page === i}
                        >
                            {i}
                        </PaginationLink>
                    </PaginationItem>
                )
            }

            if (page < totalPageCount - 2) {
                items.push(
                    <PaginationItem key="ellipsis-end">
                        <PaginationEllipsis />
                    </PaginationItem>
                )
            }

            items.push(
                <PaginationItem key={totalPageCount}>
                    <PaginationLink
                        onClick={() => navigateToPage(totalPageCount)}
                        isActive={page === totalPageCount}
                    >
                        {totalPageCount}
                    </PaginationLink>
                </PaginationItem>
            )
        }
        return items
    }

    return (
        <div className={className}>
            <div className="flex flex-col md:flex-row items-center gap-3 w-full">
                {pageSizeSelectOptions && (
                    <div className="flex flex-col gap-4 flex-1">
                        <SelectRowsPerPage
                            options={pageSizeSelectOptions.pageSizeOptions}
                            setPageSize={navToPageSize}
                            pageSize={pageSize}
                        />
                    </div>
                )}
                <Pagination className="md:justify-end">
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious
                                onClick={() =>
                                    navigateToPage(Math.max(page - 1, 1))
                                }
                                aria-disabled={page === 1}
                                className={
                                    page === 1
                                        ? 'pointer-events-none opacity-50'
                                        : ''
                                }
                            />
                        </PaginationItem>
                        {renderPageNumbers()}
                        <PaginationItem>
                            <PaginationNext
                                onClick={() =>
                                    navigateToPage(
                                        Math.min(page + 1, totalPageCount)
                                    )
                                }
                                aria-disabled={page === totalPageCount}
                                className={
                                    page === totalPageCount
                                        ? 'pointer-events-none opacity-50'
                                        : ''
                                }
                            />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            </div>
        </div>
    )
}

interface SelectRowsPerPageProps {
    options: number[]
    setPageSize: (newSize: number) => void
    pageSize: number
}

function SelectRowsPerPage({
    options,
    setPageSize,
    pageSize,
}: SelectRowsPerPageProps) {
    return (
        <Select
            value={String(pageSize)}
            onValueChange={(value: string) => setPageSize(Number(value))}
        >
            <SelectTrigger>
                <SelectValue />
            </SelectTrigger>
            <SelectContent>
                {options.map((option) => (
                    <SelectItem key={option} value={String(option)}>
                        {option} per page
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    )
}
