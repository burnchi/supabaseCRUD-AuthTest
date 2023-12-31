"use client"
import Navbar from '@/components/Navbar'
import { Button } from '@/components/ui/button'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import React from 'react'

const AuthComponent = () => {
    const supabase = createClientComponentClient();
    console.log()

    const handleLogin = async() =>{
        await supabase.auth.signInWithOAuth({
            provider: "github",
            options : {
                redirectTo : `${location.origin}/auth/callback`
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