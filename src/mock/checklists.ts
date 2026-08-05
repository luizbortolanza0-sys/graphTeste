import type { Checklist, CategoriaVeiculo, StatusChecklist, NomePeriferico, PerifericoStatus } from '../types/checklist';

const CATEGORIAS: CategoriaVeiculo[] = ['Caminhão', 'Truck', 'Carreta', 'Bitrem', 'Rodotrem'];

const FILIAIS = ['São Paulo - Matriz', 'Curitiba - Filial', 'Belo Horizonte - Filial'];

const VEICULOS: Record<CategoriaVeiculo, string[]> = {
  'Caminhão': ['Mercedes Accelo 1016', 'VW Delivery 11.180', 'Volvo VM 270'],
  'Truck': ['Volvo VM 330', 'Scania P320', 'Mercedes Atego 2430'],
  'Carreta': ['Volvo FH 540 6x4', 'Scania R450', 'Mercedes Actros 2651'],
  'Bitrem': ['Volvo FH 540 Bitrem', 'Scania R500 Bitrem', 'DAF XF 530 Bitrem'],
  'Rodotrem': ['Volvo FH 540 Rodotrem', 'Scania R540 Rodotrem', 'MAN TGX 28.440'],
};

const MOTORISTAS = [
  'Carlos Eduardo Silva', 'Roberto Almeida', 'João Pedro Santos', 'Marcos Oliveira',
  'Fernando Souza', 'Lucas Pereira', 'Ricardo Mendes', 'Gabriel Rocha',
  'Bruno Carvalho', 'Diego Ferreira', 'André Luiz Costa', 'Thiago Martins',
  'Alexandre Ramos', 'Felipe Castro', 'Rodrigo Barbosa', 'Gustavo Lima',
  'Marcelo Duarte', 'Renato Cardoso', 'Fabio Ribeiro', 'Leandro Nascimento',
  'Daniel Gomes', 'Vitor Hugo Campos', 'Eduardo Nogueira', 'Paolo Rossi'
];

const PERIFERICOS_NOMES: NomePeriferico[] = [
  'Sirene',
  'Trava do Baú',
  'Sensor de Porta',
  'Desengate de Carreta',
  'Bloqueio',
  'Iluminação'
];

const USUARIOS = ['operador.sp', 'analista.cur', 'inspector.bh', 'supervisor.geral'];

// Helper pseudo-random determinístico para reprodutibilidade
function pseudoRandom(seed: number) {
  const x = Math.sin(seed++) * 10000;
  return x - Math.floor(x);
}

export function generateMockChecklists(count: number = 500): Checklist[] {
  const list: Checklist[] = [];
  const now = new Date('2026-08-04T12:00:00');

  for (let i = 0; i < count; i++) {
    const seed = i * 17 + 3;
    const catIndex = Math.floor(pseudoRandom(seed) * CATEGORIAS.length);
    const categoria = CATEGORIAS[catIndex];

    const veiculosCat = VEICULOS[categoria];
    const veiculo = veiculosCat[Math.floor(pseudoRandom(seed + 1) * veiculosCat.length)];

    const filial = FILIAIS[Math.floor(pseudoRandom(seed + 2) * FILIAIS.length)];
    const motorista = MOTORISTAS[Math.floor(pseudoRandom(seed + 3) * MOTORISTAS.length)];

    // Placa
    const letras = 'ABCDEFGHJKLMNPQRSTUVWXYZ';
    const p1 = letras[Math.floor(pseudoRandom(seed + 4) * 24)] +
               letras[Math.floor(pseudoRandom(seed + 5) * 24)] +
               letras[Math.floor(pseudoRandom(seed + 6) * 24)];
    const p2 = Math.floor(pseudoRandom(seed + 7) * 10);
    const p3 = letras[Math.floor(pseudoRandom(seed + 8) * 24)];
    const p4 = Math.floor(pseudoRandom(seed + 9) * 90 + 10);
    const placa = `${p1}-${p2}${p3}${p4}`;

    // Status distribuição: Aprovado ~60%, Reprovado ~12%, Pendente ~13%, Forçado ~8%, Sem análise ~7%
    const rStatus = pseudoRandom(seed + 10);
    let status: StatusChecklist = 'Aprovado';
    if (rStatus > 0.93) status = 'Sem análise';
    else if (rStatus > 0.85) status = 'Forçado';
    else if (rStatus > 0.72) status = 'Pendente';
    else if (rStatus > 0.60) status = 'Reprovado';

    // Tempo de checklist: HH:mm:ss (geralmente entre 5 e 45 min)
    const totalSegundos = Math.floor(pseudoRandom(seed + 11) * 2400 + 300); // 300 a 2700s
    const mm = String(Math.floor(totalSegundos / 60)).padStart(2, '0');
    const ss = String(totalSegundos % 60).padStart(2, '0');
    const tempoChecklist = `00:${mm}:${ss}`;

    // Periféricos
    const perifericos: PerifericoStatus[] = PERIFERICOS_NOMES.map((nome, pIdx) => {
      // Se status do checklist for reprovado, maior chance de periférico reprovado
      const pRand = pseudoRandom(seed + 20 + pIdx);
      let pStatus: 'Aprovado' | 'Reprovado' = 'Aprovado';
      if (status === 'Reprovado' && pRand < 0.65) {
        pStatus = 'Reprovado';
      } else if (pRand < 0.08) {
        pStatus = 'Reprovado';
      }
      return { nome, status: pStatus };
    });

    // Data nos últimos 365 dias
    const daysAgo = Math.floor(pseudoRandom(seed + 30) * 365);
    const dateObj = new Date(now.getTime() - daysAgo * 24 * 60 * 60 * 1000);
    const dataStr = dateObj.toISOString().split('T')[0];

    const h = String(Math.floor(pseudoRandom(seed + 31) * 14 + 6)).padStart(2, '0');
    const m = String(Math.floor(pseudoRandom(seed + 32) * 60)).padStart(2, '0');
    const s = String(Math.floor(pseudoRandom(seed + 33) * 60)).padStart(2, '0');
    const horaStr = `${h}:${m}:${s}`;

    list.push({
      id: `CHK-${String(i + 1).padStart(4, '0')}`,
      placa,
      veiculo,
      categoria,
      empresa: 'TransLog Logística',
      filial,
      motorista,
      status,
      tempoChecklist,
      perifericos,
      data: dataStr,
      hora: horaStr,
      usuario: USUARIOS[Math.floor(pseudoRandom(seed + 34) * USUARIOS.length)]
    });
  }

  // Ordenar por data mais recente
  return list.sort((a, b) => (a.data < b.data ? 1 : -1));
}

export const mockChecklists = generateMockChecklists(500);
