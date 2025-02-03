export const extractToken = (
  authorizationHeader: string
): string | undefined => {
  const [, token] = authorizationHeader.split(' ');
  return token;
};
