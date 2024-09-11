import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/user/show')({
  component: () => <div>Hello /user/show!</div>
})