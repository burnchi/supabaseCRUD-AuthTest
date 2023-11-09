"use client"
import React from 'react'
import { Button } from './ui/button'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { usePathname, useRouter } from 'next/navigation'

const Navbar = () => {
    const supabase = createClientComponentClient()
    const router = useRouter()
    const path = usePathname()
    const handleLogout =async () => {
        await supabase.auth.signOut();
        router.refresh()
    }
  return (
    <div className=' flex justify-between items-center'>
        <h1 className='text-xl'>Wishes Center</h1>
        { path !== "/auth" && <Button onClick={handleLogout}>logout</Button>}
    </div>
  )
}

export default Navbar