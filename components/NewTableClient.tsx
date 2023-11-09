"use client"
import React from 'react'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import DelButton from "./DelButton"
import EditButton from "./EditButton"
import { useWishStore } from '@/store'


const NewTableClient = ({ wishlist }: { wishlist: any[] }) => {
    const filttext = useWishStore((state) => state.filttext)
    const setfilttext = useWishStore((state) => state.setfilttext)
    const filtwishlist = wishlist.filter(list => list.name.toLowerCase().includes(filttext.toLowerCase()))
    return (
        <>
            <input type="text" className="border border-solid border-black w-[30%]
            h-[30px]" value={filttext}
                onChange={(e) => {
                    setfilttext(e.target.value)
                }}
                placeholder='search someone wishes'
            />
            <Table>
                <TableCaption>A list of your recent invoices.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">Name</TableHead>
                        <TableHead>Wish</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {
                        filtwishlist.map((list: { name: string, wishes: string, id: number }, inx: number) => (
                            <TableRow key={inx}>
                                <TableCell className="font-medium">{list.name}</TableCell>
                                <TableCell>{list.wishes}</TableCell>
                                {/* <TableCell>
                        </TableCell> */}
                                <TableCell>
                                    <EditButton list={list}></EditButton>
                                    <DelButton list={list}></DelButton>
                                </TableCell>
                            </TableRow>
                        ))}
                </TableBody>
            </Table>
        </>
    )
}

export default NewTableClient