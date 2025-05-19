// Função para processar os dados do CSV das eleições
export const processElectionData = (csvData) => {
  // Extrair cabeçalhos e dados
  const headers = csvData[1];
  const data = csvData.slice(2);

  // Mapear nomes dos círculos
  const circleNames = headers.slice(2, -1); // Remove as primeiras duas colunas e a última

  // Inicializar objeto de resultados
  const results = {
    circles: [],
    totalInscritos: 0,
    totalVotantes: 0,
    totalAbstencao: 0,
    partyResults: [],
    nationalPartyResults: []
  };

  // Processar dados por círculo
  circleNames.forEach((circleName, index) => {
    const circleData = {
      name: circleName,
      inscritos: parseInt(data[0][index + 2]) || 0,
      votantes: parseInt(data[1][index + 2]) || 0,
      votantesPercent: parseFloat(data[2][index + 2]) || 0,
      abstencao: parseInt(data[3][index + 2]) || 0,
      abstencaoPercent: parseFloat(data[4][index + 2]) || 0
    };

    results.circles.push(circleData);
  });

  // Processar resultados dos partidos
  const partyStartIndex = 7; // Índice onde começam os dados dos partidos
  const partyData = data.slice(partyStartIndex);

  // Mapear cores dos partidos
  const partyColors = {
    'PS': '#FF0000',
    'PPD/PSD.CDS-PP.PPM': '#FF8C00',
    'CH': '#0000FF',
    'IL': '#FFD700',
    'B.E.': '#FF1493',
    'PCP-PEV': '#FF0000',
    'L': '#00FF00',
    'PAN': '#008000',
    'PPD/PSD.CDS-PP': '#0000CD'
  };

  // Processar resultados nacionais dos partidos
  const nationalResults = {};
  
  for (let i = 0; i < partyData.length; i += 3) {
    if (!partyData[i] || !partyData[i][0]) continue;

    const partyName = partyData[i][0];
    const votes = parseInt(partyData[i][partyData[i].length - 1]) || 0;
    const percentage = parseFloat(partyData[i + 1][partyData[i + 1].length - 1]) || 0;
    const mandates = parseInt(partyData[i + 2][partyData[i + 2].length - 1]) || 0;

    if (votes > 0) {
      nationalResults[partyName] = {
        name: partyName,
        votes: votes,
        percentage: percentage,
        mandates: mandates,
        color: partyColors[partyName] || '#808080'
      };
    }
  }

  results.nationalPartyResults = Object.values(nationalResults);

  // Calcular totais
  results.totalInscritos = results.circles.reduce((sum, circle) => sum + circle.inscritos, 0);
  results.totalVotantes = results.circles.reduce((sum, circle) => sum + circle.votantes, 0);
  results.totalAbstencao = results.totalInscritos - results.totalVotantes;

  // Processar resultados dos partidos por círculo
  results.partyResults = circleNames.map(() => []);

  // Processar resultados dos partidos por círculo
  for (let i = 0; i < partyData.length; i += 3) {
    if (!partyData[i] || !partyData[i][0]) continue;

    const partyName = partyData[i][0];
    if (!partyName || partyName === '') continue;

    // Para cada círculo
    circleNames.forEach((circleName, circleIndex) => {
      const votes = parseInt(partyData[i][circleIndex + 2]) || 0;
      const percentage = parseFloat(partyData[i + 1]?.[circleIndex + 2]) || 0;
      const mandates = parseInt(partyData[i + 2]?.[circleIndex + 2]) || 0;

      if (votes > 0) {
        results.partyResults[circleIndex].push({
          party: partyName,
          votes: votes,
          percentage: percentage,
          mandates: mandates,
          color: partyColors[partyName] || '#808080'
        });
      }
    });
  }

  // Ordenar resultados por círculo (do maior para o menor número de votos)
  results.partyResults = results.partyResults.map(circleResults => 
    circleResults.sort((a, b) => b.votes - a.votes)
  );

  return results;
};

// Função auxiliar para calcular mandatos por círculo usando o método de Hondt
const calculateCircleMandates = (partyResults, totalMandates) => {
  // Filtrar partidos com votos
  const validParties = partyResults.filter(party => party.votes > 0);
  
  // Criar array de quocientes para cada partido
  const quotients = [];
  const seats = new Array(validParties.length).fill(0);

  // Calcular quocientes para cada partido (método de Hondt)
  validParties.forEach((party, partyIndex) => {
    for (let divisor = 1; divisor <= totalMandates; divisor++) {
      quotients.push({
        partyIndex,
        quotient: party.votes / divisor
      });
    }
  });

  // Ordenar quocientes do maior para o menor
  quotients.sort((a, b) => b.quotient - a.quotient);

  // Atribuir mandatos aos maiores quocientes
  for (let i = 0; i < totalMandates; i++) {
    if (i < quotients.length) {
      seats[quotients[i].partyIndex]++;
    }
  }

  // Mapear os mandatos de volta para os partidos originais
  const finalSeats = new Array(partyResults.length).fill(0);
  validParties.forEach((party, index) => {
    const originalIndex = partyResults.findIndex(p => p.party === party.party);
    if (originalIndex !== -1) {
      finalSeats[originalIndex] = seats[index];
    }
  });

  return finalSeats;
};

// Função para modificar os resultados de um partido em um círculo específico
export const modifyCircleResults = (data, circleName, partyName, newVotes) => {
  // Encontrar o índice do círculo
  const circleIndex = data.circles.findIndex(circle => circle.name === circleName);
  if (circleIndex === -1) return data;

  // Encontrar o partido no círculo
  const partyResults = data.partyResults[circleIndex];
  const partyIndex = partyResults.findIndex(party => party.party === partyName);
  if (partyIndex === -1) return data;

  // Calcular a diferença de votos
  const oldVotes = partyResults[partyIndex].votes;
  const voteDifference = newVotes - oldVotes;

  // Atualizar os votos do partido no círculo
  partyResults[partyIndex].votes = newVotes;

  // Recalcular o total de votos no círculo
  const totalVotesInCircle = partyResults.reduce((sum, party) => sum + party.votes, 0);

  // Atualizar o número de votantes e abstenção no círculo
  data.circles[circleIndex].votantes = totalVotesInCircle;
  data.circles[circleIndex].abstencao = data.circles[circleIndex].inscritos - totalVotesInCircle;

  // Recalcular as percentagens do círculo
  partyResults.forEach(party => {
    party.percentage = (party.votes / totalVotesInCircle) * 100;
  });

  // Reordenar os resultados do círculo
  partyResults.sort((a, b) => b.votes - a.votes);

  // Definir o número de mandatos para cada círculo
  const circleMandates = {
    'Aveiro': 16,
    'Beja': 3,
    'Braga': 19,
    'Bragança': 3,
    'Castelo Branco': 4,
    'Coimbra': 9,
    'Évora': 3,
    'Faro': 9,
    'Guarda': 3,
    'Leiria': 10,
    'Lisboa': 48,
    'Portalegre': 2,
    'Porto': 40,
    'Santarém': 9,
    'Setúbal': 18,
    'Viana do Castelo': 6,
    'Vila Real': 5,
    'Viseu': 8,
    'RA Açores': 5,
    'RA Madeira': 6,
    'Europa': 2,
    'Fora da Europa': 2
  };

  // Recalcular os mandatos do círculo
  const newMandates = calculateCircleMandates(partyResults, circleMandates[circleName]);
  partyResults.forEach((party, index) => {
    party.mandates = newMandates[index];
  });

  // Recalcular resultados nacionais
  const nationalResults = {};
  data.partyResults.forEach(circlePartyResults => {
    circlePartyResults.forEach(party => {
      if (!nationalResults[party.party]) {
        nationalResults[party.party] = {
          name: party.party,
          votes: 0,
          mandates: 0,
          color: party.color
        };
      }
      nationalResults[party.party].votes += party.votes;
      nationalResults[party.party].mandates += party.mandates;
    });
  });

  // Calcular percentagens nacionais
  const totalNationalVotes = Object.values(nationalResults).reduce((sum, party) => sum + party.votes, 0);
  Object.values(nationalResults).forEach(party => {
    party.percentage = (party.votes / totalNationalVotes) * 100;
  });

  // Atualizar os resultados nacionais mantendo a referência original
  data.nationalPartyResults = Object.values(nationalResults).sort((a, b) => b.votes - a.votes);

  // Recalcular totais nacionais
  data.totalVotantes = data.circles.reduce((sum, circle) => sum + circle.votantes, 0);
  data.totalAbstencao = data.totalInscritos - data.totalVotantes;

  // Atualizar percentagens do círculo
  data.circles[circleIndex].votantesPercent = (data.circles[circleIndex].votantes / data.circles[circleIndex].inscritos) * 100;
  data.circles[circleIndex].abstencaoPercent = (data.circles[circleIndex].abstencao / data.circles[circleIndex].inscritos) * 100;

  // Retornar uma cópia do objeto data para garantir que o React detecte a mudança
  return { ...data };
};