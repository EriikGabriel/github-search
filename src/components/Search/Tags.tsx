"use client"

import { BookMarked, Milestone, Users2 } from "lucide-react"

import { useUrlParam } from "@hooks/useUrlParam"
import { ToggleGroup, ToggleGroupItem } from "@shadcn/toggle-group"

export function Tags() {
  const { setUrlParam } = useUrlParam()

  return (
    <div className="flex gap-3">
      <ToggleGroup
        defaultValue="center"
        aria-label="Types group"
        type="single"
        space="separate"
        onValueChange={(value) => setUrlParam("type", value)}
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
