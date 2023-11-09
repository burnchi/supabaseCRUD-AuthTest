import Navbar from '@/components/Navbar'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { NewTabble } from '@/components/NewTabble'
import NewWish from '@/components/NewWish'

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
      <NewWish></NewWish>
      <p>Wishes Lists!!</p>
      <NewTabble></NewTabble>
    </div>
  )
}
