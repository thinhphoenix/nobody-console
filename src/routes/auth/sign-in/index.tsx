import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/auth/sign-in/')({
  component: () => (
    <div className="flex min-h-screen items-center justify-center">
      <div>
        <h1 className="text-2xl font-bold">Sign In</h1>
        <p className="mt-2 text-muted-foreground">Sign in to your account.</p>
      </div>
    </div>
  ),
})
