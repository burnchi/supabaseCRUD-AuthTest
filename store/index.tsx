import { create } from 'zustand'


export type IWish = {
    id?:number;
    name: string;
    wishes: string;
}

interface WishState {
    wish: IWish,
    wishList : IWish[],
    filttext: string
    setWish:(wish:IWish) => void;
    setwishList:(wish:IWish) => void;
    setfilttext:(item:string) => void;

}


export  const useWishStore = create<WishState>()((set) => ({
    wish: {
        id:0,
        name: "xiaoshuai",
        wishes: "talk"
    },
    wishList:[],
    filttext: "",
    setWish:(wish:IWish) => set((state) => ({wish:{
        ...state.wish,...wish
    }})),
    setwishList:(wish:IWish) => set((state) => ({wishList:[
        {...state.wish},{...wish}
    ]})),
    setfilttext:(item)=>set(() => ({filttext:item}))

}))