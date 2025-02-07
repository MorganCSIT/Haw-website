// import { useState } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import { Menu, X, Palmtree } from "lucide-react";
// import { Link } from "react-router-dom";
// import Navigation from "./Navigation";
// import MobileMenu from "./MobileMenu";
// import { NavigationItem } from "../../types/navigation";

// const navigationItems: NavigationItem[] = [
//   { path: "/", label: "Home" },
//   { path: "/vacations", label: "Experiences" },
//   { path: "/property", label: "Property Investment" },
//   { path: "/healthcare", label: "Healthcare" },
//   { path: "/insurance", label: "Insurance & Legal" },
//   { path: "/events", label: "Community" },
//   { path: "/blog", label: "Blog" },
// ];

// export default function Header() {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const navigate = useNavigate();
//   const location = useLocation();

//   const handleNavigation = (path: string) => {
//     setIsMenuOpen(false);
//     navigate(path);
//   };

//   const handleContactClick = (e: React.MouseEvent) => {
//     e.preventDefault();
//     setIsMenuOpen(false);
//     if (location.pathname === "/") {
//       document
//         .getElementById("contact")
//         ?.scrollIntoView({ behavior: "smooth" });
//     } else {
//       navigate("/?contact=true");
//     }
//   };

//   const isActive = (path: string) => {
//     return location.pathname === path
//       ? "text-teal-600"
//       : "text-gray-600 hover:text-teal-600";
//   };

//   return (
//     <header className="fixed w-full bg-white/95 backdrop-blur-sm shadow-sm z-50">
//       <nav className="container mx-auto px-6 py-4">
//         <div className="flex items-center justify-between">
//           <Link
//             to="/"
//             className="flex items-center space-x-2"
//             onClick={() => setIsMenuOpen(false)}
//           >
//             <Palmtree className="h-8 w-8 text-teal-600" />
//             <span className="text-2xl font-semibold text-gray-800">
//               Serenity Haven
//             </span>
//           </Link>

//           <Navigation items={navigationItems} isActive={isActive} />

//           <button
//             className="md:hidden"
//             onClick={() => setIsMenuOpen(!isMenuOpen)}
//             aria-label={isMenuOpen ? "Close menu" : "Open menu"}
//           >
//             {isMenuOpen ? (
//               <X className="h-6 w-6" />
//             ) : (
//               <Menu className="h-6 w-6" />
//             )}
//           </button>
//         </div>

//         <MobileMenu
//           items={navigationItems}
//           isActive={isActive}
//           onItemClick={handleNavigation}
//           onContactClick={handleContactClick}
//           isOpen={isMenuOpen}
//         />
//       </nav>
//     </header>
//   );
// }
