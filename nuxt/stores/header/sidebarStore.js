export const useSidebarStore = defineStore("sidebar", () => {
  const isOpen = ref(false);
  const toggleSidebar = () => {
    isOpen.value = !isOpen.value;
  };

  function handleClickOutside(event) {
    event.stopPropagation();
    // Close the sidebar if the click occurs outside of it
    console.log("outside clicked");
    isOpen.value = false;
  }

  return { isOpen, toggleSidebar, handleClickOutside };
});
