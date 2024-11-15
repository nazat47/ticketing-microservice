import axios from "axios";

export async function GET(request) {
  const { data } = await axios.get(
    "http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/api/users/currentuser",
    {
      headers: request.headers,
    }
  );
  console.log(data);
  return new Response(JSON.stringify(data));
}
