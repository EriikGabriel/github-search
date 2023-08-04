import { Command, CommandEmpty, CommandList } from "@shadcn/command"

import { Input } from "./Input"
import { Tags } from "./Tags"

import { RepositoryGroup } from "./SearchGroups/RepositoryGroup"
import { UsersGroup } from "./SearchGroups/UsersGroup"

import { searchRepos, searchTopics, searchUsers } from "@services/SearchService"
import { useAuthStore } from "@stores/auth"
import { TopicsGroup } from "./SearchGroups/TopicsGroup"

interface SearchProps {
  query: string
  type: string
}

export async function Search({ query, type }: SearchProps) {
  const { access_token } = useAuthStore.getState().state

  const reposData =
    access_token && query ? searchRepos(access_token, query) : []
  const usersData =
    access_token && query ? searchUsers(access_token, query) : []
  const topicsData =
    access_token && query ? searchTopics(access_token, query) : []

  const [repos, users, topics] = await Promise.all([
    reposData,
    usersData,
    topicsData,
  ])

  return (
    <Command className="w-1/2 border" shouldFilter={false} loop>
      <Input placeholder="Search a repository..." />
      {query && (
        <div>
          <div className="flex flex-col gap-3 p-3 font-medium text-muted-foreground">
            <small>I&apos;m looking for...</small>
            <Tags />
          </div>
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            {repos.length > 0 && (!type || type === "repositories") && (
              <RepositoryGroup repos={repos} />
            )}
            <hr />
            {users.length > 0 && (!type || type === "users") && (
              <UsersGroup users={users} />
            )}
            <hr />
            {topics.length > 0 && (!type || type === "topics") && (
              <TopicsGroup topics={topics} />
            )}
          </CommandList>
        </div>
      )}
    </Command>
  )
}
