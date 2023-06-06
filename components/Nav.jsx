'use client';

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";

const Nav = () => {
    const [session, setSession] = useState(true);

    return (
        // <div>
        //     {session ? User():Guest()}
        // </div>

        <nav className="flex-between w-full mb-16 pt-3">
            <Link href="/" className="flex gap-2 flex-center">
                <Image src="/assets/images/user-robot.svg" alt="web logo"
                width={30}
                height={30}
                className="object-contain"
                />
                <p className="logo_text">QiRON ROBOTICS</p>
            </Link>

            {/*desktop navigation*/}
            <div className="sm:flex">       
                <div className="flex gap-3 md:gap-5">
                    <Link href="/create-content" className="indigo_btn">
                        Criar Conteúdo
                    </Link>

                    <Link href="/register" className="indigo_btn">
                        Cadastro
                    </Link>

                    <button type="button" className="outline_btn">
                        Sair
                    </button>
                </div>
            </div>
        </nav>
    );
}

//guest
function Guest(){
    <nav className="flex-between w-full mb-16 pt-3">
        <Link href="/" className="flex gap-2 flex-center">
            <Image src="/assets/images/user-robot.svg" alt="web logo"
            width={30}
            height={30}
            className="object-contain"
            />
            <p className="logo_text">QiRON ROBOTICS</p>
        </Link>
    </nav>

}

//user authorized
function User(){
   <nav className="flex-between w-full mb-16 pt-3">
        <Link href="/" className="flex gap-2 flex-center">
            <Image src="/assets/images/user-robot.svg" alt="web logo"
            width={30}
            height={30}
            className="object-contain"
            />
            <p className="logo_text">QiRON ROBOTICS</p>
        </Link>

        {/*desktop navigation*/}
        <div className="sm:flex">       
            <div className="flex gap-3 md:gap-5">
                <Link href="/create-content" className="indigo_btn">
                    Criar Conteúdo
                </Link>

                <Link href="/register" className="indigo_btn">
                    Cadastro
                </Link>

                <button type="button" className="outline_btn">
                    Sair
                </button>
            </div>
        </div>
    </nav>

}

export default Nav