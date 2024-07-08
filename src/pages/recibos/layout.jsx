import { Inter } from "next/font/google";

import NavBar from "@/ui/navbar/Navbar";

import '@fortawesome/fontawesome-free/css/all.css'
import { Fragment } from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Condominio Siena",
  description: "Pagina para condominio Siena",
};

export default function RootLayout({ children }) {
  return (
        <Fragment>
          <NavBar/>
          <div className="container">
            {children}
          </div>
        </Fragment>

  );
}
