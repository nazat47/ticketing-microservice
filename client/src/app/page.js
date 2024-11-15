import { useUser } from "@/context/UserContext";
import { buildClient } from "@/utils/build-client";
import { headers } from "next/headers";
import Link from "next/link";

const getCurrentUser = async (headers) => {
  const client = buildClient({ headers });
  const { data } = await client.get("/api/users/currentuser");
  return data;
};

const getTickets = async (headers) => {
  const client = buildClient({ headers });
  const { data } = await client.get("/api/tickets");
  return data;
};

export default async function Home() {
  const heads = headers();
  const currentuser = await getCurrentUser(heads);
  const tickets = await getTickets(heads);

  const ticketList = tickets?.map((ticket) => {
    return (
      <tr key={ticket.id}>
        <td>{ticket.title}</td>
        <td>{ticket.price}</td>
        <td>
          <Link href={`/tickets/details/${ticket.id}`}>View</Link>
        </td>
      </tr>
    );
  });
  return (
    <div>
      <h1>Tickets</h1>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>price</th>
            <th>Link</th>
          </tr>
        </thead>
        <tbody>{ticketList}</tbody>
      </table>
    </div>
  );
}
