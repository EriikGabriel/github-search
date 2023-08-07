import { Endpoints } from "@octokit/types"
import { CommandGroup, CommandItem } from "@shadcn/command"
import { UserSquare2 } from "lucide-react"

type TopicType = Endpoints["GET /search/topics"]["response"]["data"]["items"][0]

interface TopicsGroupProps {
  topics: TopicType[]
}

export function TopicsGroup({ topics }: TopicsGroupProps) {
  return (
    <CommandGroup heading="Topics">
      {topics.map(({ name, short_description, created_by }) => (
        <CommandItem
          key={name}
          className="p-3 flex-col items-start justify-center gap-3 min-h-[5rem]"
        >
          <div className="flex flex-col justify-center gap-1">
            <h1 className="font-bold">{name}</h1>
            <p>{short_description}</p>
          </div>
          {created_by && (
            <small className="flex items-center gap-2">
              <UserSquare2 className="h-4 w-4" />
              {created_by}
            </small>
          )}
        </CommandItem>
      ))}
    </CommandGroup>
  )
}
