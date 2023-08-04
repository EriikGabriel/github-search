"use client"

import { usePathname, useRouter } from "next/navigation"
import { ComponentProps, useTransition } from "react"
import { CommandInput } from "../ui/command"

interface InputProps extends ComponentProps<typeof CommandInput> {}

export function Input({ ...props }: InputProps) {
  const { replace } = useRouter()
  const pathname = usePathname()

  const [isPending, startTransition] = useTransition()

  const handleSearch = () => {
    const input = document.querySelector(".search-input") as HTMLInputElement
    const query = input.value
    const params = new URLSearchParams(location.search)
    query ? params.set("search", query) : params.delete("search")
    startTransition(() => replace(`${pathname}?${params.toString()}`))
  }

  return (
    <CommandInput
      className="search-input text-base"
      onKeyDown={(e) => e.code === "Enter" && handleSearch()}
      onClickButton={handleSearch}
      datatype={isPending ? "loading" : "ready"}
      {...props}
    />
  )
}
