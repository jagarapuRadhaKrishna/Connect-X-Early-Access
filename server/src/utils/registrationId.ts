export const generateRegistrationId = async (count: number): Promise<string> => {
  const year = new Date().getFullYear();
  const paddedCount = String(count).padStart(6, '0');
  return `CTX-${year}-${paddedCount}`;
};
