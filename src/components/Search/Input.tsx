"use client"

import { usePathname, useRouter } from "next/navigation"
import { useTransition } from "react"
import { CommandInput } from "../ui/command"

interface InputProps {
  placeholder: string
}

export function Input({ placeholder }: InputProps) {
  const { replace } = useRouter()
  const pathname = usePathname()

  const [isPending, startTransition] = useTransition()

  const handleSearch = (query: string) => {
    const params = new URLSearchParams(location.search)

    query ? params.set("search", query) : params.delete("search")

    startTransition(() => replace(`${pathname}?${params.toString()}`))
  }

  return (
    <CommandInput
      className="text-base"
      placeholder={placeholder}
      onValueChange={(query) => handleSearch(query)}
    />
  )
}
