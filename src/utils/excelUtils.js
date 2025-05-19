import { CIRCLE_NAMES, TEST_DATA } from '../data/constants';

export const processExcelData = (data) => {
  // Aqui você implementará o processamento dos dados do Excel
  // Por enquanto, retornamos os dados de teste
  return {
    circles: CIRCLE_NAMES.map((name, index) => ({
      name,
      inscritos: TEST_DATA.inscritos[index],
      votantes: TEST_DATA.votantes[index],
      votantesPercent: TEST_DATA.votantesPercent[index],
      abstencao: TEST_DATA.abstencao[index],
      abstencaoPercent: TEST_DATA.abstencaoPercent[index]
    })),
    totalInscritos: TEST_DATA.inscritos.reduce((a, b) => a + b, 0),
    totalVotantes: TEST_DATA.votantes.reduce((a, b) => a + b, 0),
    totalAbstencao: TEST_DATA.abstencao.reduce((a, b) => a + b, 0)
  };
};
