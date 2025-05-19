import React, { useState, useEffect } from 'react';
import '../styles/ElectionSimulator.css';
import Header from './Header';
import CircleSelector from './CircleSelector';
import CircleResults from './CircleResults';
import DeputiesChart from './DeputiesChart';
import ExcelImporter from './ExcelImporter';
import { processElectionData, modifyCircleResults } from '../utils/processElectionData';
import { generateElectionResultsPDF } from '../utils/generatePDF';

const ElectionSimulator = () => {
  const [electionData, setElectionData] = useState(null);
  const [error, setError] = useState(null);
  const [selectedCircle, setSelectedCircle] = useState(null);
  const [editingParty, setEditingParty] = useState(null);
  const [newVotes, setNewVotes] = useState('');

  useEffect(() => {
    fetch('/election_results_2024..csv')
      .then(response => {
        if (!response.ok) {
          throw new Error('Erro ao carregar o ficheiro CSV');
        }
        return response.text();
      })
      .then(csvText => {
        const rows = csvText.split('\n')
          .map(row => row.split(',')
            .map(cell => cell.trim().replace(/^"|"$/g, ''))
          )
          .filter(row => row.length > 0 && row.some(cell => cell !== ''));

        const processedData = processElectionData(rows);
        processedData.nationalPartyResults.sort((a, b) => b.votes - a.votes);
        
        setElectionData(processedData);
        setError(null);
      })
      .catch(error => {
        console.error('Erro ao carregar os dados:', error);
        setError('Erro ao carregar os dados. Por favor, tente novamente.');
      });
  }, []);

  const handleCircleSelect = (index) => {
    setSelectedCircle(index);
  };

  const handleDataImport = (importedData) => {
    setElectionData(importedData);
  };

  const handleEditParty = (party) => {
    setEditingParty(party);
    setNewVotes(party.votes.toString());
  };

  const handleSavePartyVotes = () => {
    if (!editingParty || !selectedCircle || !newVotes) return;

    const circleName = electionData.circles[selectedCircle].name;
    const updatedData = modifyCircleResults(
      electionData,
      circleName,
      editingParty.party,
      parseInt(newVotes)
    );

    setElectionData(updatedData);
    setEditingParty(null);
    setNewVotes('');
  };

  const handleCancelEdit = () => {
    setEditingParty(null);
    setNewVotes('');
  };

  const handleGeneratePDF = () => {
    if (electionData) {
      generateElectionResultsPDF(electionData);
    }
  };

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (!electionData) {
    return <div className="loading">Carregando dados...</div>;
  }

  return (
    <main className="election-simulator">
      <Header />
      <div className="action-bar">
        <ExcelImporter onDataImport={handleDataImport} />
        <button 
          className="generate-pdf-button"
          onClick={handleGeneratePDF}
        >
          Gerar PDF
        </button>
      </div>

      <div className="deputies-chart-container">
     
        <DeputiesChart data={electionData} />
      </div>

      <div className="party-results-container">
        <h2>Resultados por Partido</h2>
        <div className="party-list">
          {electionData.nationalPartyResults.map((party, index) => (
            <div 
              key={index} 
              className={`party-item ${party.mandates > 0 ? 'has-mandates' : 'no-mandates'}`}
            >
              <div className="party-info">
                <div className="party-header">
                  <div className="party-position">{index + 1}</div>
                  <h4>{party.name}</h4>
                </div>
                <div className="party-stats">
                  <p className="votes">{party.votes.toLocaleString()} votos</p>
                  <p className="mandates">{party.mandates} mandatos</p>
                </div>
              </div>
              <div className="party-percentage">
                <div className="percentage-bar">
                  <div 
                    className="percentage-fill" 
                    style={{ 
                      width: `${party.percentage}%`,
                      backgroundColor: party.color
                    }}
                  />
                </div>
                <p className="percentage">{party.percentage.toFixed(2)}%</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <section className="circles-section">
        <h2>Círculos Eleitorais</h2>
        <CircleSelector 
          circles={electionData.circles}
          selected={selectedCircle}
          onSelect={handleCircleSelect}
        />
        {selectedCircle !== null && (
          <>
            <CircleResults 
              data={electionData}
              selectedCircle={selectedCircle}
              onEditParty={handleEditParty}
            />
            {editingParty && (
              <div className="edit-party-modal">
                <div className="edit-party-content">
                  <h3>Editar Votos - {editingParty.party}</h3>
                  <div className="edit-form">
                    <label>
                      Novos Votos:
                      <input
                        type="number"
                        value={newVotes}
                        onChange={(e) => setNewVotes(e.target.value)}
                        min="0"
                      />
                    </label>
                    <div className="edit-buttons">
                      <button 
                        className="save-button"
                        onClick={handleSavePartyVotes}
                      >
                        Salvar
                      </button>
                      <button 
                        className="cancel-button"
                        onClick={handleCancelEdit}
                      >
                        Cancelar
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </section>
    </main>
  );
};

export default ElectionSimulator;