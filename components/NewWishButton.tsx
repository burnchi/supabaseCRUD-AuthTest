"use client"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useWishStore } from "@/store"
import { useToast } from "@/components/ui/use-toast"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useRouter } from "next/navigation"

export default function NewWishButton() {
    const wishlist = useWishStore(state => state.wish)
    const setWishList = useWishStore(state => state.setWish)
    const supabase = createClientComponentClient()
    const router = useRouter()
    const { toast } = useToast()

    const closeDialog = () => {
        const closebtn = document.getElementById("close-btn") as HTMLInputElement | null
        if (closebtn != null) {
            closebtn.click()
        }
    }
    const valiWishes = () => {
        // 主动抛出错误
        if (wishlist.name.length === 0 || wishlist.wishes.length === 0) {
            throw "Name or Wish can not be empty"
        }
    }

    const submitWishes = async () => {
        try {
            //如果有错，抛出自定义错误，后面的代码也不会执行
            valiWishes()
            console.log(wishlist)
            const { data, error } = await supabase
                .from('wishlist')
                .insert([
                    { name: wishlist.name, wishes: wishlist.wishes },
                ])
                .select()
            // if(!error){
            //     setWishList()
            // }
            router.refresh()
            closeDialog()

            toast({
                variant:"success",
                title: `${wishlist.name} add a wish`,
                description: `${wishlist.wishes}`,
            })

        } catch (error) {
            console.log(error)

            toast({
                variant: "destructive",
                title: "Post wishes error!!",
                description: error as string,
            })
        }
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <button className="flex w-full justify-center items-center border border-solid border-black text-xl text-black/25 hover:text-black">
                    + Add wish
                </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>New Wish</DialogTitle>
                    <DialogDescription>
                        Fill in your wish here. Click save when you're done.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                            Name
                        </Label>
                        <Input id="name" placeholder="xiaoming" className="col-span-3"
                            onChange={(e) => setWishList({
                                ...wishlist,
                                name: e.target.value
                            })}
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="username" className="text-right">
                            wishes
                        </Label>
                        <Input id="username" placeholder="sleep" className="col-span-3"
                            onChange={(e) => setWishList({
                                ...wishlist,
                                wishes: e.target.value
                            })}
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button type="submit" onClick={submitWishes}>Add Wish</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
