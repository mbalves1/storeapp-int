import axios from 'axios'

export async function getProducts ({commit}) {
  const response = await axios.get('http://localhost:3159/products:')
  commit('SET_PRODUCTS', response.data)
}
