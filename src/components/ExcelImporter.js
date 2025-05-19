// aa
import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import { processElectionData } from '../utils/processElectionData';
import '../styles/ExcelImporter.css';

const ExcelImporter = ({ onDataImport }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setIsLoading(true);
    setError(null);

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        
        // Assumindo que os dados estão na primeira planilha
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

        // Processar os dados usando nossa nova função
        const processedData = processElectionData(jsonData);
        
        // Atualizar o estado da aplicação com os dados processados
        onDataImport(processedData);
        
        setIsLoading(false);
      } catch (err) {
        setError('Erro ao processar o arquivo: ' + err.message);
        setIsLoading(false);
      }
    };

    reader.onerror = () => {
      setError('Erro ao ler o arquivo');
      setIsLoading(false);
    };

    reader.readAsArrayBuffer(file);
  };

  return (
    <div className="excel-importer">
      <h3>Importar Dados das Eleições</h3>
      <div className="upload-container">
        <input
          type="file"
          accept=".xlsx, .xls, .csv"
          onChange={handleFileUpload}
          disabled={isLoading}
        />
        {isLoading && <p>Processando arquivo...</p>}
        {error && <p className="error">{error}</p>}
      </div>
    </div>
  );
};

export default ExcelImporter;