export interface NewsUpdate {
  title: string;
  content: string;
  date: string;
  category: string;
  link?: string;
}

export const newsUpdates: NewsUpdate[] = [
  {
    title: "New Healthcare Partnership Announcement",
    content: "We're excited to announce our partnership with Bangkok Hospital Phuket, expanding our healthcare services for residents.",
    date: "March 15, 2024",
    category: "Healthcare",
    link: "/blog/healthcare-partnership"
  },
  {
    title: "Luxury Villa Development Launch",
    content: "Introducing our newest luxury villa development in Rawai, featuring ocean views and modern amenities.",
    date: "March 10, 2024",
    category: "Property",
    link: "/property"
  },
  {
    title: "Community Center Grand Opening",
    content: "Join us for the grand opening of our new community center, designed to bring our residents together.",
    date: "March 5, 2024",
    category: "Community",
    link: "/events"
  },
  {
    title: "Enhanced Insurance Coverage Options",
    content: "We've expanded our insurance coverage options to provide better protection for our residents.",
    date: "March 1, 2024",
    category: "Insurance",
    link: "/insurance"
  }
];