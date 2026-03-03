import Navbar from "./NavBar";

export default function AppShell({ children }) {
  return (
    <div className="min-h-screen bg-brandBlack text-white">
      <Navbar />
      <main>{children}</main>
    </div>
  );
}
