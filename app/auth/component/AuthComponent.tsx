"use client"
import Navbar from '@/components/Navbar'
import { Button } from '@/components/ui/button'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import React from 'react'

const AuthComponent = () => {
    const supabase = createClientComponentClient();
    console.log()

    const getURL = () => {
        let url =
          process?.env?.NEXT_PUBLIC_SITE_URL ?? // Set this to your site URL in production env.
          process?.env?.NEXT_PUBLIC_VERCEL_URL ?? // Automatically set by Vercel.
          'http://localhost:3000/'
        // Make sure to include `https://` when not localhost.
        url = url.includes('http') ? url : `https://${url}`
        // Make sure to include a trailing `/`.
        url = url.charAt(url.length - 1) === '/' ? url : `${url}/`
        // console.log(url)
        
        return url
      }
    const handleLogin = async() =>{
        await supabase.auth.signInWithOAuth({
            provider: "github",
            options : {
                redirectTo : `${getURL()}auth/callback`
            }
        })
    }

    return (
        <div className='p-5'>
            <Navbar></Navbar>
            <div className='flex flex-col gap-4 justify-center items-center h-80vh'>

                <p>please log in !!if you want to see something.</p>
                <Button onClick={handleLogin}>Login with github</Button>
            </div>
        </div>
    )
}

export default AuthComponent