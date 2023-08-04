"use client"

import { usePathname, useRouter } from "next/navigation"
import { useTransition } from "react"

import { BookMarked, Milestone, Users2 } from "lucide-react"

import { ToggleGroup, ToggleGroupItem } from "@shadcn/toggle-group"

export function Tags() {
  const { replace } = useRouter()
  const pathname = usePathname()

  const [_, startTransition] = useTransition()

  const handleChangeType = (filter: string) => {
    const params = new URLSearchParams(location.search)

    const type = params.get("type")
    filter && type !== filter
      ? params.set("type", filter)
      : params.delete("type")

    startTransition(() => replace(`${pathname}?${params.toString()}`))
  }

  return (
    <div className="flex gap-3">
      <ToggleGroup
        defaultValue="center"
        aria-label="Types group"
        type="single"
        space="separate"
        onValueChange={(value) => handleChangeType(value)}
      >
        <ToggleGroupItem value="repositories" aria-label="Repository">
          <BookMarked className="mr-2 h-4 w-4" />
          Repositories
        </ToggleGroupItem>
        <ToggleGroupItem value="users" aria-label="User">
          <Users2 className="mr-2 h-4 w-4" />
          Users
        </ToggleGroupItem>
        <ToggleGroupItem value="topics" aria-label="Topics">
          <Milestone className="mr-2 h-4 w-4" />
          Topics
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  )
}
