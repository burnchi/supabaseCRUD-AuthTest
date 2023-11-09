import React from 'react'
import AuthComponent from './component/AuthComponent'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

const AuthPage = async () => {
    const supabase = createServerComponentClient({ cookies })
    // 获取用户的session信息
    const { data } = await supabase.auth.getSession()
    // console.log(data)
  
    //做对应的页面保护,没有session就去登录
    if (data.session) {
      redirect('/')
    }
    return (
        <AuthComponent />
    )
}

export default AuthPage