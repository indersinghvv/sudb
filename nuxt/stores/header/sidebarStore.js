export const useSidebarStore = defineStore("sidebar", () => {
  const isOpen = ref(true);
  const toggleSidebar = () => {
    isOpen.value = !isOpen.value;
  };

  function handleClickOutside(event) {
    event.stopPropagation();
    isOpen.value = false;
  }

  return { isOpen, toggleSidebar, handleClickOutside };
});
