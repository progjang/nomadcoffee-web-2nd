const routes = {
    home: "/",
    signUp: "/sign-up",
    addShop: "/add",
    shopDetail: (id: string) => (id ? `/shop/${id}` : "/shop/:id"),
    editShop: (id: string) => (id ? `/shop/${id}/edit` : "/shop/:id/edit")
  };
  export default routes;