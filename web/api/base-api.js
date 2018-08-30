export default class BaseApi {
  constructor($http, $q, posgram, resource) {
    this.$http = $http;
    this.$q = $q;
    this.posgram = posgram;
    this.endpoint = `${this.posgram.config.api}/${resource}`;
  }

  findById(id) {
    let url = `${this.endpoint}/${id}`;

    return this.$q((resolve, reject) => {
      this.$http.get(url)
        .then(res => {
          resolve(res.data);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  find(query, options) {
    let url = `${this.endpoint}`;
    if (query) url = `${url}?${query}`;
    if (options) {
      if (url.indexOf('?') < 0) url = `${url}?`;
      if (options.page) url = `${url}&page=${options.page}`;
      if (options.limit) url = `${url}&limit=${options.limit}`;
    }

    return this.$q((resolve, reject) => {
      this.$http.get(url)
        .then(res => {
          resolve(res.data);
        })
        .catch(err => {
          reject(err);
        });
    });    
  }

  create(data) {
    let url = `${this.endpoint}`;

    return this.$q((resolve, reject) => {
      this.$http.post(url, data)
        .then(res => {
          resolve(res.data);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  update(id, data) {
    let url = `${this.endpoint}/${id}`;

    return this.$q((resolve, reject) => {
      this.$http.put(url, data)
        .then(res => {
          resolve(res.data);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  delete(id) {
    let url = `${this.endpoint}/${id}`;

    return this.$q((resolve, reject) => {
      this.$http.delete(url)
        .then(res => {
          resolve(res.data);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  markDeleted(id) {
    let url = `${this.endpoint}/delete/${id}`;

    return this.$q((resolve, reject) => {
      this.$http.post(url)
        .then(res => {
          resolve(res.data);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  download(query, options) {
    let token = window.localStorage.getItem('token');
    let url = `${this.endpoint}/download?jwt=${token}`;
    if (query) url = `${url}&${query}`;
    if (options) {
      if (url.indexOf('?') < 0) url = `${url}?`;
      if (options.page) url = `${url}&page=${options.page}`;
      if (options.limit) url = `${url}&limit=${options.limit}`;
    }

    window.open(url)
    // this.$http.get(url)
  }  
}