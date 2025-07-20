import Footer from "../base/Footer";
import Header from "../base/Header";

export default function PageBaseLayout({children, onNavigate}: {children: React.ReactNode, onNavigate?: () => void}) {
    return (
      <div className="min-h-screen flex flex-col justify-between">
        <Header onClick={onNavigate}/>
        {children}
        <Footer />
      </div>
    );
}