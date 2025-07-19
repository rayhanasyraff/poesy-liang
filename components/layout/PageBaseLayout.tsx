import Footer from "../base/Footer";
import Header from "../base/Header";

export default function PageBaseLayout({children, onNavigate}: {children: React.ReactNode, onNavigate?: () => void}) {
    return (
      <div className="flex flex-col">
        <Header onClick={onNavigate}/>
        {children}
        <Footer />
      </div>
    );
}