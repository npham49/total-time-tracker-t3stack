import React from 'react'
import Link from 'next/link'
import { signIn, signOut, useSession } from 'next-auth/react'

const Navbar = () => {
  const { data: session } = useSession()
  return (
    <nav className='container navbar fixed'>
      <ul>
        <li><Link href='/'><strong>TotalTimeTracker</strong></Link></li>
      </ul>
      <ul>
        {session && <li><Link href={`/dashboard/${session.user.id}`}>Dashboard</Link></li>}
        <li><Link href="/about">About</Link></li>
        <button
          role="button"
          onClick={session ? () => void signOut() : () => void signIn("google")}
        >
          {session ? "Sign Out" : "Sign In"}
        </button>

      </ul>
    </nav>
  )
}

export default Navbar