export const scrollToSection = (hash: string) => {
  const id = hash.replace('#', '');
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};