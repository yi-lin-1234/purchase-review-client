import axios from "axios";
import { Body } from "./type";

//dev
// const instance = axios.create({
//   baseURL: "http://localhost:8000",
// });

//prod
const instance = axios.create({
  baseURL:
    "https://purchase-review-server-production.up.railway.app/api/v1/purchase",
});

//🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢( POST )🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢

// create a new purchase
export const createNewPurchase = async (body: Body) => {
  await instance.post("", body);
};

//=======================( GET )===========================

// fetch all purchases
export const getAllPurchases = async () => {
  const response = await instance.get("");
  return response.data.data;
};

// GET request to retrieve a purchase by ID
export const getPurchaseById = async (id: string) => {
  const response = await instance.get(`/${id}`);
  return response.data.data;
};

// search purchases that name contain search term

export const getPurchasesBySearchTerm = async (term: string) => {
  const response = await instance.get(`/search/${term}`);
  return response.data.data;
};

//==============================( PUT )==============================

// update the purchase by id
export const updatePurchaseById = async (id: string, body: Body) => {
  await instance.put(`/${id}`, body);
};

//==============================( DELETE )==============================

// delete a purchase by id
export const deletePurchaseById = async (id: string) => {
  await instance.delete(`/${id}`);
};
