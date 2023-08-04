import { Endpoints } from "@octokit/types"
import { Badge } from "@shadcn/badge"
import { CommandGroup, CommandItem } from "@shadcn/command"
import Image from "next/image"

type RepositoryType =
  Endpoints["GET /search/repositories"]["response"]["data"]["items"][0]

interface RepositoryGroupProps {
  repos: RepositoryType[]
}

export function RepositoryGroup({ repos }: RepositoryGroupProps) {
  return (
    <CommandGroup heading="Repositories">
      {repos?.map(
        ({
          id,
          name,
          owner,
          description,
          updated_at,
          topics,
          stargazers_count,
        }) => (
          <CommandItem
            key={`repo-${id}`}
            value={`repo[${id}]-${name}`}
            className="p-3 flex-col items-start justify-center gap-3"
          >
            <div className="flex gap-5">
              <Image
                src={owner?.avatar_url ?? ""}
                alt={`${owner?.login}'s avatar`}
                width={50}
                height={50}
                className="rounded-md"
              />
              <div className="flex flex-col justify-center gap-1">
                <div className="flex gap-2">
                  <h1 className="font-bold">{name}</h1>{" "}
                  <small className="font-light">
                    Updated at{" "}
                    {new Intl.DateTimeFormat("en", {
                      dateStyle: "medium",
                    }).format(new Date(updated_at))}{" "}
                    |{" "}
                    {stargazers_count >= 1000
                      ? `${(stargazers_count / 1000).toFixed(1)}k`
                      : stargazers_count}{" "}
                    stars
                  </small>
                </div>
                <p>{description}</p>
              </div>
            </div>
            {topics && topics?.length > 0 && (
              <div className="flex gap-5">
                {topics.slice(0, 5).map((topic) => (
                  <Badge key={topic}>{topic}</Badge>
                ))}
              </div>
            )}
          </CommandItem>
        )
      )}
    </CommandGroup>
  )
}
