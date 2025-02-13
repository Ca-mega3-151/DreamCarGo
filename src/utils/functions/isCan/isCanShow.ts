interface IsCanShow {
  fields?: string[];
}

export const isCanShow = (_: IsCanShow) => {
  const accessable = true;

  return accessable;
};
