import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@shadcn/command"
import { useAuthStore } from "@stores/auth"
import { Input } from "./Input"

import { Endpoints } from "@octokit/types"

interface SearchProps {
  query: string
}

async function search(
  token: string,
  query: string
): Promise<Endpoints["GET /search/users"]["response"]["data"]> {
  const res = await fetch(
    `https://api.github.com/search/users?q=${query ?? "user"}`,
    { headers: { authorization: `bearer ${token}` } }
  )

  return res.json()
}

export async function Search({ query }: SearchProps) {
  const { access_token } = useAuthStore.getState().state

  const { items: users } = await search(access_token, query)

  return (
    <Command className="w-1/2 border">
      <Input placeholder="Search a repository..." />
      {query && (
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          {users && (
            <CommandGroup heading="Users">
              {users.map((user) => (
                <CommandItem key={user.id}>{user.login}</CommandItem>
              ))}
            </CommandGroup>
          )}
        </CommandList>
      )}
    </Command>
  )
}
