
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

import NewTableClient from "./NewTableClient"


export async function NewTabble() {
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
