import { buildClient } from "@/utils/build-client";
import { headers } from "next/headers";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import { UserProvider } from "@/context/UserContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

const getCurrentUser = async (headers) => {
  const client = buildClient({ headers });
  const { data } = await client.get("/api/users/currentuser");
  return data;
};

export default async function RootLayout({ children }) {
  const heads = headers();
  const currentuser = await getCurrentUser(heads);
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header currentUser={currentuser} />
        <UserProvider value={currentuser}>
          <div className="px-20">{children}</div>
        </UserProvider>
      </body>
    </html>
  );
}
