import Link from "next/link";
import React from "react";

const Header = ({ currentUser }) => {
  const links = [
    !currentUser && { label: "Sign Up", href: "/auth/signup" },
    !currentUser && { label: "Sign In", href: "/auth/signin" },
    currentUser && { label: "Sell Tickets", href: "/tickets/new" },
    currentUser && { label: "My Orders", href: "/orders" },
    currentUser && { label: "Sign Out", href: "/auth/signout" },
  ]
    .filter((link) => link)
    .map(({ label, href }) => (
      <li key={href}>
        <Link href={href}>{label}</Link>
      </li>
    ));
  return (
    <nav className="w-full p-4 bg-gray-300 flex items-center justify-between">
      <Link href={"/"}>GitTix</Link>
      <div className="flex items-center justify-end">
        <ul className="flex items-center gap-3">{links}</ul>
      </div>
    </nav>
  );
};

export default Header;
