import http from "../http";

class CandidatesService {
  getAll() {
    return http.get("/candidates");
  }

  get(id) {
    return http.get(`/candidates/${id}`);
  }

  create(data) {
    return http.post("/candidates", data);
  }

  update(id, data) {
    return http.put(`/candidates/${id}`, data);
  }

  delete(id) {
    return http.delete(`/candidates/${id}`);
  }
}

export default new CandidatesService();
