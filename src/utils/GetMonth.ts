export default function GetMonth(num: string): string {
  switch (num) {
    case '01':
      return 'januari';
    case '02':
      return 'februari';
    case '03':
      return 'mars';
    case '04':
      return 'april';
    case '05':
      return 'maj';
    case '06':
      return 'juni';
    case '07':
      return 'juli';
    case '08':
      return 'augusti';
    case '09':
      return 'september';
    case '10':
      return 'oktober';
    case '11':
      return 'november';
    case '12':
      return 'december';
    default:
      return '';
  }
}
