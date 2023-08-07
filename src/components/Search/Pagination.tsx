"use client"

import { Button } from "@shadcn/button"
import { ToggleGroup, ToggleGroupItem } from "@shadcn/toggle-group"
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react"
import { usePathname, useRouter } from "next/navigation"
import { useEffect, useState, useTransition } from "react"

interface PaginationProps {
  total_count: number
}

export function Pagination({ total_count }: PaginationProps) {
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [pageNumbers, setPageNumbers] = useState<number[]>([])
  const [rangePages, setRangePages] = useState<number[]>([])

  const { replace } = useRouter()
  const pathname = usePathname()

  const [isPending, startTransition] = useTransition()

  useEffect(() => {
    setPageNumbers([...Array(total_count).keys()].map((i) => i + 1))
  }, [total_count])

  useEffect(() => {
    setRangePages(
      pageNumbers.length > 5 ? pageNumbers.slice(0, 5) : pageNumbers
    )
  }, [pageNumbers])

  const changePage = (page: number) => {
    if (page < 1 || page > total_count) return

    setCurrentPage(page)

    const params = new URLSearchParams(location.search)
    params.set("page", page.toString())
    startTransition(() => replace(`${pathname}?${params.toString()}`))

    const lastPage = page === total_count ? total_count : rangePages.at(-1)
    const firstPage = page === 1 ? 1 : rangePages.at(0)

    if (page === firstPage && !rangePages.includes(1)) {
      const rangeStart = Math.max(firstPage - (page === 1 ? 2 : 4), 1)
      const rangeEnd = Math.min(rangeStart + 4, total_count)

      const newRangePages = pageNumbers.slice(rangeStart - 1, rangeEnd)
      setRangePages(newRangePages)
    }

    if (page === lastPage && !rangePages.includes(total_count)) {
      const rangeStart = Math.max(lastPage - (page === total_count ? 4 : 2), 1)
      const rangeEnd = Math.min(rangeStart + 4, total_count)

      const newRangePages = pageNumbers.slice(rangeStart - 1, rangeEnd)
      setRangePages(newRangePages)
    }
  }

  return (
    <div className="flex justify-center items-center gap-3 w-full">
      <Button
        size="icon"
        variant="ghost"
        className="rounded-full"
        onClick={() => changePage(currentPage - 1)}
      >
        <ChevronLeftIcon className="h-4 w-4 text-muted-foreground" />
      </Button>

      <ToggleGroup
        defaultValue="1"
        value={`${currentPage}`}
        aria-label="Pagination group"
        type="single"
        space="separate"
        className="pagination font-bold py-2"
        onValueChange={(page) => changePage(Number(page))}
      >
        {!rangePages.includes(1) && (
          <>
            <ToggleGroupItem
              value="1"
              aria-label="Repository"
              className="rounded-full h-6 w-6 p-4 aria-checked:!bg-primary aria-checked:!text-muted"
            >
              1
            </ToggleGroupItem>
            <p className="text-muted-foreground">...</p>
          </>
        )}
        {rangePages.map((page) => (
          <ToggleGroupItem
            key={page}
            value={`${page}`}
            aria-label="Repository"
            className="rounded-full h-6 w-6 p-4 aria-checked:!bg-primary aria-checked:!text-muted"
          >
            {page}
          </ToggleGroupItem>
        ))}
        {total_count > 5 && !rangePages.includes(total_count) && (
          <>
            <p className="text-muted-foreground">...</p>
            <ToggleGroupItem
              value={`${total_count}`}
              aria-label="Repository"
              className="rounded-full h-6 w-6 p-4 aria-checked:!bg-primary aria-checked:!text-muted"
            >
              {total_count}
            </ToggleGroupItem>
          </>
        )}
      </ToggleGroup>
      <Button
        size="icon"
        variant="ghost"
        className="rounded-full"
        onClick={() => changePage(currentPage + 1)}
      >
        <ChevronRightIcon className="h-4 w-4 text-muted-foreground" />
      </Button>
    </div>
  )
}
