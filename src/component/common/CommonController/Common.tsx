export const selectOptions = [
    { value: "", label: "All" },
    { value: "Male", label: "Male" },
    { value: "Female", label: "Female" },
  ];


  export const formatDate = (date:any) => {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  }

  export const selectProductOptions = [
    { value: "men's clothing", key: "men's clothing" },
    { value: "jewelery", key: "jewelery" },
    { value: "electronics", key: "electronics" },
    { value: "women's clothing", key: "women's clothing" },
  ];

export const selectGenderOptions = [
    { value: "Male", key: "Male" },
    { value: "Female", key: "Female" },
  ];