import { useContext, useMemo, useState } from "react";
import { ChevronDown, Flame } from "lucide-react";
import { Link } from "react-router-dom";
import { ProductContext } from "../../context/ProductContext";

const SidebarMenu = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const [openSubIndex, setOpenSubIndex] = useState({});

  const toggleMain = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
    setOpenSubIndex({});
  };

  const toggleSub = (mainIdx, subIdx) => {
    setOpenSubIndex((prev) => ({
      ...prev,
      [mainIdx]: prev[mainIdx] === subIdx ? null : subIdx,
    }));
  };

  const { categories } = useContext(ProductContext);
  
    // 🧠 Transform categories into required structure for the Products menu
    const transformedProductSubmenu = useMemo(() => {
      return categories.map((cat) => ({
        main: cat.name,
        sub: cat.subcategories.map((sub) => sub.name),
      }));
    }, [categories]);

  const navLinks = [
    { name: "Home", href: "/" },
    {
      name: "Collections",
      href: "/collections/shop.html",
      badge: <Flame fill="red" stroke="" />,
      subname: [
        { main: "Latest Arrivals", sub: ["Summer 2025", "Casuals", "Minimal"] },
        { main: "Popular", sub: ["Men", "Kids", "Women"] },
        { main: "Seasonal", sub: ["Winter Wear", "Festival Specials"] },
      ],
    },
    {
      name: "Products",
      href: "/collections/all.html",
      subname: transformedProductSubmenu
    },
    {
      name: "Services",
      href: "/services",
      subname: [
        { main: "Support", sub: ["Contact Us", "FAQs", "Chat Now"] },
        { main: "Delivery", sub: ["Track Order", "Shipping Policy"] },
        { main: "Returns", sub: ["Return Policy", "Refund Process"] },
      ],
    },
    {
      name: "About",
      href: "/about",
      subname: [
        { main: "Company", sub: ["Our Story", "Careers", "Press"] },
        { main: "Legal", sub: ["Privacy Policy", "Terms of Service"] },
      ],
    },
  ];

  return (
    <div className=" bg-slate-900 h-screen overflow-y-auto p-4 space-y-2 shadow-lg">
      {navLinks.map((link, idx) => (
        <div key={idx} className="rounded-lg overflow-hidden">
          <button
            onClick={() => toggleMain(idx)}
            className={`w-full border-b border-slate-700 flex justify-between items-center text-left text-slate-100 font-medium py-2 px-3 hover:bg-slate-700 transition`}
          >
            <div className="flex items-center gap-2">
              <span>{link.name}</span>
              {link.badge && <span>{link.badge}</span>}
            </div>
            {link.subname && (
              <ChevronDown
                className={`w-4 h-4 transform transition-transform duration-300 ${
                  openIndex === idx ? "rotate-180" : ""
                }`}
              />
            )}
          </button>

          {/* Animated Submenu */}
          <div
            className={`pl-3 space-y-1 bg-slate-800 rounded-b-lg overflow-hidden transition-all duration-300 ease-in-out transform origin-top ${
              openIndex === idx
                ? "scale-y-100 opacity-100 max-h-[500px] py-2"
                : "scale-y-0 opacity-0 max-h-0 py-0"
            }`}
          >
            {link.subname &&
              link.subname.map((subItem, subIdx) => (
                <div key={subIdx}>
                  <button
                    onClick={() => toggleSub(idx, subIdx)}
                    className="w-full border-b border-slate-700 capitalize flex justify-between items-center text-sm font-normal text-slate-200 hover:bg-slate-700 px-2 py-1 transition"
                  >
                    <span>{subItem.main}</span>
                    {subItem.sub?.length > 0 && (
                      <ChevronDown
                        className={`w-3 h-3 transform transition-transform duration-300 ${
                          openSubIndex[idx] === subIdx ? "rotate-180" : ""
                        }`}
                      />
                    )}
                  </button>

                  {/* Animated Sub-Submenu */}
                  <ul
                    className={`ml-3 space-y-1 overflow-hidden capitalize transition-all duration-300 transform origin-top ${
                      openSubIndex[idx] === subIdx
                        ? "scale-y-100 opacity-100 max-h-[300px] mt-1"
                        : "scale-y-0 opacity-0 max-h-0 mt-0"
                    }`}
                  >
                    {subItem.sub.map((child, i) => (
                      <li key={i}>
                        <Link
                          to={`/${subItem.main}/${child}`}
                          className="block text-sm text-slate-300 hover:text-blue-400 px-2 py-0.5 transition"
                        >
                          {child}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SidebarMenu;
