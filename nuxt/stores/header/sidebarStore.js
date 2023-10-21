export const useSidebarStore = defineStore("sidebar", () => {
  const isOpen = ref(false);
  const toggleSidebar = () => {
    isOpen.value = !isOpen.value;
    console.log("clicked toggle");
  };

  function handleClickOutside(event) {
    event.stopPropagation();
    isOpen.value = false;
  }

  return { isOpen, toggleSidebar, handleClickOutside };
});
