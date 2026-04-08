import { createFileRoute, useNavigate, useSearch } from '@tanstack/react-router'
import { useState } from 'react'
import { Button } from '@/routes/~shared/components/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/routes/~shared/components/card'
import { Input } from '@/routes/~shared/components/input'
import { Label } from '@/routes/~shared/components/label'
import { ArrowLeft, CircleNotch, Eye, EyeSlash } from '@phosphor-icons/react'

type AuthState = 'email' | 'signin' | 'signup'

interface AuthSearch {
  state?: AuthState
  email?: string
}

export const Route = createFileRoute('/auth')({
  component: AuthPage,
  validateSearch: (search: Record<string, unknown>): AuthSearch => {
    return {
      state: ['email', 'signin', 'signup'].includes(search.state as string) 
        ? (search.state as AuthState) 
        : 'email',
      email: typeof search.email === 'string' ? search.email : ''
    }
  },
  beforeLoad: ({ search }) => {
    // Reset emailChecked when navigating away from signin state
    if (search.state === 'signup') {
      return { shouldResetEmailCheck: true }
    }
    return {}
  }
})

function AuthPage() {
  const navigate = useNavigate()
  const search = useSearch({ from: '/auth' }) as AuthSearch
  const [authState, setAuthState] = useState<AuthState>(search.state || 'email')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [name, setName] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [emailChecked, setEmailChecked] = useState(false)
  const [emailExists, setEmailExists] = useState(false)

  // Mock function to check if email exists
  const checkEmailExists = async (email: string): Promise<boolean> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800))
    // For demo: emails containing "exists" or "test" are considered existing
    return email.includes('exists') || email.includes('test')
  }

  const updateUrlState = (newState: AuthState, newEmail?: string) => {
    navigate({
      to: '/auth',
      search: {
        state: newState,
        email: newEmail || email || undefined
      },
      replace: true
    })
  }

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setIsLoading(true)
    try {
      const exists = await checkEmailExists(email)
      setEmailChecked(true)
      setEmailExists(exists)
      if (!exists) {
        setAuthState('signup')
        updateUrlState('signup', email)
      }
    } finally {
      setIsLoading(false)
    }
  }

  const handleSignInInline = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!password) return

    setIsLoading(true)
    // Simulate sign in
    await new Promise(resolve => setTimeout(resolve, 1000))
    setIsLoading(false)
    // Redirect to dashboard
    navigate({ to: '/dashboard' })
  }

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!password) return

    setIsLoading(true)
    // Simulate sign in
    await new Promise(resolve => setTimeout(resolve, 1000))
    setIsLoading(false)
    // Redirect to dashboard
    navigate({ to: '/dashboard' })
  }

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!password || !confirmPassword || !name) return
    if (password !== confirmPassword) {
      alert('Passwords do not match')
      return
    }

    setIsLoading(true)
    // Simulate sign up
    await new Promise(resolve => setTimeout(resolve, 1200))
    setIsLoading(false)
    // Redirect to dashboard
    navigate({ to: '/dashboard' })
  }

  const handleBack = () => {
    if (authState === 'signin' && emailChecked) {
      // Reset to just email step
      setEmailChecked(false)
      setEmailExists(false)
      setPassword('')
    } else {
      setAuthState('email')
      setEmailChecked(false)
      setEmailExists(false)
      setPassword('')
      setConfirmPassword('')
      setName('')
      updateUrlState('email')
    }
  }

  const getTitle = () => {
    if (authState === 'email' && emailExists) {
      return 'Welcome Back'
    }
    switch (authState) {
      case 'email':
        return 'Welcome'
      case 'signin':
        return 'Welcome Back'
      case 'signup':
        return 'Create Account'
    }
  }

  const getDescription = () => {
    if (authState === 'email' && emailExists) {
      return `Sign in to ${email}`
    }
    switch (authState) {
      case 'email':
        return 'Enter your email to continue'
      case 'signin':
        return `Sign in to ${email}`
      case 'signup':
        return `Create an account for ${email}`
    }
  }

  const renderSocialButtons = () => (
    <div className="grid grid-cols-3 gap-3">
      <button
        type="button"
        onClick={() => handleSocialLogin('google')}
        className="flex items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition-all hover:bg-slate-50 hover:border-slate-300 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
      >
        <svg className="h-5 w-5" viewBox="0 0 24 24">
          <path
            fill="#4285F4"
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
          />
          <path
            fill="#34A853"
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          />
          <path
            fill="#FBBC05"
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
          />
          <path
            fill="#EA4335"
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
          />
        </svg>
      </button>
      <button
        type="button"
        onClick={() => handleSocialLogin('apple')}
        className="flex items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition-all hover:bg-slate-50 hover:border-slate-300 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
      >
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.74 1.1 0 2.03-.74 3.24-.74 2.16.02 3.79 1.26 4.46 3.09-2.06 1.09-1.86 3.88.22 4.66-.47 1.48-1.24 2.97-2 4.22zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
        </svg>
      </button>
      <button
        type="button"
        onClick={() => handleSocialLogin('github')}
        className="flex items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition-all hover:bg-slate-50 hover:border-slate-300 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
      >
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
        </svg>
      </button>
    </div>
  )

  const handleSocialLogin = (provider: 'google' | 'apple' | 'github') => {
    // Mock social login
    console.log(`Logging in with ${provider}`)
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      navigate({ to: '/dashboard' })
    }, 1500)
  }

  const renderEmailStep = () => (
    <div className="space-y-6">
      {renderSocialButtons()}

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-slate-200 dark:border-slate-700" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-white px-2 text-slate-500 dark:bg-slate-800 dark:text-slate-400">
            Or continue with email
          </span>
        </div>
      </div>

      <form onSubmit={emailExists ? handleSignInInline : handleEmailSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setEmail(e.target.value)
              if (emailChecked) {
                setEmailChecked(false)
                setEmailExists(false)
                setPassword('')
              }
            }}
            disabled={isLoading}
            required
          />
        </div>

        {emailExists && (
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                value={password}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                disabled={isLoading}
                required
                className="pr-10"
                autoFocus
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showPassword ? <EyeSlash className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>
        )}

        <Button type="submit" className="w-full" disabled={isLoading || !email || (emailExists && !password)}>
          {isLoading ? (
            <>
              <CircleNotch className="mr-2 h-4 w-4 animate-spin" />
              {emailExists ? 'Sign In' : 'Continue'}
            </>
          ) : (
            emailExists ? 'Sign In' : 'Continue'
          )}
        </Button>
      </form>
    </div>
  )

  const renderSignInStep = () => (
    <form onSubmit={handleSignIn} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <div className="relative">
          <Input
            id="password"
            type={showPassword ? 'text' : 'password'}
            placeholder="••••••••"
            value={password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
            disabled={isLoading}
            required
            className="pr-10"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            {showPassword ? <EyeSlash className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
      </div>
      <Button type="submit" className="w-full" disabled={isLoading || !password}>
        {isLoading ? (
          <>
            <CircleNotch className="mr-2 h-4 w-4 animate-spin" />
            Signing in...
          </>
        ) : (
          'Sign In'
        )}
      </Button>
    </form>
  )

  const renderSignUpStep = () => (
    <form onSubmit={handleSignUp} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Full Name</Label>
        <Input
          id="name"
          type="text"
          placeholder="John Doe"
          value={name}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
          disabled={isLoading}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <div className="relative">
          <Input
            id="password"
            type={showPassword ? 'text' : 'password'}
            placeholder="••••••••"
            value={password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
            disabled={isLoading}
            required
            className="pr-10"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            {showPassword ? <EyeSlash className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="confirmPassword">Confirm Password</Label>
        <div className="relative">
          <Input
            id="confirmPassword"
            type={showConfirmPassword ? 'text' : 'password'}
            placeholder="••••••••"
            value={confirmPassword}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setConfirmPassword(e.target.value)}
            disabled={isLoading}
            required
            className="pr-10"
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            {showConfirmPassword ? <EyeSlash className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
      </div>
      <Button type="submit" className="w-full" disabled={isLoading || !password || !confirmPassword || !name}>
        {isLoading ? (
          <>
            <CircleNotch className="mr-2 h-4 w-4 animate-spin" />
            Creating account...
          </>
        ) : (
          'Create Account'
        )}
      </Button>
    </form>
  )

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-md bg-white/80 backdrop-blur-sm border border-white/20 shadow-lg">
        <CardHeader className="text-center relative">
          {(authState !== 'email' || emailChecked) && (
            <button
              onClick={handleBack}
              className="group absolute left-4 top-4 flex h-9 w-9 items-center justify-center rounded-xl bg-white/60 backdrop-blur-sm border border-slate-200/60 text-slate-600 shadow-sm transition-all duration-300 hover:bg-white hover:border-slate-300 hover:shadow-md hover:-translate-x-0.5 dark:bg-slate-800/60 dark:border-slate-700/60 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:border-slate-600"
              aria-label="Go back"
            >
              <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-0.5" />
            </button>
          )}
          <CardTitle className="text-2xl">{getTitle()}</CardTitle>
          <CardDescription>{getDescription()}</CardDescription>
        </CardHeader>
        <CardContent>
          {authState === 'email' && renderEmailStep()}
          {authState === 'signin' && renderSignInStep()}
          {authState === 'signup' && renderSignUpStep()}
        </CardContent>
      </Card>
    </div>
  )
}
