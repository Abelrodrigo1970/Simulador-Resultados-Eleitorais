import React from 'react';
import '../styles/NationalResults.css';
import DeputiesChart from './DeputiesChart';

const NationalResults = ({ data }) => {
  if (!data) return null;

  return (
    <div className="national-results">
     
      <div className="results-container"> 
        <h2>Resultados Nacionaiiiis</h2>
        <div className="summary-stats">
          <div className="stat-card">
            <h3>Inscritos</h3>
            <p className="value">{data.totalInscritos.toLocaleString()}</p>
          </div>
          <div className="stat-card">
            <h3>Votantes</h3>
            <p className="value">{data.totalVotantes.toLocaleString()}</p>
            <p className="percentage">
              {((data.totalVotantes / data.totalInscritos) * 100).toFixed(2)}%
            </p>
          </div>
          <div className="stat-card">
            <h3>Abstenção</h3>
            <p className="value">{data.totalAbstencao.toLocaleString()}</p>
            <p className="percentage">
              {((data.totalAbstencao / data.totalInscritos) * 100).toFixed(2)}%
            </p>
          </div>
        </div>
        <DeputiesChart data={data} />
      </div>
    </div>
  );
};

export default NationalResults;
