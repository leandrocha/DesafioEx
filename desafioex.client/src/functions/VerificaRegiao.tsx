
const regioesBrasileiras: { [key: string]: Array<string> } = {
  Norte: ['AC', 'AM', 'AP', 'PA', 'RO', 'RR', 'TO'],
  Nordeste: ['AL', 'BA', 'CE', 'MA', 'PB', 'PE', 'PI', 'RN', 'SE'],
  CentroOeste: ['DF', 'GO', 'MT', 'MS'],
  Sudeste: ['ES', 'MG', 'RJ', 'SP'],
  Sul: ['PR', 'RS', 'SC'],
};

export default function verificarRegiao(estado: string): string{
    for (const regiao in regioesBrasileiras) {
        const estadosRegiao = regioesBrasileiras[regiao];
        for (let i = 0; i < estadosRegiao.length; i++) {
            if (estadosRegiao[i] === estado) {
                return regiao;
            }
        }
    }
    return 'Região não encontrada';
};