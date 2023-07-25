import { OPTIONS } from "@app/api/auth/[...nextauth]/route"
import { getServerSession } from "next-auth"

export async function Header() {
  const session = await getServerSession(OPTIONS)

  return (
    <header className="bg-zinc-900 h-20 flex justify-between items-center px-6">
      <span className="text-xl font-bold">{session?.user.access_token}</span>
    </header>
  )
}
