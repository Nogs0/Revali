import { CirclePlus, FileX2, LogOut, History, User, Building, PackagePlus } from "lucide-react";
import revaliLogo from "../assets/revali-logo.svg";
import Tippy from '@tippyjs/react';

interface AsideProps {
    handleDonation: () => void;
    handleLogout: () => void;
    closeUserSettings: () => void;
    openUserSettings: () => void;
    openAddNewEnterprise: () => void;
    closeAddNewEnterprise: () => void;
    openAddProduct: () => void;
    closeAddProduct: () => void;
}

export function Aside({ handleDonation, handleLogout, closeUserSettings, openUserSettings, openAddNewEnterprise, closeAddNewEnterprise, openAddProduct, closeAddProduct }: AsideProps) {

    function closeAll() {
        closeUserSettings();
        closeAddNewEnterprise();
        closeAddProduct();
    }

    function openSectionEnterprise() {
        closeUserSettings();
        closeAddProduct();
        openAddNewEnterprise();
    }

    function openSectionProduct(){
        closeAddNewEnterprise();
        closeUserSettings();
        openAddProduct();
    }

    return (
        <>
            <aside className="w-2/5 md:w-2/5 lg:w-1/4 xl:w-1/5 bg-green-dark text-white flex flex-col overflow-y-auto max-h-screen">
                <div className='flex items-center gap-2 p-4'>
                    <h1 className="text-4xl md:text-5xl font-ltrenovate-bold">REVALI</h1>
                    <img src={revaliLogo} alt="RevaliLogo" className='size-16 md:size-24' />
                </div>

                <div className='flex flex-col gap-8 tall:gap-11 p-4 tall:mt-14'>
                    <button onClick={closeAll} className="flex items-center hover:text-zinc-300 gap-2">
                        <History />
                        <span className="ml-2 font-raleway-semibold text-base tall:text-lg">Histórico de doações</span>
                    </button>
                    <button onClick={handleDonation} className="flex items-center hover:text-zinc-300 gap-2">
                        <CirclePlus />
                        <span className="ml-2 font-raleway-semibold text-base tall:text-lg">Cadastrar Doação</span>
                    </button>
                    <button onClick={openSectionProduct} className="flex items-center hover:text-zinc-300 gap-2">
                        <PackagePlus />
                        <span className="ml-2 font-raleway-semibold text-base tall:text-lg">Adicionar produtos</span>
                    </button>
                    <button onClick={openSectionEnterprise} className="flex items-center hover:text-zinc-300 gap-2">
                        <Building />
                        <span className="ml-2 font-raleway-semibold text-base tall:text-lg">Registro de empresas</span>
                    </button>
                </div>

                <div className="flex-grow"></div>

                <div className="flex flex-col gap-8 tall:gap-11 p-4">
                    <button onClick={openUserSettings} className="flex items-center hover:text-zinc-300 gap-2">
                        <User />
                        <span className="ml-2 font-raleway-semibold text-base tall:text-lg">Conta</span>
                    </button>
                </div>

                <div className='bg-lime-950 h-px mt-11'></div>

                <div className='flex items-center justify-between p-4'>
                    <div className='flex flex-col'>
                        <span className="font-raleway-semibold">Banco De Alimentos</span>
                        <span className="font-raleway-regular text-sm text-zinc-300">bancodealimentos@gmail.com</span>
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
