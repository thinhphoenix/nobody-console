import { useSearch } from '@tanstack/react-router'

/**
 * Get query params from the URL search string.
 * Use this when you need search params in a component that isn't
 * rendered by a specific route (e.g., shared components).
 */
export function useQueryParams<T extends Record<string, unknown> = Record<string, string>>() {
  // TanStack Router has complex types for strict mode - cast to bypass
  return (useSearch as any)({ strict: false }) as T | undefined
}

/**
 * Get query params for a specific route.
 * Use this when you know the route path and want type-safe search params.
 */
export function useRouteQueryParams<
  T extends Record<string, unknown> = Record<string, string>
>(routeId: string) {
  // Cast to bypass strict typing for dynamic route ID
  return (useSearch as any)({ from: routeId }) as T
}
