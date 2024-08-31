import InputMask from 'react-input-mask';

export function AddProduct() {
    return (
        <>
            <h2 className="text-2xl font-semibold mb-6 px-6 pt-4">Adicionar novos produtos</h2>
            <div className="bg-white p-6 rounded-lg mx-6 max-h-80 tall:max-h-[580px] overflow-y-auto">
                <h3 className="text-lg font-semibold mb-4">Informações da empresa</h3>
                <form className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <label className="text-gray-700 font-inter font-medium text-sm">Nome do produto</label>
                        <input
                            type="text"
                            className="w-full mt-1 p-2 border border-gray-300 rounded-md outline-none ring-green-medium ring-offset-3 ring-offset-slate-100 focus-within:ring-2"
                            required
                        />
                    </div>

                    <div>
                        <label className="text-gray-700 font-inter font-medium text-sm">Quantidade</label>
                        <input
                            type="number"
                            className="w-full mt-1 p-2 border border-gray-300 rounded-md  outline-none ring-green-medium ring-offset-3 ring-offset-slate-100 focus-within:ring-2"
                            required
                        />
                    </div>

                    <div>
                        <label className="text-gray-700 font-inter font-medium text-sm">Valor</label>
                        <InputMask
                             mask="99.999.999/9999-99"
                            type="text"
                            className="w-full mt-1 p-2 border border-gray-300 rounded-md  outline-none ring-green-medium ring-offset-3 ring-offset-slate-100 focus-within:ring-2"
                            required
                        />
                    </div>

                    <div>
                        <label className="text-gray-700 font-inter font-medium text-sm">Fornecedor</label>
                        <select
                            className="w-full mt-1 p-2 border border-gray-300 rounded-md font-inter font-medium text-sm text-black opacity-60  outline-none ring-green-medium ring-offset-3 ring-offset-slate-100 focus-within:ring-2"
                            required
                        >
                            <option value="">Selecione um fornecedor</option>
                        </select>
                    </div>

                    <div>
                        <label className="text-gray-700 font-inter font-medium text-sm">Marca</label>
                        <input
                            type="text"
                            className="w-full mt-1 p-2 border border-gray-300 rounded-md  outline-none ring-green-medium ring-offset-3 ring-offset-slate-100 focus-within:ring-2"
                        />
                    </div>


                    <div>
                        <label className="text-gray-700 font-inter font-medium text-sm">Imagem do produto</label>
                        <input
                            accept="image/png, image/jpeg, image/svg, image/svg+xml"
                            type="file"
                            className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                        />
                    </div>

                    <div className="md:col-span-3">
                        <label className="text-gray-700 font-inter font-medium text-sm">Descrição</label>
                        <textarea className="h-32 w-full p-2 border rounded resize-none align-top mt-1 outline-none ring-green-medium ring-offset-3 ring-offset-slate-100 focus-within:ring-2"></textarea>
                    </div>


                    <div className="md:col-span-3">
                        <button
                            type="submit"
                            className="w-full bg-green-medium text-white py-2 px-4 rounded-md hover:bg-[#6C9965]"
                        >
                           Adicionar produto
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}