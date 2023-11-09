"use client"
import React, { useEffect, useRef } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { IWish, useWishStore } from '@/store'
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from 'next/navigation'
// 编辑功能
const EditButton = ({ list }: { list: IWish }) => {
    const { toast } = useToast()
    const supabase = createClientComponentClient()
    const router = useRouter()
    // const nameRef = useRef<HTMLInputElement>(null)
    // const wishesRef = useRef<HTMLInputElement>(null)
    const wishlist = useWishStore((state) => state.wish)
    const setwish = useWishStore((state) => state.setWish)

    const closeDialog = () => {
        const closebtn = document.getElementById("close-btn") as HTMLInputElement | null
        if (closebtn != null) {
            closebtn.click()
        }
    }

    const handleInit = () => {
        setwish(list)
    }

    const handleSubmit = async () => {
        // console.log(nameRef.current?.value)
        // console.log(wishesRef.current?.value)
        try {
            if (wishlist.name.length === 0 || wishlist.wishes.length === 0) {
                throw 'Some options is empty!!'
            }
            //更新数据库
            const { data, error } = await supabase
                .from('wishlist')
                .update({ name: wishlist.name, wishes: wishlist.wishes })
                .eq('id', list.id)
                .select()


            router.refresh()
            closeDialog()
            toast({
                variant:"success",
                title: `${wishlist.name} update wish`,
                description: `${wishlist.wishes}`,
            })


        }
        catch (error) {
            console.log(error)
            toast({
                variant: "destructive",
                title: error as string,
                description: `Please rewrite the table`,
            })
        }

    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <button className='px-3 py-1 bg-green-400' onClick={handleInit}>edit</button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Edit wish</DialogTitle>
                    <DialogDescription>
                        Make changes to your profile here. Click save when you're done.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                            Name
                        </Label>
                        <Input id="name" value={wishlist.name} className="col-span-3"
                            onChange={(e) => {
                                setwish({
                                    ...wishlist,
                                    name: e.target.value
                                })
                            }}
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="username" className="text-right">
                            Wish
                        </Label>
                        <Input id="username" value={wishlist.wishes}
                            onChange={(e) => {
                                setwish({
                                    ...wishlist,
                                    wishes: e.target.value
                                })
                            }}
                            className="col-span-3" />
                    </div>
                </div>
                <DialogFooter>
                    <Button type="submit" onClick={handleSubmit}>Save changes</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog >

    )
}

export default EditButton