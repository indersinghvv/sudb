const { getItems, getItemById } = useDirectusItems();

export const useCustomerStore = defineStore("customer", () => {
  const customerList = ref([]);
  const companyRatingList = ref([]);
  const customerDetails = ref(null);
  const addNewCustomerDialog = ref(false);

  const fetchCustomers = async () => {
    try {
      customerList.value = await getItems({
        collection: "customers",
        params: {
          fields: "*.*",
        },
      });
      console.log("customer data", customerList.value);
    } catch (e) {
      console.error("customers", e);
    }
  };
  const fetchCompanyRatings = async () => {
    try {
      const filter = {
        status: {
          _eq: "published",
        },
      };
      companyRatingList.value = await getItems({
        collection: "company_ratings",
        params: {
          filter,
        },
      });
      console.log("customer data", companyRatingList.value);
    } catch (e) {
      console.error("customers", e);
    }
  };
  const fetchCustomerById = async (id) => {
    try {
      customerDetails.value = await getItemById({
        collection: "customers",
        id,
        params: {
          fields: "*.*",
        },
      });
      console.log("customer data", customerList.value);
    } catch (e) {
      console.error("customers", e);
    }
  };
  const fetchUnique = async (colName) => {
    try {
      const res = await getItems({
        collection: "customers",
        params: {
          groupBy: colName,
        },
      });
      return res;
    } catch (e) {
      console.error("customers", e);
    }
  };
  const filterCustomerById = async (id) => {
    customerDetails.value = customerList.value.filter((item) => item.id == id);
  };

  return {
    customerList,
    customerDetails,
    companyRatingList,
    addNewCustomerDialog,
    fetchCustomers,
    fetchUnique,
    filterCustomerById,
    fetchCustomerById,
    fetchCompanyRatings,
  };
});
