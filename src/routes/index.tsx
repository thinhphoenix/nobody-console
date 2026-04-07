import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: () => (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold">Welcome</h1>
        <p className="mt-2 text-muted-foreground">
          Route-based module architecture is ready.
        </p>
      </div>
    </div>
  ),
})
