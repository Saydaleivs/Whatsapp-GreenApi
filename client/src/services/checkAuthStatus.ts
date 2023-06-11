export default function checkAuthStatus(): boolean {
  const id = localStorage.getItem('idInstance');
  const token = localStorage.getItem('ApiTokenInstance');

  if (id && token) return true;
  return false;
}
