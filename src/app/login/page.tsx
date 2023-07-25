"use client"

import { Button } from "@components/ui/button"
import { Github } from "lucide-react"
import { signIn, useSession } from "next-auth/react"
import { redirect } from "next/navigation"
import { useEffect } from "react"

export default function Login() {
  const { status } = useSession()

  useEffect(() => {
    if (status === "authenticated") redirect("/")
  }, [status])

  return (
    <div className="min-h-screen flex flex-col justify-center items-center gap-40">
      <div className="text-center flex flex-col gap-4">
        <h1 className="animate-text text-8xl font-extrabold tracking-wide text-transparent bg-clip-text bg-gradient-to-br from-sky-500 via-purple-500 to-pink-500">
          Github Search
        </h1>
        <h2 className="text-2xl font-mono tracking-tight">
          A github search app...
        </h2>
      </div>
      <Button
        size="lg"
        className="p-7 text-lg"
        onClick={() => signIn("github")}
      >
        <Github className="mr-3 h-6 w-6" /> Login with Github
      </Button>
    </div>
  )
}
