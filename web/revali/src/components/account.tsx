import { useQuery } from "react-query";
import { useAuth } from "../context/authContext";
import { showUsers } from "../http/show-users";

export function Account() {

    const { userEmail, userName, userCPF, getUserInfo } = useAuth();

    const userIdLocalStorage = localStorage.getItem("user-id")

    getUserInfo(Number(userIdLocalStorage))

    return (
        <div className="flex flex-col items-center justify-center mt-28 bg-gray-100">
            <div className="bg-white shadow-md rounded-lg w-3/4 md:w-1/2 lg:w-1/3 p-6">
                <h2 className="text-2xl font-raleway-bold mb-4 text-center text-black">Informações da Conta</h2>
                <div className="space-y-4">
                    <div>
                        <label className="text-gray-700 font-inter font-medium text-sm">Nome</label>
                        <input
                            type="text"
                            className="w-full mt-1 p-2 border border-gray-300 rounded-md  outline-none ring-green-medium ring-offset-3 ring-offset-slate-100 focus-within:ring-2"
                            value={userEmail ?? ''}
                        />
                    </div>
                    <div>
                        <label className="text-gray-700 font-inter font-medium text-sm">Email</label>
                        <input
                            type="text"
                            className="w-full mt-1 p-2 border border-gray-300 rounded-md  outline-none ring-green-medium ring-offset-3 ring-offset-slate-100 focus-within:ring-2"
                            value={userName ?? ''}
                        />
                    </div>
                    <div>
                        <label className="text-gray-700 font-inter font-medium text-sm">CPF</label>
                        <input
                            type="text"
                            className="w-full mt-1 p-2 border border-gray-300 rounded-md  outline-none ring-green-medium ring-offset-3 ring-offset-slate-100 focus-within:ring-2"
                            value={userCPF ?? ''}                   
                        />
                    </div>
                </div>
                <div className="mt-6 flex justify-center">
                    <button className="bg-green-medium hover:bg-[#6C9965] text-white py-2 px-12 rounded-xl">Atualizar</button>
                </div>
            </div>
        </div>
    )
}