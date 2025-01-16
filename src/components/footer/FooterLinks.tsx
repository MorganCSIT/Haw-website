import { Link, useNavigate, useLocation } from "react-router-dom";
import { scrollToSection } from "../../utils/navigation";

interface LinkSection {
  title: string;
  links: {
    label: string;
    path: string;
  }[];
}

const sections: LinkSection[] = [
  {
    title: "Services",
    links: [
      { label: "Healthcare", path: "/healthcare" },
      { label: "Insurance & Visas", path: "/insurance" },
      { label: "Experiences", path: "/vacations" },
      { label: "Properties", path: "/property" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", path: "/about" },
      { label: "Contact", path: "/contact" },
      { label: "Careers", path: "/careers" },
      { label: "Blog", path: "/blog" },
    ],
  },
  {
    title: "Community",
    links: [
      { label: "Events", path: "/events" },
      { label: "Newsletter", path: "/newsletter" },
      { label: "Testimonials", path: "/#testimonials" },
      { label: "Support", path: "/contact" },
    ],
  },
];

export default function FooterLinks() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = (path: string, e: React.MouseEvent) => {
    e.preventDefault();

    if (path.includes("#")) {
      const [route, hash] = path.split("#");
      if (location.pathname === route) {
        scrollToSection(hash);
      } else {
        navigate(route);
        setTimeout(() => scrollToSection(hash), 100);
      }
    } else {
      navigate(path);
    }
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
      {sections.map((section) => (
        <div key={section.title}>
          <h3 className="text-white font-semibold mb-4">{section.title}</h3>
          <ul className="space-y-2">
            {section.links.map((link) => (
              <li key={link.label}>
                <a
                  href={link.path}
                  onClick={(e) => handleClick(link.path, e)}
                  className="text-gray-400 hover:text-teal-400 transition-colors"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
