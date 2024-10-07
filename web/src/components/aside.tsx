import { CirclePlus, LogOut, History, User, Building, PackagePlus, Medal, ShoppingCart, UserPlus } from "lucide-react";
import Tippy from '@tippyjs/react';
import { useAuth } from "../context/authContext";
import { jwtDecode } from "jwt-decode";
import { toast } from "sonner";

interface AsideProps {
    handleDonation: () => void;
    handleLogout: () => void;
    closeUserSettings: () => void;
    openUserSettings: () => void;
    openAddNewEnterprise: () => void;
    closeAddNewEnterprise: () => void;
    openAddProduct: () => void;
    closeAddProduct: () => void;
    openDonationHistory: () => void;
    closeDonationHistory: () => void;
    openClaimedItems: () => void;
    closeClaimedItems: () => void;
    openAddNewUser: () => void;
    closeAddNewUser: () => void;
}

export function Aside({
    handleDonation, handleLogout, closeUserSettings, openUserSettings,
    openAddNewEnterprise, closeAddNewEnterprise, openAddProduct, closeAddProduct,
    openDonationHistory, closeDonationHistory, openClaimedItems, closeClaimedItems, openAddNewUser, closeAddNewUser }: AsideProps) {

    const isTokenValid = (): boolean => {
        const token = localStorage.getItem("token-validate");
        if (!token) return false;

        try {
            const decodedToken: { exp: number } = jwtDecode(token);
            const currentTime = Date.now() / 1000; // em segundos
            return decodedToken.exp > currentTime; // Verifica se o token expirou
        } catch (error) {
            return false; // Se houver algum erro ao decodificar
        }
    };

    const errorMessageToken = () => {
        if (isTokenValid() === false) {
            toast.error("Sessão expirada. Por favor, faça login novamente.");
            localStorage.clear();
            setTimeout(() => {
                window.location.href = '/';
            }, 1000); 
        }
    }

    const { userEmail, userName, getUserInfo } = useAuth();

    const userIdLocalStorage = localStorage.getItem("user-id")
    const tipo = localStorage.getItem('tipo');

    getUserInfo(Number(userIdLocalStorage))

    function closeAll() {
        errorMessageToken();
        closeDonationHistory();
        closeUserSettings();
        closeAddNewEnterprise();
        closeAddProduct();
        closeClaimedItems();
        closeAddNewUser();
    }

    function closeHistory() {
        errorMessageToken();
        closeUserSettings();
        closeAddNewEnterprise();
        closeAddProduct();
        closeClaimedItems();
        closeAddNewUser();
        openDonationHistory();
    }

    function openSectionEnterprise() {
        errorMessageToken();
        closeDonationHistory();
        closeUserSettings();
        closeClaimedItems();
        closeAddProduct();
        closeAddNewUser();
        openAddNewEnterprise();
    }

    function openSectionProduct() {
        errorMessageToken();
        closeDonationHistory();
        closeAddNewEnterprise();
        closeClaimedItems();
        closeUserSettings();
        closeAddNewUser();
        openAddProduct();
    }

    function openSectionAccount() {
        errorMessageToken();
        closeDonationHistory();
        closeAddNewEnterprise();
        closeClaimedItems();
        closeDonationHistory();
        closeAddNewUser();
        openUserSettings();
    }

    function openSectionClaimedItems() {
        errorMessageToken();
        closeDonationHistory();
        closeAddNewEnterprise();
        closeDonationHistory();
        closeUserSettings();
        closeAddProduct();
        closeAddNewUser();
        openClaimedItems();
    }

    function openSectionAddNewUser() {
        errorMessageToken();
        closeDonationHistory();
        closeAddNewEnterprise();
        closeDonationHistory();
        closeUserSettings();
        closeAddProduct();
        closeClaimedItems();
        openAddNewUser();
    }

    return (
        <>
            <aside className="w-2/5 md:w-2/5 lg:w-1/4 xl:w-1/5 bg-green-dark text-white flex flex-col ">
                <div className='flex items-center gap-2 p-4'>
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-ltrenovate-bold mb-[-8px]">REVALI</h1>
                </div>

                <div className='flex flex-col gap-8 tall:gap-11 p-4 tall:mt-14'>
                    <button onClick={closeAll} className="flex items-center hover:text-zinc-300 gap-2">
                        <Medal />
                        <span className="ml-2 font-raleway-semibold text-base tall:text-lg">Ranking</span>
                    </button>
                    <button onClick={closeHistory} className="flex items-center hover:text-zinc-300 gap-2">
                        <History />
                        <span className="ml-2 font-raleway-semibold text-base tall:text-lg">Histórico de doações</span>
                    </button>
                    <button onClick={openSectionClaimedItems} className="flex items-center hover:text-zinc-300 gap-2">
                        <ShoppingCart />
                        <span className="ml-2 font-raleway-semibold text-base tall:text-lg">Produtos para resgatar</span>
                    </button>
                    <button onClick={handleDonation} className="flex items-center hover:text-zinc-300 gap-2">
                        <CirclePlus />
                        <span className="ml-2 font-raleway-semibold text-base tall:text-lg">Cadastrar Doação</span>
                    </button>
                    {tipo !== '1' && (
                        <>
                            <button onClick={openSectionAddNewUser} className="flex items-center hover:text-zinc-300 gap-2">
                                <UserPlus />
                                <span className="ml-2 font-raleway-semibold text-base tall:text-lg">Adicionar usuário</span>
                            </button>
                            <button onClick={openSectionProduct} className="flex items-center hover:text-zinc-300 gap-2">
                                <PackagePlus />
                                <span className="ml-2 font-raleway-semibold text-base tall:text-lg">Adicionar produtos</span>
                            </button>
                            <button onClick={openSectionEnterprise} className="flex items-center hover:text-zinc-300 gap-2">
                                <Building />
                                <span className="ml-2 font-raleway-semibold text-base tall:text-lg">Registro de empresas</span>
                            </button>
                        </>
                    )}
                </div>

                <div className="flex-grow"></div>

                <div className="flex flex-col gap-8 tall:gap-11 p-4">
                    <button onClick={openSectionAccount} className="flex items-center hover:text-zinc-300 gap-2">
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