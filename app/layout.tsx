import { Nunito } from "next/font/google";
import "./globals.css";

import { Navbar } from "./components/navbar/Navbar";
import { RegisterModal } from "./components/modals/RegisterModal";
import { LoginModal } from "./components/modals/LoginModal";
import { ToasterProvider } from "./providers/ToasterProvider";
import getCurrentUser from "./actions/getCurrentUser";
import { RentModal } from "./components/modals/RentModal";
import { SearchModal } from "./components/modals/SearchModal";

export const metadata = {
  title: "AirBnB",
  description: "AirBnB clone",
};

const nunito = Nunito({ subsets: ["latin"] });

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();

  return (
    <html lang="en">
      <body className={nunito.className}>
        <ToasterProvider />
        <RegisterModal />
        <LoginModal />
        <RentModal />
        <SearchModal />
        <Navbar currentUser={currentUser} />
        <div className="pb-20 pt-28">{children}</div>
      </body>
    </html>
  );
}
