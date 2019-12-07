import axios from "axios";

export default {
  getGoogleBooks: function(search) {
    return axios.get(
      `https://www.googleapis.com/books/v1/volumes?q=" + ${search}`
    );
  },
  saveBook: function(bookData) {
    console.log("DA BOOK IS ", bookData);
    return axios.post(`/api/savedbooks`, bookData);
  },
  getSavedBooks: function() {
    return axios.get(`/api/savedbooks`)
  }
};
