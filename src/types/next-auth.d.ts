import "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      access_token: string
      email: string
      exp: number
      iat: number
      id: string
      image: string
      jti: string
      name: string
      picture: string
      provider: string
      providerAccountId: string
      scope: string
      sub: string
      token_type: string
      type: string
    }
  }
}
