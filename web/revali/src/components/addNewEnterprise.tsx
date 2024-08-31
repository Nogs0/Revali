export function AddNewEnterprise() {
    return (
        <>
            <h2 className="text-2xl font-semibold mb-6 px-6 pt-4">Registro de empresas parceiras</h2>
            <div className="bg-white p-6 rounded-lg mx-6 max-h-80 tall:max-h-96 overflow-y-auto tall:overflow-y-hidden">
                <h3 className="text-lg font-semibold mb-4">Informações da empresa</h3>
                <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="text-gray-700 font-inter font-medium text-sm">Nome da Empresa</label>
                        <input
                            type="text"
                            className="w-full mt-1 p-2 border border-gray-300 rounded-md outline-none ring-green-medium ring-offset-3 ring-offset-slate-100 focus-within:ring-2"
                            required
                        />
                    </div>

                    <div>
                        <label className="text-gray-700 font-inter font-medium text-sm">Email</label>
                        <input
                            type="email"
                            className="w-full mt-1 p-2 border border-gray-300 rounded-md outline-none ring-green-medium ring-offset-3 ring-offset-slate-100 focus-within:ring-2"
                            required
                        />
                    </div>

                    <div>
                        <label className="text-gray-700 font-inter font-medium text-sm">CNPJ</label>
                        <input
                            type="text"
                            className="w-full mt-1 p-2 border border-gray-300 rounded-md outline-none ring-green-medium ring-offset-3 ring-offset-slate-100 focus-within:ring-2"
                            required
                        />
                    </div>

                    <div>
                        <label className="text-gray-700 font-inter font-medium text-sm">Endereço</label>
                        <input
                            type="text"
                            className="w-full mt-1 p-2 border border-gray-300 rounded-md outline-none ring-green-medium ring-offset-3 ring-offset-slate-100 focus-within:ring-2"
                            required
                        />
                    </div>

                    <div>
                        <label className="text-gray-700 font-inter font-medium text-sm">Telefone</label>
                        <input
                            type="tel"
                            className="w-full mt-1 p-2 border border-gray-300 rounded-md outline-none ring-green-medium ring-offset-3 ring-offset-slate-100 focus-within:ring-2"
                        />
                    </div>

                    <div>
                        <label className="text-gray-700 font-inter font-medium text-sm">Logo da Empresa</label>
                        <input
                            type="file"
                            accept="image/png, image/jpeg, image/svg, image/svg+xml"
                            className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                        />
                    </div>

                    <div className="md:col-span-2">
                        <button
                            type="submit"
                            className="w-full bg-green-medium text-white py-2 px-4 rounded-md hover:bg-[#6C9965]"
                        >
                            Registrar Empresa
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}
