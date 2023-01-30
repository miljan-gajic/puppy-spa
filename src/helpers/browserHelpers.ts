export const goToTopOfThePage = () => {
  if (window) {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
};
