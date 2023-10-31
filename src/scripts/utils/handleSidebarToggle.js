export const handleSidebarToggle = () => {
  const sidebar = document.getElementById('sidebar');
  const openBtn = document.getElementById('open-btn');
  const closeBtn = document.getElementById('close-btn');

  const toggleSidebar = () => {
    sidebar.classList.toggle('flex');
    openBtn.classList.toggle('hidden');
    closeBtn.classList.toggle('hidden');
  };

  openBtn.addEventListener('click', toggleSidebar);
  closeBtn.addEventListener('click', toggleSidebar);

  document.addEventListener('click', (event) => {
    if (event.target === sidebar) {
      toggleSidebar();
    }
  });
};
