import { Award } from 'lucide-react';
import { getCompanyRanking } from '../http/get-company-ranking';
import { useQuery } from 'react-query';
import { getDonatorRanking } from '../http/get-donator-ranking';
import { toast } from 'sonner';


export function Ranking() {


    const { data: companyRanking, isError: isCompanyRankingError, isLoading: isCompanyRankingLoading } = useQuery("company-ranking", getCompanyRanking);
    const { data: donatorRanking, isError: isDonatorRankingError, isLoading: isDonatorRankingLoading } = useQuery("doador-ranking", getDonatorRanking);


    const renderPosition = (position: number) => {
        switch (position) {
            case 1:
                return <Award className="text-yellow-500 w-5 h-5" />;
            case 2:
                return <Award className="text-gray-500 w-5 h-5" />;
            case 3:
                return <Award className="text-yellow-700 w-5 h-5" />;
            default:
                return position;
        }
    }

    if (isCompanyRankingLoading || isDonatorRankingLoading) {
        return (
            <div className="flex items-center justify-center py-3">
              <div className="loader border-t-4 border-green-medium rounded-full w-8 h-8 animate-spin"></div>
            </div>
        );
    }

    if (isCompanyRankingError || isDonatorRankingError) {
        toast.error('Erro ao carregar os rankings')
    }


    return (
        <div className="p-8 flex flex-col items-center ">
            <h1 className="text-2xl font-bold mb-6">Ranking</h1>

            <div className="flex flex-row gap-8 w-full max-w-4xl">
                {/* Tabela de Empresas */}
                <div className="w-full max-w-md">
                    <h2 className="text-xl font-semibold mb-4 text-center">Empresas</h2>
                    <div className="max-h-[330px] overflow-y-auto rounded-lg shadow-md border border-gray-200 scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-gray-400 hover:scrollbar-thumb-gray-500">
                        <table className="w-full text-left border-collapse">
                            <thead className="sticky top-0 bg-gray-100">
                                <tr>
                                    <th className="p-3 text-gray-700 font-semibold border-b">Posição</th>
                                    <th className="p-3 text-gray-700 font-semibold border-b">Nome</th>
                                    <th className="p-3 text-gray-700 font-semibold border-b">Pontos</th>
                                </tr>
                            </thead>
                            <tbody>
                                {companyRanking?.map((company) => (
                                    <tr key={company.ranking} className="border-b hover:bg-gray-50">
                                        <td className="p-3">{renderPosition(company.ranking)}</td>
                                        <td className="p-3">{company.empresa.nome_empresa}</td>
                                        <td className="p-3">{company.total_dinheiro_doado}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Tabela de Usuários */}
                <div className="w-full max-w-md">
                    <h2 className="text-xl font-semibold mb-4 text-center">Usuários</h2>
                    <div className="max-h-[330px] overflow-y-auto rounded-lg shadow-md border border-gray-200 scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-gray-400 hover:scrollbar-thumb-gray-500">
                        <table className="w-full text-left border-collapse">
                            <thead className="sticky top-0 bg-gray-100">
                                <tr>
                                    <th className="p-3 text-gray-700 font-semibold border-b">Posição</th>
                                    <th className="p-3 text-gray-700 font-semibold border-b">Nome</th>
                                    <th className="p-3 text-gray-700 font-semibold border-b">Pontos</th>
                                </tr>
                            </thead>
                            <tbody>
                                {donatorRanking?.map((user) => (
                                    <tr key={user.ranking} className="border-b hover:bg-gray-50">
                                        <td className="p-3">{renderPosition(user.ranking)}</td>
                                        <td className="p-3">{user.doador.nome}</td>
                                        <td className="p-3">{user.pontos_gerados}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}