export const calculateResults = (parties, totalSeats = 230) => {
  if (!parties.length) return [];

  // Calculate total votes
  const totalVotes = parties.reduce((sum, party) => sum + party.votes, 0);

  // Initialize results array
  const results = parties.map(party => ({
    partyName: party.name,
    votes: party.votes,
    percentage: (party.votes / totalVotes) * 100,
    seats: 0,
    quotients: []
  }));

  // Calculate quotients for each party
  for (let i = 1; i <= totalSeats; i++) {
    results.forEach(result => {
      result.quotients.push(result.votes / i);
    });
  }

  // Sort all quotients in descending order
  const allQuotients = results.flatMap(result => 
    result.quotients.map((quotient, index) => ({
      partyName: result.partyName,
      quotient,
      seatNumber: index + 1
    }))
  ).sort((a, b) => b.quotient - a.quotient);

  // Assign seats based on highest quotients
  const seatAssignments = allQuotients.slice(0, totalSeats);
  
  // Count seats for each party
  seatAssignments.forEach(assignment => {
    const partyResult = results.find(r => r.partyName === assignment.partyName);
    if (partyResult) {
      partyResult.seats++;
    }
  });

  // Remove quotients array from results
  return results.map(({ quotients, ...rest }) => rest);
};

export const calculateSeats = (votes, totalSeats) => {
  const quotients = [];
  const seats = new Array(votes.length).fill(0);

  // Calcular quocientes para cada partido
  for (let i = 0; i < votes.length; i++) {
    for (let j = 1; j <= totalSeats; j++) {
      quotients.push({
        partyIndex: i,
        quotient: votes[i] / j
      });
    }
  }

  // Ordenar quocientes do maior para o menor
  quotients.sort((a, b) => b.quotient - a.quotient);

  // Atribuir mandatos
  for (let i = 0; i < totalSeats; i++) {
    if (i < quotients.length) {
      seats[quotients[i].partyIndex]++;
    }
  }

  return seats;
};

export const calculatePercentages = (votes, totalVotes) => {
  return votes.map(vote => (vote / totalVotes) * 100);
}; 