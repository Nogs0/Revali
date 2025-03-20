import { CirclePlus, LogOut, History, User, Building, PackagePlus, Medal, ShoppingCart, UserPlus, LayoutGrid, SquarePlus } from "lucide-react";
import Tippy from '@tippyjs/react';
import { useAuth } from "../context/authContext";

interface AsideProps {
    handleDonation: () => void;
    handleLogout: () => void;
    openSection: (section: string | null) => void;
}

export function Aside({
    handleDonation, handleLogout, openSection }: AsideProps) {

    const { userEmail, userName, getUserInfo } = useAuth();

    const userIdLocalStorage = localStorage.getItem("user-id")
    const tipo = localStorage.getItem('tipo');

    getUserInfo(Number(userIdLocalStorage))


    return (
        <>
            <aside className="w-2/5 md:w-2/5 lg:w-1/4 xl:w-1/5 bg-green-dark text-white flex flex-col ">
                <div className='flex items-center gap-2 p-4'>
                    <h1 onClick={() => openSection("welcomePage")} className="text-3xl md:text-4xl lg:text-5xl font-ltrenovate-bold mb-[-8px] cursor-pointer">REVALI</h1>
                </div>

                <div className='flex flex-col gap-8 tall:gap-11 p-4 tall:mt-14'>
                    {(tipo === "0" || tipo === "1") && (
                        <>
                            <button onClick={() => openSection("ranking")} className="flex items-center hover:text-zinc-300 gap-2">
                                <Medal />
                                <span className="ml-2 font-raleway-semibold text-base tall:text-lg">Ranking</span>
                            </button>
                            <button onClick={() => openSection("donationHistory")} className="flex items-center hover:text-zinc-300 gap-2">
                                <History />
                                <span className="ml-2 font-raleway-semibold text-base tall:text-lg">Histórico de doações</span>
                            </button>
                            <button onClick={() => openSection("claimedItems")} className="flex items-center hover:text-zinc-300 gap-2">
                                <ShoppingCart />
                                <span className="ml-2 font-raleway-semibold text-base tall:text-lg">Produtos para resgatar</span>
                            </button>
                            <button onClick={handleDonation} className="flex items-center hover:text-zinc-300 gap-2">
                                <CirclePlus />
                                <span className="ml-2 font-raleway-semibold text-base tall:text-lg">Cadastrar Doação</span>
                            </button>
                        </>
                    )}
                    {tipo === "0" && (
                        <>
                            <button onClick={() => openSection("addUser")} className="flex items-center hover:text-zinc-300 gap-2">
                                <UserPlus />
                                <span className="ml-2 font-raleway-semibold text-base tall:text-lg">Adicionar usuário</span>
                            </button>
                            <button onClick={() => openSection("addProduct")} className="flex items-center hover:text-zinc-300 gap-2">
                                <PackagePlus />
                                <span className="ml-2 font-raleway-semibold text-base tall:text-lg">Adicionar produtos</span>
                            </button>
                            <button onClick={() => openSection("addEnterprise")} className="flex items-center hover:text-zinc-300 gap-2">
                                <Building />
                                <span className="ml-2 font-raleway-semibold text-base tall:text-lg">Registro de empresas</span>
                            </button>
                        </>
                    )}
                    {tipo === "3" && (
                        <>
                            <button onClick={() => openSection("dashboard")} className="flex items-center hover:text-zinc-300 gap-2">
                                <LayoutGrid />
                                <span className="ml-2 font-raleway-semibold text-base tall:text-lg">Dashboard</span>
                            </button>
                            <button onClick={() => openSection("addBancoWithUser")} className="flex items-center hover:text-zinc-300 gap-2">
                                <SquarePlus/>
                                <span className="ml-2 font-raleway-semibold text-base tall:text-lg">Banco de alimentos</span>
                            </button>
                        </>
                    )}
                </div>

                <div className="flex-grow"></div>

                <div className="flex flex-col gap-8 tall:gap-11 p-4">
                    <button onClick={() => openSection("account")} className="flex items-center hover:text-zinc-300 gap-2">
                        <User />
                        <span className="ml-2 font-raleway-semibold text-base tall:text-lg">Conta</span>
                    </button>
                </div>

                <div className='bg-lime-950 h-px mt-11'></div>

                <div className='flex items-center justify-between p-4'>
                    <div className='flex flex-col'>
                        <span className="font-raleway-semibold">{userName}</span>
                        <span className="font-raleway-regular text-sm text-zinc-300">{userEmail}</span>
                    </div>

                    <button onClick={handleLogout}>
                        <Tippy content="Sair">
                            <LogOut className="text-white cursor-pointer" />
                        </Tippy>
                    </button>
                </div>
            </aside>
        </>
    );
}