import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import { Button } from '@/routes/~shared/components/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/routes/~shared/components/card'
import { Input } from '@/routes/~shared/components/input'
import { Label } from '@/routes/~shared/components/label'
import { ArrowLeft, Eye, EyeSlash, Spinner } from '@phosphor-icons/react'

type AuthState = 'email' | 'signin' | 'signup'

export const Route = createFileRoute('/auth/')({
  component: AuthPage,
})

function AuthPage() {
  const navigate = useNavigate()
  const [authState, setAuthState] = useState<AuthState>('email')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [name, setName] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  // Mock function to check if email exists
  const checkEmailExists = async (email: string): Promise<boolean> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800))
    // For demo: emails containing "exists" or "test" are considered existing
    return email.includes('exists') || email.includes('test')
  }

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setIsLoading(true)
    try {
      const exists = await checkEmailExists(email)
      if (exists) {
        setAuthState('signin')
      } else {
        setAuthState('signup')
      }
    } finally {
      setIsLoading(false)
    }
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
    setAuthState('email')
    setPassword('')
    setConfirmPassword('')
    setName('')
  }

  const getTitle = () => {
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
    switch (authState) {
      case 'email':
        return 'Enter your email to continue'
      case 'signin':
        return `Sign in to ${email}`
      case 'signup':
        return `Create an account for ${email}`
    }
  }

  const renderEmailStep = () => (
    <form onSubmit={handleEmailSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
          disabled={isLoading}
          required
        />
      </div>
      <Button type="submit" className="w-full" disabled={isLoading || !email}>
        {isLoading ? (
          <>
            <Spinner className="mr-2 h-4 w-4 animate-spin" />
            Checking...
          </>
        ) : (
          'Continue'
        )}
      </Button>
    </form>
  )

  const renderSignInStep = () => (
    <form onSubmit={handleSignIn} className="space-y-4">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="password">Password</Label>
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="text-muted-foreground hover:text-foreground"
          >
            {showPassword ? <EyeSlash className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
        <Input
          id="password"
          type={showPassword ? 'text' : 'password'}
          placeholder="••••••••"
          value={password}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
          disabled={isLoading}
          required
        />
      </div>
      <Button type="submit" className="w-full" disabled={isLoading || !password}>
        {isLoading ? (
          <>
            <Spinner className="mr-2 h-4 w-4 animate-spin" />
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
        <div className="flex items-center justify-between">
          <Label htmlFor="password">Password</Label>
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="text-muted-foreground hover:text-foreground"
          >
            {showPassword ? <EyeSlash className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
        <Input
          id="password"
          type={showPassword ? 'text' : 'password'}
          placeholder="••••••••"
          value={password}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
          disabled={isLoading}
          required
        />
      </div>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="text-muted-foreground hover:text-foreground"
          >
            {showConfirmPassword ? <EyeSlash className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
        <Input
          id="confirmPassword"
          type={showConfirmPassword ? 'text' : 'password'}
          placeholder="••••••••"
          value={confirmPassword}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setConfirmPassword(e.target.value)}
          disabled={isLoading}
          required
        />
      </div>
      <Button type="submit" className="w-full" disabled={isLoading || !password || !confirmPassword || !name}>
        {isLoading ? (
          <>
            <Spinner className="mr-2 h-4 w-4 animate-spin" />
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
          {authState !== 'email' && (
            <button
              onClick={handleBack}
              className="absolute left-0 top-0 p-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
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
