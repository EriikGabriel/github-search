import { Command, CommandEmpty, CommandList } from "@shadcn/command"

import { Input } from "./Input"
import { Tags } from "./Tags"

import { RepositoryGroup } from "./SearchGroups/RepositoryGroup"
import { TopicsGroup } from "./SearchGroups/TopicsGroup"
import { UsersGroup } from "./SearchGroups/UsersGroup"

import { searchRepos, searchTopics, searchUsers } from "@services/SearchService"
import { useAuthStore } from "@stores/auth"
import { Pagination } from "./Pagination"

interface SearchProps {
  query: string
  type: string
  page: string
}

export async function Search({ query, type, page }: SearchProps) {
  const { access_token } = useAuthStore.getState().state

  const DATA = { items: [], pagesCount: 0 }

  const reposData =
    access_token && query ? searchRepos(access_token, query, page) : DATA
  const usersData =
    access_token && query ? searchUsers(access_token, query, page) : DATA
  const topicsData =
    access_token && query ? searchTopics(access_token, query, page) : DATA

  const [repos, users, topics] = await Promise.all([
    reposData,
    usersData,
    topicsData,
  ])

  let maxPages = Math.round(
    Math.max(repos.pagesCount, users.pagesCount, topics.pagesCount) / 10
  )

  if (!maxPages) maxPages = 1

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
            {repos.items.length > 0 && (!type || type === "repositories") && (
              <RepositoryGroup repos={repos.items} />
            )}
            <hr />
            {users.items.length > 0 && (!type || type === "users") && (
              <UsersGroup users={users.items} />
            )}
            <hr />
            {topics.items.length > 0 && (!type || type === "topics") && (
              <TopicsGroup topics={topics.items} />
            )}
          </CommandList>
          {maxPages > 1 && (
            <Pagination total_count={maxPages > 100 ? 100 : maxPages} />
          )}
        </div>
      )}
    </Command>
  )
}
