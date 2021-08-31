import axios from 'axios';
import MimicClient from 'mimic-client-sdk';
import { API_ENDPOINT } from './config';

MimicClient.init(axios);

export const agent = axios.create({ baseURL: API_ENDPOINT });
