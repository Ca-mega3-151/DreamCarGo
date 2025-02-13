/**
 * Retrieves the domain URL based on the incoming request.
 * @param {Request} request - The incoming request object.
 * @returns {string} The domain URL.
 * @throws {Error} Throws an error if the domain URL cannot be determined.
 */
export const getDomainUrl = (request: Request): string => {
  const host = request.headers.get('X-Forwarded-Host') ?? request.headers.get('host');
  if (!host) {
    throw new Error('Could not determine domain URL.');
  }
  const protocol = host.includes('localhost') ? 'http' : 'https';
  return `${protocol}://${host}`;
};
