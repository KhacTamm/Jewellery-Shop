import { createApiClient } from "./api.service";

class CartService {
  constructor(baseUrl = "/cart") {
    this.api = createApiClient(baseUrl);
  }

  async addCart(id) {
    return (await this.api.get(`/add-to-cart/${id}`)).data;
  }

  async getCart() {
    const res = await this.api.get("/");
    console.log(res.data);
    return (await this.api.get("/")).data;
  }

  async removeCart(id) {
    console.log(id);
    const res = await this.api.get(`/remove/${id}`);
    console.log(res.data);
    return (await this.api.get(`/remove/${id}`)).data;
  }

  async removeCartAll() {
    const res = await this.api.get("/remove");
    console.log(res.data);
    return (await this.api.get("/remove")).data;
  }
}

export default new CartService();
