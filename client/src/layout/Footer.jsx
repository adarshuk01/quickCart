import { Facebook, Twitter, Instagram } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white px-6 py-10 text-sm z-50">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
        
        {/* Contact Info */}
        <div>
          <h2 className="font-bold text-lg mb-4">CONTACT INFO</h2>
          <p className="text-gray-400"><span className="font-semibold text-white">ADDRESS:</span> <br />123 Street Name, City, England</p>
          <p className="mt-2 text-gray-400"><span className="font-semibold text-white">PHONE:</span> <br />(123) 456-7890</p>
          <p className="mt-2 text-gray-400"><span className="font-semibold text-white">EMAIL:</span> <br />mail@example.com</p>
          <p className="mt-2 text-gray-400"><span className="font-semibold text-white">WORKING DAYS/HOURS:</span> <br />Mon - Sun / 9:00 AM - 8:00 PM</p>
          <div className="flex gap-3 mt-4">
            <a href="#"><Facebook className="w-5 h-5" /></a>
            <a href="#"><Twitter className="w-5 h-5" /></a>
            <a href="#"><Instagram className="w-5 h-5" /></a>
          </div>
        </div>

        {/* Customer Service */}
        <div>
          <h2 className="font-bold  text-lg mb-4">CUSTOMER SERVICE</h2>
          {[
            "Help & FAQs",
            "Order Tracking",
            "Shipping & Delivery",
            "Orders History",
            "Advanced Search",
            "My Account",
            "Careers",
            "About Us",
            "Corporate Sales",
            "Privacy"
          ].map(item => (
            <p key={item} className="mb-1 text-gray-400 hover:underline cursor-pointer">{item}</p>
          ))}
        </div>

        {/* Popular Tags */}
        <div>
          <h2 className="font-bold text-lg mb-4">POPULAR TAGS</h2>
          <div className="flex flex-wrap gap-2">
            {["Bag", "Black", "Blue", "Clothes", "Fashion", "Hub", "Jean", "Shirt", "Skirt", "Sports", "Sweater", "Winter"].map(tag => (
              <span key={tag} className="bg-gray-800 px-3 py-1 rounded-md cursor-pointer hover:bg-gray-700">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Newsletter */}
        <div>
          <h2 className="font-bold text-lg mb-4">SUBSCRIBE NEWSLETTER</h2>
          <p className="mb-4 text-gray-400">Get all the latest information on events, sales and offers. Sign up for newsletter:</p>
          <div className="flex flex-col gap-2">
            <input type="email" placeholder="Email Address" className="px-4 py-2 border border-white focus:outline-none rounded-md text-white" />
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md w-fit">SUBMIT</button>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="mt-10 border-t border-gray-700 pt-6 text-center text-xs flex flex-col sm:flex-row justify-between items-center max-w-7xl mx-auto">
        <p className="text-gray-400">© Porto eCommerce. © 2020. All Rights Reserved</p>
        <div className="flex gap-4 mt-2 sm:mt-0">
          <img src="https://img.icons8.com/color/48/000000/visa.png" className="h-6" />
          <img src="https://img.icons8.com/color/48/000000/paypal.png" className="h-6" />
          <img src="https://img.icons8.com/color/48/000000/stripe.png" className="h-6" />
          <img src="https://img.icons8.com/ios-filled/50/ffffff/verified-account.png" className="h-6" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
