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
    content: `
      Thailand's healthcare system is renowned for its quality and accessibility. Private hospitals in major cities like Bangkok and Phuket offer world-class medical care with English-speaking staff and international accreditation. These facilities often resemble five-star hotels, providing comfortable amenities and cutting-edge technology.
      
      In addition to private hospitals, public healthcare facilities are also readily available. While public hospitals might have longer wait times and fewer staff fluent in English, they provide affordable healthcare services that meet international standards. Many expats and retirees opt for a combination of public and private care, depending on the complexity of the medical issue.
      
      When it comes to insurance, international health insurance providers typically include coverage for Thailand. It’s crucial to understand your policy details—especially when it comes to pre-existing conditions and deductible amounts. Researching local insurance providers can also be beneficial, as they sometimes offer more competitive rates with comprehensive coverage.
      
      Overall, whether you're an expat settling in or a retiree enjoying your golden years, Thailand's healthcare system provides peace of mind for those seeking high-quality, cost-effective medical services.
    `,
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
    content: `
      Thailand offers several visa options for retirees, with the Retirement Visa (Non-Immigrant Visa O-A) being the most popular choice. To qualify, applicants must meet certain financial requirements, such as a specified monthly income or a lump sum deposited in a Thai bank account. The exact amount may vary, but generally, retirees need to maintain a balance of at least 800,000 THB (around USD 25,000) in a Thai bank.
      
      Another option is the Non-Immigrant Visa O-X, which is a 10-year visa aimed at retirees 50 years of age and older. Although it offers a longer stay duration, it also has stricter financial and health insurance requirements. Applicants must provide proof of substantial funds and have valid health insurance that meets Thai government regulations.
      
      The application process involves gathering documents such as bank statements, a valid passport, proof of health insurance, and a clean criminal record. After arriving in Thailand, retirees must report their address every 90 days at a local immigration office or online. Ensuring compliance with these regulations is essential to avoid fines or complications.
      
      Overall, retiring in Thailand is a feasible and attractive option, given the country’s affordable cost of living, warm climate, and rich cultural heritage. It's important to conduct thorough research and possibly consult an immigration lawyer to streamline the visa process.
    `,
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
    content: `
      While Phuket is known for its luxury resorts and high-end properties, the cost of living can be quite reasonable depending on your lifestyle choices. Accommodation is typically one of the biggest expenses. You can find everything from budget-friendly apartments starting at around 10,000 THB (USD 300) per month to lavish villas costing well into the thousands of dollars.
      
      Daily necessities like groceries, utilities, and transportation also vary in price. Shopping at local markets rather than large supermarkets can significantly reduce your food budget. Public transport is limited, but motorbike rentals and tuk-tuks are readily available, with prices that fluctuate depending on the season and location. Many residents opt to purchase or lease a scooter for convenience.
      
      For entertainment, Phuket offers a variety of free or low-cost activities, such as exploring beautiful beaches, local temples, and bustling night markets. However, tourist hot spots and nightlife areas can quickly eat into your budget. Balancing local experiences with occasional splurges helps to keep costs manageable.
      
      In summary, living in Phuket can be both economical and indulgent. Careful planning and smart spending go a long way in ensuring you can enjoy island life without breaking the bank.
    `,
    image:
      "https://cdn.pixabay.com/photo/2022/09/29/11/46/thailand-7487184_960_720.jpg",
    author: "Lisa Thompson",
    date: "2024-01-05",
    readTime: 12,
    tags: ["Lifestyle", "Finance", "Property"],
  },
];
