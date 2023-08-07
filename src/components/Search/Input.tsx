"use client"

import { useUrlParam } from "@/hooks/useUrlParam"
import { ComponentProps } from "react"
import { CommandInput } from "../ui/command"

interface InputProps extends ComponentProps<typeof CommandInput> {}

export function Input({ ...props }: InputProps) {
  const { setUrlParam, isPending } = useUrlParam()

  const handleSearch = () => {
    const input = document.querySelector(".search-input") as HTMLInputElement
    const query = input.value
    setUrlParam("search", query)
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
