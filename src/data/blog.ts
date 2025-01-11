import { Clock, User, Tag } from "lucide-react";

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  author: string;
  date: string;
  readTime: number;
  tags: string[];
}

export const blogPosts: BlogPost[] = [
  {
    id: "thai-healthcare-system",
    title: "Navigating Thailand's Healthcare System: A Comprehensive Guide",
    excerpt:
      "Understanding the intricacies of healthcare in Thailand, from private hospitals to insurance coverage.",
    content: `Thailand's healthcare system is renowned for its quality and accessibility. Private hospitals in major cities like Bangkok and Phuket offer world-class medical care with English-speaking staff and international accreditation...`,
    image:
      "https://emergency-thailand.com/wp-content/uploads/30-%E0%B9%84%E0%B8%97%E0%B8%A2%E0%B8%99%E0%B8%84%E0%B8%A3%E0%B8%B4%E0%B8%99.jpeg",
    author: "Dr. Sarah Chen",
    date: "2024-01-15",
    readTime: 8,
    tags: ["Healthcare", "Insurance", "Expat Life"],
  },
  {
    id: "thai-visa-requirements",
    title: "Long-term Visa Options for Retirees in Thailand",
    excerpt:
      "A detailed breakdown of visa requirements and processes for those looking to retire in Thailand.",
    content: `Thailand offers several visa options for retirees, with the Retirement Visa (Non-Immigrant Visa O-A) being the most popular choice...`,
    image:
      "https://thumbs.dreamstime.com/b/seniors-summer-vacation-sea-old-elderly-people-sit-wooden-shezlong-watch-back-side-view-exotic-plants-302146194.jpg",
    author: "Mark Johnson",
    date: "2024-01-10",
    readTime: 10,
    tags: ["Visa", "Legal", "Retirement"],
  },
  {
    id: "cost-of-living",
    title: "Real Cost of Living in Phuket: 2024 Edition",
    excerpt:
      "An honest look at living expenses in Phuket, from housing to daily necessities.",
    content: `While Phuket is known for its luxury resorts and high-end properties, the cost of living can be quite reasonable depending on your lifestyle choices...`,
    image:
      "https://cdn.pixabay.com/photo/2022/09/29/11/46/thailand-7487184_960_720.jpg",
    author: "Lisa Thompson",
    date: "2024-01-05",
    readTime: 12,
    tags: ["Lifestyle", "Finance", "Property"],
  },
];
