import React from 'react';
import '../styles/CircleResults.css';

const CircleResults = ({ data, selectedCircle, onEditParty }) => {
  if (!data || selectedCircle === null) {
    return null;
  }

  const circle = data.circles[selectedCircle];
  const partyResults = data.partyResults[selectedCircle];
  const nationalResults = data.nationalPartyResults;

  if (!circle || !partyResults) {
    return null;
  }

  return ( 
    <div className="circle-results">
      <h2>Resultados - {circle.name}</h2>
      <div className="circle-stats">
        <div className="stat-group">
          <h3>Inscritos</h3>
          <p className="value">{circle.inscritos.toLocaleString()}</p>
        </div>
        <div className="stat-group">
          <h3>Votantes</h3>
          <p className="value">{circle.votantes.toLocaleString()}</p>
          <p className="percentage">
            {((circle.votantes / circle.inscritos) * 100).toFixed(2)}%
          </p>
        </div>
        <div className="stat-group">
          <h3>Abstenção</h3>
          <p className="value">{circle.abstencao.toLocaleString()}</p>
          <p className="percentage">
            {((circle.abstencao / circle.inscritos) * 100).toFixed(2)}%
          </p>
        </div>
      </div>

      <div className="party-results">
        <h3>Resultados por Partido</h3>
        <div className="party-list">
          {partyResults.map((result, index) => (
            <div 
              key={index} 
              className={`party-item ${result.mandates > 0 ? 'has-mandates' : 'no-mandates'}`}
            >
              <div className="party-info">
                <div className="party-header">
                  <div className="party-position">{index + 1}</div>
                  <h4>{result.party}</h4>
                </div>
                <div className="party-stats">
                  <p className="votes">{result.votes.toLocaleString()} votos</p>
                  <p className="mandates">
                    {result.mandates > 0 ? (
                      <span className="mandate-badge">{result.mandates} mandato{result.mandates !== 1 ? 's' : ''}</span>
                    ) : (
                      <span className="no-mandate">Sem mandatos</span>
                    )}
                  </p>
                  <button 
                    className="edit-button"
                    onClick={() => onEditParty(result)}
                  >
                    Editar
                  </button>
                </div>
              </div>
              <div className="party-percentage">
                <div className="percentage-bar">
                  <div 
                    className="percentage-fill" 
                    style={{ 
                      width: `${result.percentage}%`,
                      backgroundColor: result.color
                    }}
                  />
                </div>
                <p className="percentage">{result.percentage.toFixed(2)}%</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CircleResults;