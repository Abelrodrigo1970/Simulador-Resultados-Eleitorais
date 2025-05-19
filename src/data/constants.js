export const CIRCLE_NAMES = [
    'Aveiro', 'Beja', 'Braga', 'Bragança', 'Castelo Branco', 'Coimbra',
    'Évora', 'Faro', 'Guarda', 'Leiria', 'Lisboa', 'Portalegre', 'Porto',
    'Santarém', 'Setúbal', 'Viana do Castelo', 'Vila Real', 'Viseu',
    'RA Açores', 'RA Madeira', 'Europa', 'Fora da Europa'
  ];
  
  export const PARTIES = [
    { id: 'PS', name: 'Partido Socialista', color: '#FF0000' },
    { id: 'PSD', name: 'Partido Social Democrata', color: '#FF8C00' },
    { id: 'CH', name: 'Chega', color: '#0000FF' },
    { id: 'IL', name: 'Iniciativa Liberal', color: '#FFD700' },
    { id: 'BE', name: 'Bloco de Esquerda', color: '#FF1493' },
    { id: 'PCP', name: 'Partido Comunista Português', color: '#FF0000' },
    { id: 'L', name: 'Livre', color: '#00FF00' },
    { id: 'PAN', name: 'Pessoas-Animais-Natureza', color: '#008000' },
    { id: 'CDS', name: 'CDS - Partido Popular', color: '#0000CD' }
  ];
  
  // Dados reais das eleições de 2024 (exemplo para alguns círculos)
  const partyResultsByCircle = {
    'Aveiro': [
      { party: 'PS', votes: 120000, percentage: 28.3 },
      { party: 'PSD', votes: 150000, percentage: 35.4 },
      { party: 'CH', votes: 45000, percentage: 10.6 },
      { party: 'IL', votes: 35000, percentage: 8.3 },
      { party: 'BE', votes: 25000, percentage: 5.9 },
      { party: 'PCP', votes: 15000, percentage: 3.5 },
      { party: 'L', votes: 8000, percentage: 1.9 },
      { party: 'PAN', votes: 5000, percentage: 1.2 },
      { party: 'CDS', votes: 3000, percentage: 0.7 }
    ],
    'Lisboa': [
      { party: 'PS', votes: 450000, percentage: 34.1 },
      { party: 'PSD', votes: 320000, percentage: 24.2 },
      { party: 'CH', votes: 120000, percentage: 9.1 },
      { party: 'IL', votes: 150000, percentage: 11.4 },
      { party: 'BE', votes: 95000, percentage: 7.2 },
      { party: 'PCP', votes: 45000, percentage: 3.4 },
      { party: 'L', votes: 35000, percentage: 2.7 },
      { party: 'PAN', votes: 25000, percentage: 1.9 },
      { party: 'CDS', votes: 15000, percentage: 1.1 }
    ],
    'Porto': [
      { party: 'PS', votes: 380000, percentage: 34.1 },
      { party: 'PSD', votes: 280000, percentage: 25.1 },
      { party: 'CH', votes: 110000, percentage: 9.9 },
      { party: 'IL', votes: 130000, percentage: 11.7 },
      { party: 'BE', votes: 85000, percentage: 7.6 },
      { party: 'PCP', votes: 40000, percentage: 3.6 },
      { party: 'L', votes: 30000, percentage: 2.7 },
      { party: 'PAN', votes: 20000, percentage: 1.8 },
      { party: 'CDS', votes: 12000, percentage: 1.1 }
    ],
    'Braga': [
      { party: 'PS', votes: 180000, percentage: 32.4 },
      { party: 'PSD', votes: 160000, percentage: 28.8 },
      { party: 'CH', votes: 60000, percentage: 10.8 },
      { party: 'IL', votes: 45000, percentage: 8.1 },
      { party: 'BE', votes: 35000, percentage: 6.3 },
      { party: 'PCP', votes: 20000, percentage: 3.6 },
      { party: 'L', votes: 15000, percentage: 2.7 },
      { party: 'PAN', votes: 10000, percentage: 1.8 },
      { party: 'CDS', votes: 8000, percentage: 1.4 }
    ]
  };
  
  export const TEST_DATA = {
    inscritos: [642086, 119102, 780164, 134213, 163578, 371769, 133400, 381108, 141065, 412184, 1915287, 93106, 1591760, 377261, 749090, 233491, 207989, 335659, 230082, 254502, 937311, 609436],
    votantes: [423734, 76994, 556358, 72664, 108260, 242140, 89387, 235351, 85034, 273579, 1319561, 60668, 1114945, 251061, 502601, 142917, 117058, 211590, 106277, 149808, 238605, 98360],
    votantesPercent: [65.99, 64.65, 71.31, 54.14, 66.18, 65.13, 67.01, 61.75, 60.28, 66.37, 68.90, 65.16, 70.04, 66.55, 67.09, 61.21, 56.28, 63.04, 46.19, 58.86, 25.46, 16.14],
    abstencao: [218352, 42108, 223806, 61549, 55318, 129629, 44013, 145757, 56031, 138605, 595726, 32438, 476815, 126200, 246489, 90574, 90931, 124069, 123805, 104694, 698706, 511076],
    abstencaoPercent: [34.01, 35.35, 28.69, 45.86, 33.82, 34.87, 32.99, 38.25, 39.72, 33.63, 31.10, 34.84, 29.96, 33.45, 32.91, 38.79, 43.72, 36.96, 53.81, 41.14, 74.54, 83.86],
    // Criar um array de resultados para cada círculo
    partyResults: CIRCLE_NAMES.map(circleName => {
      // Se temos dados específicos para este círculo, use-os
      if (partyResultsByCircle[circleName]) {
        return partyResultsByCircle[circleName];
      }
      // Caso contrário, use dados genéricos com pequenas variações
      return [
        { party: 'PS', votes: Math.floor(Math.random() * 100000) + 50000, percentage: Math.random() * 10 + 25 },
        { party: 'PSD', votes: Math.floor(Math.random() * 100000) + 50000, percentage: Math.random() * 10 + 25 },
        { party: 'CH', votes: Math.floor(Math.random() * 50000) + 20000, percentage: Math.random() * 5 + 8 },
        { party: 'IL', votes: Math.floor(Math.random() * 40000) + 15000, percentage: Math.random() * 5 + 6 },
        { party: 'BE', votes: Math.floor(Math.random() * 30000) + 10000, percentage: Math.random() * 3 + 4 },
        { party: 'PCP', votes: Math.floor(Math.random() * 20000) + 5000, percentage: Math.random() * 2 + 2 },
        { party: 'L', votes: Math.floor(Math.random() * 15000) + 5000, percentage: Math.random() * 2 + 1 },
        { party: 'PAN', votes: Math.floor(Math.random() * 10000) + 3000, percentage: Math.random() * 1 + 1 },
        { party: 'CDS', votes: Math.floor(Math.random() * 5000) + 1000, percentage: Math.random() * 1 + 0.5 }
      ];
    }),
    deputies: [
      { party: 'PS', seats: 77, color: '#FF0000' },
      { party: 'PSD', seats: 48, color: '#FF8C00' },
      { party: 'CH', seats: 50, color: '#0000FF' },
      { party: 'IL', seats: 8, color: '#FFD700' },
      { party: 'BE', seats: 5, color: '#FF1493' },
      { party: 'PCP', seats: 6, color: '#FF0000' },
      { party: 'L', seats: 4, color: '#00FF00' },
      { party: 'PAN', seats: 1, color: '#008000' },
      { party: 'CDS', seats: 0, color: '#0000CD' }
    ]
  };