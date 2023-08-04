import { Endpoints } from "@octokit/types"
import { Avatar, AvatarFallback, AvatarImage } from "@shadcn/avatar"
import { CommandGroup, CommandItem } from "@shadcn/command"
import { BookMarked, MapPin, Users } from "lucide-react"

type UserType = Endpoints["GET /users/{username}"]["response"]["data"]

interface UsersGroupProps {
  users: UserType[]
}

export function UsersGroup({ users }: UsersGroupProps) {
  return (
    <CommandGroup heading="Users">
      {users.map(
        ({
          id,
          login,
          name,
          avatar_url,
          bio,
          location,
          public_repos,
          followers,
        }) => (
          <CommandItem
            key={id}
            className="p-3 flex-col items-start justify-center gap-3"
          >
            <div className="flex gap-5">
              <Avatar className="h-[50px] w-[50px]">
                <AvatarImage src={avatar_url} alt={`${login}'s avatar`} />
                <AvatarFallback>{login[0].toUpperCase()}</AvatarFallback>
              </Avatar>
              <div className="flex flex-col justify-center gap-1">
                <div className="flex gap-2">
                  <h1 className="font-bold">{name ?? login}</h1>{" "}
                  <small className="font-light">{login}</small>
                </div>
                {bio && <p>{bio}</p>}
              </div>
            </div>
            <div className="flex gap-3">
              {location && (
                <small className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  {location}
                </small>
              )}
              <small className="flex items-center gap-2">
                <BookMarked className="h-4 w-4" />
                {public_repos}
              </small>
              <small className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                {followers}
              </small>
            </div>
          </CommandItem>
        )
      )}
    </CommandGroup>
  )
}
