import { createApiClient } from "./api.service";

class AdminService {
  constructor(baseUrl = "/admin") {
    this.api = createApiClient(baseUrl);
  }

  async getAll() {
    const req = await this.api.get("/");
    // console.log(req.data);
    return req.data;
    // return (await this.api.get("/")).data;
  }

  async get(id) {
    return (await this.api.get(`/${id}`)).data;
  }

  async create(data, id) {
    return (await this.api.post(`/create/${id}`, data)).data;
  }

  async forceDelete(id) {
    return await this.api.delete(`/${id}`).data;
  }

  async update(id, data) {
    return await this.api.put(`/${id}`, data).data;
  }

  async deleteAll() {
    return (await this.api.delete("/")).data;
  }

  async delete(id) {
    return (await this.api.delete(`/${id}`)).data;
  }

  ///Loại sản phẩm

  async getTypeProducts(id) {
    const req = await this.api.get(`/typeProducts/${id}`);
    // console.log(req.data);
    return req.data;

    // return (await this.api.get(`/typeProducts/${id}`)).data;
  }

  async createTypeProducts(data) {
    console.log(data);
    return (await this.api.post("/createTypeProducts", data)).data;
  }

  async getAllTypeProducts() {
    return (await this.api.get("/getAllTypeProducts")).data;
  }

  async deleteTypeProducts(id) {
    return (await this.api.delete(`/typeProducts/${id}`)).data;
  }

  async deleteAllTypeP() {
    return (await this.api.delete("/typeProducts")).data;
  }
}

export default new AdminService();
