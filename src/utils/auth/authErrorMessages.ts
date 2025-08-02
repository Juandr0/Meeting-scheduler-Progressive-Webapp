export function getAuthErrorMessage(errorCode: string): string {
  switch (errorCode) {
    case 'auth/invalid-email':
      return 'Ogiltig e-postadress.';
    case 'auth/user-not-found':
    case 'auth/wrong-password':
    case 'auth/invalid-credential':
      return 'Fel användarnamn eller lösenord.';
    case 'auth/too-many-requests':
      return 'För många försök. Försök igen senare.';
    default:
      return 'Ett oväntat fel inträffade. Försök igen.';
  }
}
