import axios from "axios";

export const buildClient = ({ headers }) => {
  return axios.create({
    baseURL: "http://ingress-nginx-controller.ingress-nginx.svc.cluster.local",
    headers: headers,
  });
};
