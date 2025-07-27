import Footer from "../base/Footer";
import Header from "../base/Header";
import NavigationMenu from "../base/NavigationMenu";

export default function PageBaseLayout({children, onNavigate}: {children: React.ReactNode, onNavigate?: () => void}) {
    return (
      <div className="min-h-screen flex flex-col justify-between">
        <div className="flex flex-1 flex-col gap-5">
          <Header onClick={onNavigate}/>
          <NavigationMenu />
          {children}
        </div>
        <Footer />
      </div>
    );
}