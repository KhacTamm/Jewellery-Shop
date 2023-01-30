import { createApiClient } from "./api.service";

class AuthService {
  constructor(baseUrl = "/user") {
    this.api = createApiClient(baseUrl);
  }

  async login(user) {
    return (
      await this.api.post("/signin", {
        phone: user.phone,
        password: user.password,
      })
    ).data;
  }

  async register(user) {
    return (
      await this.api.post("/signup", {
        username: user.username,
        phone: user.phone,
        address: user.address,
        password: user.password,
      })
    ).data;
  }
}

export default new AuthService();

// class AccountService {
//   async registerAccount(data) {
//     try {
//       const res = await api.post(`${url}/signup`, data);
//       return res.data;
//     } catch (err) {
//       return false;
//     }
//   }
//   async loginAccount(data) {
//     try {
//       const res = await api.post(`${url}/signin`, data);
//       return res.data;
//     } catch (err) {
//       return false;
//     }
//   }
//   async logoutLogout() {
//     const res = await api.get(`${url}/logout`);
//     console.log(res.data);
//     return res.data;
//   }
// }
// export default new AccountService();
