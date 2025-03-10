import { Alert, AlertDescription } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useLoginMutation } from '@/features/auth/login/api/login'
import { createFileRoute, Link, redirect } from '@tanstack/react-router'
import { AlertCircle } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  loginMutationSchema,
  type LoginMutation,
} from '@shared/zod-schemas/auth/login'
import { userQueryOptions } from '@/lib/auth'

export const Route = createFileRoute('/auth/login')({
  beforeLoad: async ({ context: { queryClient } }) => {
    const isLoggedIn = await queryClient.fetchQuery(userQueryOptions)

    if (isLoggedIn) {
      throw redirect({
        to: '/',
      })
    }
  },
  component: RouteComponent,
})

function RouteComponent() {
  const loginMutation = useLoginMutation()

  const form = useForm<LoginMutation>({
    resolver: zodResolver(loginMutationSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  return (
    <main className="flex h-screen items-center justify-center">
      <Card className="w-[20rem] md:w-[25rem]">
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>
            Login to <span className="font-semibold">CoinControl</span> or
            register{' '}
            <Link to="/auth/register" className="text-foreground underline">
              here
            </Link>
            .
          </CardDescription>
          {loginMutation.isError && (
            <Alert variant={'destructive'} className="animate-in fade-in mt-3">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>Invalid email or password.</AlertDescription>
            </Alert>
          )}
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(({ email, password }) =>
                loginMutation.mutate({ email, password }),
              )}
              className="flex flex-col gap-6">
              <FormField
                name="email"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="password"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Login</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </main>
  )
}
