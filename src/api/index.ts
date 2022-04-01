import axios from 'axios';

export async function get(url: string) {
  return (await axios.get(url)).data;
}
