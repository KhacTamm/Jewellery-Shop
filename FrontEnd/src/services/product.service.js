import { createApiClient } from "./api.service";

class ProductService {
  constructor(baseUrl = "/product") {
    this.api = createApiClient(baseUrl);
  }

  async getTypeProducts(id) {
    const req = await this.api.get(`/typeProducts/${id}`);
    return req.data;
  }

  async getAllTypeProducts() {
    return (await this.api.get("/getAllTypeProducts")).data;
  }

  async getAll() {
    return (await this.api.get("/")).data;
  }

  async get(id) {
    return (await this.api.get(`/${id}`)).data;
  }
  async create(data) {
    return (await this.api.post("/", data)).data;
  }
  async forceDelete(id) {
    return await this.api.delete(`/${id}`).data;
  }
  async update(id, data) {
    return await this.api.put(`/${id}/edit`, data).data;
  }
  async deleteAll() {
    return (await this.api.delete("/")).data;
  }

  async delete(id) {
    return (await this.api.delete(`/${id}`)).data;
  }
}

export default new ProductService();
