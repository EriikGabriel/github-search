import { Endpoints } from "@octokit/types"

type SearchRepoResponse =
  Endpoints["GET /search/repositories"]["response"]["data"]

type SearchUserResponse = Endpoints["GET /search/users"]["response"]["data"]
type UserResponse = Endpoints["GET /users/{username}"]["response"]["data"]

type SearchTopicResponse = Endpoints["GET /search/topics"]["response"]["data"]

export async function searchRepos(token: string, query: string, page: string) {
  const res = await fetch(
    `https://api.github.com/search/repositories?q=${query}&per_page=10&page=${page}`,
    { headers: { authorization: `bearer ${token}` } }
  )

  if (!res.ok) throw new Error(`Failed to fetch repo: ${res.statusText}`)

  const parsedRes: SearchRepoResponse = await res.json()
  return { items: parsedRes.items, pagesCount: parsedRes.total_count }
}

export async function searchUsers(token: string, query: string, page: string) {
  const res = await fetch(
    `https://api.github.com/search/users?q=${query}&per_page=10&page=${page}`,
    { headers: { authorization: `bearer ${token}` } }
  )

  if (!res.ok) throw new Error(`Failed to fetch users: ${res.statusText}`)

  const parsedRes: SearchUserResponse = await res.json()
  const data = parsedRes.items.map((user) => searchUser(token, user.login))
  const users = await Promise.all(data)
  return { items: users, pagesCount: parsedRes.total_count }
}

async function searchUser(token: string, login: string) {
  const res = await fetch(`https://api.github.com/users/${login}`, {
    headers: { authorization: `bearer ${token}` },
  })

  if (!res.ok) throw new Error(`Failed to fetch user: ${JSON.stringify(res)}`)

  const parsedRes: UserResponse = await res.json()
  return parsedRes
}

export async function searchTopics(token: string, query: string, page: string) {
  const res = await fetch(
    `https://api.github.com/search/topics?q=${query}&per_page=10&page=${page}`,
    { headers: { authorization: `bearer ${token}` } }
  )

  if (!res.ok) throw new Error(`Failed to fetch topics: ${res.statusText}`)

  const parsedRes: SearchTopicResponse = await res.json()
  return { items: parsedRes.items, pagesCount: parsedRes.total_count }
}
