import { ChevronDown, Flame } from "lucide-react";
import { useContext, useMemo } from "react";
import { Link } from "react-router-dom";
import { ProductContext } from "../../context/ProductContext";

const NavMenu = () => {
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
      subname: transformedProductSubmenu,
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
    <nav className="pb- h-[50px] capitalize w-full -mt-2 bg-white hidden lg:block shadow-sm ">
      <div className="container pb-2 mt-2 rounded-2xl mx-auto flex justify-center items-center px-4 w-fit">
        <ul className="flex space-x-6">
          {navLinks.map((link, idx) => (
            <li
              key={idx}
              className="relative group h-[50px] border-t-4 border-t-transparent hover:border-t-[#0371a8]"
            >
              <div className="h-[50px] cursor-pointer uppercase flex items-center text-gray-700 font-medium px-2 text-sm group-hover:text-[#0371a8]">
                {link.name}
                {link.badge && (
                  <span className="ml-1 text-xs text-white rounded">
                    {link.badge}
                  </span>
                )}
                {link.subname && <ChevronDown className="ml-1 w-4 h-4" />}
              </div>

              {/* Dropdown */}
              {link.subname && (
                <ul className="absolute top-full left-0 mt-1 bg-white shadow-md rounded w-[400px] opacity-0 group-hover:opacity-100 invisible group-hover:visible grid grid-cols-3 justify-center gap-4 transition-all duration-300 z-50 p-4">
                  {link.subname.map((subItem, subIdx) => (
                    <li className="w-fit" key={subIdx}>
                      <div className="font-semibold text-gray-900 mb-2">
                        {subItem.main}
                      </div>
                      <ul>
                        {subItem.sub.map((child, i) => (
                          <li key={i}>
                            <Link
                              to={`/${subItem.main}/${child}`}
                              className="block px-2 py-1 text-nowrap text-sm text-gray-700 hover:bg-gray-100 rounded"
                            >
                              {child}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default NavMenu;
