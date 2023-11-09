
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

import NewTableClient from "./NewTableClient"


export const dynamic = "force-dynamic"

export async function NewTable() {
    // 必须用服务器组件，识别某个用户
    const supabase = createServerComponentClient({ cookies })
    let { data: wishlist, error } = await supabase
        .from('wishlist')
        .select('*') as any
  
    return (
        <>
            <NewTableClient wishlist={wishlist}></NewTableClient>
        </>
    )
}
