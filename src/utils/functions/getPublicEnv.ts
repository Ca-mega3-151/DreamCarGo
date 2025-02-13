export const getPublicEnv = (key: keyof Env): string | undefined => {
  const value = import.meta.env[key];
  if (!value) {
    console.error(`getPublicEnv:: ${key} is not exist`);
  }
  return value;
};
