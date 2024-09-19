<?php
namespace App\Exports;

use Maatwebsite\Excel\Concerns\FromArray;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithStyles;
use Maatwebsite\Excel\Concerns\WithCustomStartCell;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;

class DoacaoExport implements FromArray, WithHeadings, WithStyles, WithCustomStartCell
{
    protected $data;
    protected $requestDate; 

    protected $banco_de_alimentos;

    // Construtor para receber os dados e a data
    public function __construct($data, $requestDate, $banco_de_alimentos)
    {
        $this->data = $data;
        $this->requestDate = $requestDate; // Atribui a data enviada
        $this->banco_de_alimentos = $banco_de_alimentos;
    }

    // Cabeçalhos
    public function headings(): array
    {
        return [
            'ID da Doação',
            'Data da Doação',
            'Nome Doador',
            'Documento',
            'Email',
            'Quantidade KG',
            'Preço total em R$',
            'Pontos Gerados Item',
            'Alimento',
            'Qualidade',
            'Preço por Kg',
        ];
    }

    // Define a célula inicial
    public function startCell(): string
    {
        return 'A4'; 
    }

    // Define os dados da planilha
    public function array(): array
    {
        $rows = [];
        $totalPontos = 0;
        $totalQuantidade = 0;
        $totalReais = 0;

        foreach ($this->data as $doacao) {
            $quantidade = $doacao['Quantidade KG'];
            $precoReais = $doacao['Preço total em R$'];
            $pontosItem = $doacao['Pontos Gerados Item'];

            // Adiciona as linhas de dados
            $rows[] = [
                $doacao['ID da Doação'],
                $doacao['Data da Doação'],
                $doacao['Nome Doador'],
                $doacao['Documento'],
                $doacao['Email'],
                $quantidade,
                $precoReais,
                $pontosItem,
                $doacao['Alimento'],
                $doacao['Qualidade'],
                $doacao['Preço por Kg'],
            ];

            // Soma total
            $totalQuantidade += $quantidade;
            $totalReais += $precoReais;
            $totalPontos += $pontosItem;
        }

        // Adiciona linha final com total
        $rows[] = [
            '', '', '', '', '', 
            $totalQuantidade, 
            $totalReais, 
            $totalPontos, 
            'TOTAL', '', ''
        ];

        return $rows;
    }

    // Estilos da planilha
    public function styles(Worksheet $sheet)
    {
        $sheet->mergeCells('A1:K1');
        $sheet->mergeCells('A2:K2');

      
        $sheet->setCellValue('A1', $this->banco_de_alimentos);
       
        $sheet->setCellValue('A2', 'REVALI - DOAÇÃO INTELIGENTE');
       
        $sheet->setCellValue('A3', 'DATA: ' . date('d/m/Y', strtotime($this->requestDate)));

        
        $sheet->getStyle('A1')->applyFromArray([
            'font' => [
                'bold' => true,
                'size' => 16,
            ],
            'alignment' => [
                'horizontal' => \PhpOffice\PhpSpreadsheet\Style\Alignment::HORIZONTAL_CENTER,
            ],
        ]);

        // Estilo do subtítulo (negrito e tamanho 14)
        $sheet->getStyle('A2')->applyFromArray([
            'font' => [
                'bold' => true,
                'size' => 14,
            ],
            'alignment' => [
                'horizontal' => \PhpOffice\PhpSpreadsheet\Style\Alignment::HORIZONTAL_CENTER,
            ],
        ]);

        
        $sheet->getStyle('A3')->applyFromArray([
            'font' => [
                'bold' => true,
                'size' => 12,
            ],
            'alignment' => [
                'horizontal' => \PhpOffice\PhpSpreadsheet\Style\Alignment::HORIZONTAL_CENTER,
            ],
        ]);

        // Estilos para o cabeçalho da tabela
        $sheet->getStyle('A4:K4')->applyFromArray([
            'font' => [
                'bold' => true,
            ],
            'borders' => [
                'allBorders' => [
                    'borderStyle' => \PhpOffice\PhpSpreadsheet\Style\Border::BORDER_THIN,
                ],
            ],
            'alignment' => [
                'horizontal' => \PhpOffice\PhpSpreadsheet\Style\Alignment::HORIZONTAL_CENTER,
            ],
        ]);

        // Adiciona bordas aos dados
        $sheet->getStyle('A5:K' . (count($this->data) + 4))->applyFromArray([
            'borders' => [
                'allBorders' => [
                    'borderStyle' => \PhpOffice\PhpSpreadsheet\Style\Border::BORDER_THIN,
                ],
            ],
        ]);

      
        $sheet->getStyle('A' . (count($this->data) + 5) . ':K' . (count($this->data) + 5))->applyFromArray([
            'font' => [
                'bold' => true,
            ],
            'borders' => [
                'allBorders' => [
                    'borderStyle' => \PhpOffice\PhpSpreadsheet\Style\Border::BORDER_THIN,
                ],
            ],
        ]);
    }
}
