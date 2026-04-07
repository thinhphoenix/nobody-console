import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/auth/sign-up/')({
  component: () => (
    <div className="flex min-h-screen items-center justify-center">
      <div>
        <h1 className="text-2xl font-bold">Sign Up</h1>
        <p className="mt-2 text-muted-foreground">Create a new account.</p>
      </div>
    </div>
  ),
})
