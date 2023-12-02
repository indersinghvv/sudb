const { getItems, getItemById } = useDirectusItems();

export const useCustomerStore = defineStore("customer", () => {
  const customerDetails = ref(null);
  const addNewCustomerDialog = ref(false);

  //customer list

  const fetchCustomers = async () => {
    try {
      const response = await getItems({
        collection: "customers",
        params: {
          fields: "*.*",
        },
      });
      return response;
    } catch (e) {
      console.error("customers", e);
    }
  };
  //column list

  //company rating list
  const companyRatingList = ref([]);
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
      console.log("fetchCustomerById", customerDetails.value);
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
