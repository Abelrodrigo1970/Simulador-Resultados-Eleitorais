import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export const generateElectionResultsPDF = (data) => {
  // Criar novo documento PDF
  const doc = new jsPDF();
  
  // Configurar fonte e tamanho
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  
  // Título
  doc.text('Resultados das Eleições Legislativas 2024', 105, 20, { align: 'center' });
  
  // Estatísticas Gerais
  doc.setFontSize(11);
  doc.text('Estatísticas Gerais', 105, 30, { align: 'center' });
  
  // Tabela de estatísticas gerais
  autoTable(doc, {
    startY: 35,
    head: [['', 'Total', 'Percentagem']],
    body: [
      ['Inscritos', data.totalInscritos.toLocaleString(), '100%'],
      ['Votantes', data.totalVotantes.toLocaleString(), `${((data.totalVotantes / data.totalInscritos) * 100).toFixed(2)}%`],
      ['Abstenção', data.totalAbstencao.toLocaleString(), `${((data.totalAbstencao / data.totalInscritos) * 100).toFixed(2)}%`]
    ],
    theme: 'grid',
    headStyles: { fillColor: [41, 128, 185], textColor: 255, fontSize: 9 },
    styles: { fontSize: 8, cellPadding: 3 }
  });

  // Resultados Nacionais
  doc.setFontSize(11);
  doc.text('Resultados Nacionais por Partido', 105, doc.lastAutoTable.finalY + 10, { align: 'center' });
  
  // Tabela de resultados nacionais
  autoTable(doc, {
    startY: doc.lastAutoTable.finalY + 15,
    head: [['Partido', 'Votos', 'Percentagem', 'Mandatos']],
    body: data.nationalPartyResults.map(party => [
      party.name,
      party.votes.toLocaleString(),
      `${party.percentage.toFixed(2)}%`,
      party.mandates
    ]),
    theme: 'grid',
    headStyles: { fillColor: [41, 128, 185], textColor: 255, fontSize: 9 },
    styles: { fontSize: 8, cellPadding: 3 }
  });

  // Resultados por Círculo Eleitoral
  data.circles.forEach((circle, index) => {
    // Adicionar nova página se necessário
    if (doc.lastAutoTable.finalY > 250) {
      doc.addPage();
    }

    // Título do círculo
    doc.setFontSize(11);
    doc.text(`Círculo Eleitoral: ${circle.name}`, 105, doc.lastAutoTable.finalY + 10, { align: 'center' });

    // Estatísticas do círculo
    autoTable(doc, {
      startY: doc.lastAutoTable.finalY + 15,
      head: [['', 'Total', 'Percentagem']],
      body: [
        ['Inscritos', circle.inscritos.toLocaleString(), '100%'],
        ['Votantes', circle.votantes.toLocaleString(), `${((circle.votantes / circle.inscritos) * 100).toFixed(2)}%`],
        ['Abstenção', circle.abstencao.toLocaleString(), `${((circle.abstencao / circle.inscritos) * 100).toFixed(2)}%`]
      ],
      theme: 'grid',
      headStyles: { fillColor: [41, 128, 185], textColor: 255, fontSize: 9 },
      styles: { fontSize: 8, cellPadding: 3 }
    });

    // Resultados dos partidos no círculo
    autoTable(doc, {
      startY: doc.lastAutoTable.finalY + 5,
      head: [['Partido', 'Votos', 'Percentagem', 'Mandatos']],
      body: data.partyResults[index].map(party => [
        party.party,
        party.votes.toLocaleString(),
        `${party.percentage.toFixed(2)}%`,
        party.mandates
      ]),
      theme: 'grid',
      headStyles: { fillColor: [41, 128, 185], textColor: 255, fontSize: 9 },
      styles: { fontSize: 8, cellPadding: 3 }
    });
  });

  // Adicionar rodapé com data e hora
  const now = new Date();
  doc.setFontSize(7);
  doc.text(
    `Gerado em ${now.toLocaleDateString()} às ${now.toLocaleTimeString()}`,
    105,
    doc.internal.pageSize.height - 5,
    { align: 'center' }
  );

  // Salvar o PDF
  doc.save('resultados-eleicoes-2024.pdf');
};