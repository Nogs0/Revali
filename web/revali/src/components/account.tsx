export function Account() {
    return (
        <div className="flex flex-col items-center justify-center mt-28 bg-gray-100">
            <div className="bg-white shadow-md rounded-lg w-3/4 md:w-1/2 lg:w-1/3 p-6">
                <h2 className="text-2xl font-raleway-bold mb-4 text-center text-black">Informações da Conta</h2>
                <div className="space-y-4">
                    <div>
                        <label className="block text-gray-700 font-raleway-medium">Nome Completo</label>
                        <div className="bg-gray-200 rounded-md p-2">Banco De Alimentos</div>
                    </div>
                    <div>
                        <label className="block text-gray-700 font-raleway-medium">Email</label>
                        <div className="bg-gray-200 rounded-md p-2">bancosdealimentos@gmail.com</div>
                    </div>
                    <div>
                        <label className="block text-gray-700 font-raleway-medium">Telefone</label>
                        <div className="bg-gray-200 rounded-md p-2">(35) 99999-9999</div>
                    </div>
                    <div>
                        <label className="block text-gray-700 font-raleway-medium">Endereço</label>
                        <div className="bg-gray-200 rounded-md p-2">Rua Exemplo, 123, Bairro Centro, Cidade - Estado</div>
                    </div>
                </div>
                <div className="mt-6 flex justify-center">
                    <button className="bg-green-900 hover:bg-[#305742] text-white py-2 px-4 rounded-lg">Editar Informações</button>
                </div>
            </div>
        </div>
    )
}