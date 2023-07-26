import { Search } from "@components/Search"

interface PageProps {
  params: { slug: string }
  searchParams: { [key: string]: string }
}

export default async function Home({ searchParams }: PageProps) {
  return (
    <div className="h-screen overflow-auto">
      <div className="mt-20 flex justify-center items-center">
        <Search query={searchParams["search"]} />
      </div>
    </div>
  )
}
