'use client'
import {
    Link, 
    Navbar, 
    NavbarBrand, 
    NavbarContent, 
    NavbarItem, 
    NavbarMenuToggle,
    NavbarMenu,
    NavbarMenuItem,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownTrigger,
Button} from "@nextui-org/react"
import { Image } from "@nextui-org/react";
import { useEffect, useState } from "react"
import { createClient } from "@/utils/supabase/client";
import { deleteCart } from "@/app/myquestion/[career]/action";
import { Spinner } from "@nextui-org/react";
import { cartType, occupationType } from "./types/careerTypes";
import { getCart } from "@/app/myquestion/[career]/action";
import { deleteUserCookies } from "@/app/login/actions";

export default function Nav(){
    const [isMenuOpen,setIsMenuOpen] = useState(false);
    const [cart,setCart] = useState(false);
    const [cartList,setCartList] = useState<cartType[] | null>([]);
    const [cartLoading,setCartLoading] = useState(false);
    const [user,setUser] = useState<boolean>(false);
    const [occupations,setOccupations] = useState<occupationType[]>([]);
    const getCartItems = async()=>{
        setCartLoading(true);
        const supabase = createClient();
          let currentUser = await supabase.auth.getSession();
          let userId = null;
          if(currentUser.data.session){
            userId = currentUser?.data?.session?.user?.id;
            setUser(!currentUser?.data?.session?.user?.is_anonymous!);
            const list = await getCart(userId);
            setCartList(list);
          }
          else{
            setCartList([]);
          }
        setCartLoading(false);
        }
      const getOccupations = async()=>{
        const supabase = createClient();
        let { data, error } = await supabase
          .from('occupation')
          .select('*')
          .eq('category', 'Career');
        if (error) {
          console.error("Error fetching occupations:", error);
        } 
        setOccupations(data || []);
      }
      useEffect(()=>{
        getCartItems();
        getOccupations();
      },[])
      
      const logoutUser = async()=>{
        const supabase = createClient();
        await supabase.auth.signOut();
        deleteUserCookies();
      }
      
    return(
    <Navbar className="flex justify-center items-center py-5 border-b" onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
      </NavbarContent>
      <NavbarContent className="sm:flex gap-4" justify="center">
        <NavbarBrand className="self-center" as={Link} href="/" >
            <Image className="rounded-full" src="/avatar.png" alt="logo" width={70} height={70}></Image>
        </NavbarBrand>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
        <Dropdown>
          <DropdownTrigger>
              <Image radius="none" src="/user-interface.svg" alt="logo" width={30} height={30}></Image>
          </DropdownTrigger>
          {user ? 
          <DropdownMenu>
            <DropdownItem key="myquestion" href="/myquestion">
              我的面試問題
            </DropdownItem>
            <DropdownItem key="logout" onPress={()=>logoutUser()}>
              登出
            </DropdownItem>
          </DropdownMenu>
          :
          <DropdownMenu>
          <DropdownItem href="/login" >
            登入
          </DropdownItem>
        </DropdownMenu>
            }
        </Dropdown>
        </NavbarItem>
        <NavbarItem>
        <Dropdown isOpen={cart} onOpenChange={(open)=>setCart(open)}>
          <DropdownTrigger>
            <Image radius="none" src="/shopping-bag.svg" alt="logo" width={30} height={30}></Image>
          </DropdownTrigger>
          <DropdownMenu closeOnSelect={false} variant="light" className="max-w-[500px]">
            <DropdownItem className="p-5">
            {!cartLoading? cartList?.length != 0 ? 
            <>
            {cartList?.map((item,i)=>(
              <div key={i} className="flex pb-5">
                <div className="w-[30%]">
                  <Image radius="none" alt="" src={item.occupation.img_url}/>
                </div>
                <div className="pl-10 pr-2 py-1 w-[65%]">
                  <div className="text-xl text-wrap">{item.occupation.chi_name}</div>
                  <div className="py-5 text-xl text-gray-500">${item.occupation.price}</div>
                </div>
                <div onClick={()=>{deleteCart(item.cart_id);getCartItems()}}>
                <Image radius="none" src="/cross.svg" alt="logo" width={30} height={30}></Image>
                </div>
              </div>
            ))}
            <div>
              <Button as={Link} href='/checkout' className="w-full h-12" color="danger">前往付款</Button>
            </div>
            </>
            :
            <div className="flex justify-center items-center h-64 max-w-[500px]">
              您的購物車是空的
            </div>
            :
            <div className="flex justify-center items-center h-64 max-w-[500px]">
                <Spinner color="default"/>
            </div>
            }
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
        </NavbarItem>
      </NavbarContent>
      <NavbarMenu className="py-[55px] pb-[70px]">
        <NavbarMenuItem>
          <Link className="w-full text-midnight text-3xl font-black py-2" href="/atsscan" size="lg">ATS履歷優化</Link>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <div className="w-full text-midnight text-3xl font-black py-2">所有行業面試問題及答案</div>
        </NavbarMenuItem>
      {occupations.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link className="w-full text-midnight px-12" href={`/myquestion/${item.occupation_id}`} size="lg">
              <div className="py-1">
                <div>
                  {item.chi_name}
                </div>
                <div>
                  {item.eng_name}
                </div>
              </div>
            </Link>
          </NavbarMenuItem>
        ))}
        <NavbarMenuItem>
          <Link className="w-full text-midnight text-3xl font-black py-2" href="/myquestion/76" size="lg">50個熱門面試問題及答案</Link>
        </NavbarMenuItem>
      </NavbarMenu>
    </Navbar>
    );
}
