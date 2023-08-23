
const months: string[] = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];
  
  export function formatDate(dateString: string): string {
    const [year, month, day] = dateString.split('-');
    const monthText: string = months[parseInt(month) - 1];
    return `${day} de ${monthText} de ${year}`;
  }
  