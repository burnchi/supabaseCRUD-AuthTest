"use client"
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'
import React from 'react'
import { useToast } from "@/components/ui/use-toast"
import { IWish } from '@/store'

// 删除功能
const DelButton = ({ list }: { list: IWish }) => {
    const supabase = createClientComponentClient()
    const router = useRouter()
    // console.log(list)
    const { toast } = useToast()
    const handleDel = async (list: IWish) => {
        // console.log(list)
        try {
            const { error } = await supabase
                .from('wishlist')
                .delete()
                .eq('id', list.id)
            router.refresh()
            toast({
                variant:"success",
                title: `${list.name}'s wish is deleted`,
                description: `${list.wishes}`,
            })
        } catch (error) {
            console.log('delete wishlist error:', error)
            toast({
                variant: "destructive",
                title: `wish delete error!`,
                description: `please see control`,
            })
        }
    }
    return (
        <button onClick={() => handleDel(list)} className='px-3 py-1 bg-orange-400'>del</button>
    )
}

export default DelButton