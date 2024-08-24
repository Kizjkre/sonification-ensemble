const a = document.createElement('a');

export default (name, data, type) => {
  const blob = new Blob([data], { type });
  const url = URL.createObjectURL(blob);
  a.href = url;
  a.download = name;
  a.click();
  URL.revokeObjectURL(url);
};
