import axios from 'axios';
import {person} from '../../types'
export const fetchPostProduct = async (data:person[]) => {
	const res = await axios.post('http://localhost:4444/persons', data);
	return res.data;
};
