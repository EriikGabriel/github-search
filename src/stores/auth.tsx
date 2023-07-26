import { create } from "zustand"

type ActionsType = {}

type AuthType = {
  state: { access_token: string }
}

export const useAuthStore = create<AuthType>((set) => ({
  state: { access_token: "" },
}))
