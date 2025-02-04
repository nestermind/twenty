export const isPropertyOrPublication = (objectNameSingular: string) => {
  return (
    objectNameSingular === 'property' || objectNameSingular === 'publication'
  );
};
