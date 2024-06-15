
// user later - not implemented refresh token yet
export function validateToken(token: string): boolean {
  try {
    // verify(token, process.env.API_SECRET || '');
    return true;
  } catch (error) {
    return false;
  }
}