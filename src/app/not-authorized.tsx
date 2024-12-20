/* eslint-disable react/no-unescaped-entities */
"use client"
import { useRouter } from 'next/navigation'
import { Button } from 'src/components/custom/button'

export default function NotAuthorized() {
    const router = useRouter()
  return (
    <div className='h-svh'>
      <div className='m-auto flex h-full w-full flex-col items-center justify-center gap-2'>
        <h1 className='text-[7rem] font-bold leading-tight'>403</h1>
        <span className='font-medium'>Oops! you don't have access to this section!</span>
        <p className='text-center text-muted-foreground'>
          It seems like the page you&apos;re looking for <br />
          does not exist or might have been removed from your permissions.
        </p>
        <div className='mt-6 flex gap-4'>
          <Button variant='outline' onClick={() => router.back()}>
            Go Back
          </Button>
          <Button onClick={() =>  router.push("/dashboard")}>Back to Home</Button>
        </div>
      </div>
    </div>
  )
}