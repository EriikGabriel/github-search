"use client"

import { useRef } from "react"
import { useAuthStore } from "./auth"

interface InitializerStoreProps {
  access_token: string
}

export function InitializerStore({ access_token }: InitializerStoreProps) {
  const initializer = useRef(false)

  if (!initializer.current) {
    useAuthStore.setState({ state: { access_token } })
    initializer.current = true
  }

  return null
}
