'use client';

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "@app/contexts/authContext";
import { usePathname, useRouter } from "next/navigation";
import { logout } from "@app/api/Api";

const Nav = () => {
    const router = useRouter();
    const pathname = usePathname();
    const { isUserAuthenticated } = useContext(AuthContext);
    const [ logged, setLogged ] = useState(false);

    useEffect(() => {
        setLogged(isUserAuthenticated());
    }, [pathname]);

    const handleLogout = () => {
        logout();
        router.push('/login');
    }

    return (
        <>
        {logged ? (
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

                        <Link href="/create-robo" className="indigo_btn">
                            Robô
                        </Link>

                        <Link href="/register" className="indigo_btn">
                            Cadastro
                        </Link>

                        <button onClick={handleLogout} type="button" className="outline_btn">
                            Sair
                        </button>
                    </div>
                </div>
            </nav>
        ): (
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
        )}
        </>  
    );
}

export default Nav