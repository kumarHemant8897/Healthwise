import { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";
import ChatbotWidget from "../chatbot/ChatbotWidget";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
      <ChatbotWidget />
    </div>
  );
};

export default Layout;