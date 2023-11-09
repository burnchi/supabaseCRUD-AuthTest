import Navbar from '@/components/Navbar'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import {  NewTable } from '@/components/NewTable'
import NewWishButton from '@/components/NewWishButton'

export const dynamic = "force-dynamic"
export default async function Home() {
  const supabase = createServerComponentClient({ cookies })
  // 获取用户的session信息
  const { data } = await supabase.auth.getSession()
  // console.log(data)

  //做对应的页面保护,没有session就去登录
  if (!data.session) {
    redirect('/auth')
  }

  return (
    <div className='p-5 space-y-10'>
      <Navbar></Navbar>
      <NewWishButton></NewWishButton>
      <p>Wishes Lists!!</p>
      <NewTable></NewTable>
    </div>
  )
}
