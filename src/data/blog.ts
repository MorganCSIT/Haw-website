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
  // 1) Existing Post: Thailand Healthcare System
  {
    id: "thai-healthcare-system",
    title: "Navigating Thailand's Healthcare System: A Comprehensive Guide",
    excerpt:
      "Understanding the intricacies of healthcare in Thailand, from private hospitals to insurance coverage.",
    content: `
Thailand's healthcare system is renowned for its quality and accessibility. Private hospitals in major cities like Bangkok and Phuket offer world-class medical care with English-speaking staff and international accreditation. Public hospitals, on the other hand, are more affordable but may have longer wait times and fewer English-speaking professionals. 

When considering health insurance, expats often opt for international or local Thai policies that cover both in-patient and out-patient care. Many insurers have partnerships with top-tier hospitals, ensuring a seamless billing process. For retirees, certain long-term visas also require proof of health coverage, making it crucial to research your policy options well before arrival.

Key points to remember:
- Consider both public and private healthcare facilities.
- Check if your insurance policy is accepted by major hospitals.
- Maintain an up-to-date health record and carry essential documents at all times.
`,
    image:
      "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80",
    author: "Dr. Sarah Chen",
    date: "2024-01-15",
    readTime: 8,
    tags: ["Healthcare", "Insurance", "Expat Life"],
  },

  // 2) Existing Post: Thailand Visa Requirements
  {
    id: "thai-visa-requirements",
    title: "Long-term Visa Options for Retirees in Thailand",
    excerpt:
      "A detailed breakdown of visa requirements and processes for those looking to retire in Thailand.",
    content: `
Thailand offers several visa options for retirees, with the Retirement Visa (Non-Immigrant Visa O-A) being the most popular choice. Applicants generally need to meet age and financial requirements, such as proof of a monthly income or a bank deposit maintained in a Thai account. 

For those seeking a more flexible stay, the Non-Immigrant Visa O-X is valid for 10 years but has stricter financial prerequisites. Extensions are often handled at local immigration offices, and you’ll need to report your address every 90 days. If you plan to work, volunteer, or start a business, you'll need additional permits or different visa categories.

Key points:
- Ensure you meet financial and age requirements (50+ for Retirement Visas).
- Select the right visa category for your lifestyle and plans (O-A, O-X, Elite Visa, etc.).
- Stay updated on immigration regulations to avoid penalties.
`,
    image:
      "https://images.unsplash.com/photo-1565967511849-76a60a516170?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80",
    author: "Mark Johnson",
    date: "2024-01-10",
    readTime: 10,
    tags: ["Visa", "Legal", "Retirement"],
  },

  // 3) Existing Post: Cost of Living in Phuket
  {
    id: "cost-of-living",
    title: "Real Cost of Living in Phuket: 2024 Edition",
    excerpt:
      "An honest look at living expenses in Phuket, from housing to daily necessities.",
    content: `
While Phuket is known for its luxury resorts and high-end properties, the cost of living can be quite reasonable depending on your lifestyle choices. Renting a small apartment or condominium outside tourist hotspots can save you a significant amount, while local markets offer fresh produce at budget-friendly prices.

Transportation costs vary: some opt for motorbikes or scooters for convenience, while others rely on public transportation. Healthcare, utilities, and dining out can also be managed affordably if you avoid peak tourist season and stick to local establishments. However, if you prefer a more upscale lifestyle—frequent dining at international restaurants and residing in gated communities—expect to pay a premium.

Budgeting tips:
- Compare property rentals in local neighborhoods vs. tourist areas.
- Embrace local Thai markets for groceries to save significantly.
- Keep an eye out for resident discounts at attractions and restaurants.
`,
    image:
      "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80",
    author: "Lisa Thompson",
    date: "2024-01-05",
    readTime: 12,
    tags: ["Lifestyle", "Finance", "Property"],
  },

  // 4) New Post: Embracing Thai Culture and Etiquette
  {
    id: "thai-culture-etiquette",
    title: "Embracing Thai Culture and Etiquette: A Guide for Newcomers",
    excerpt:
      "From respectful greetings to social norms, learn how to navigate Thai culture with ease.",
    content: `
Thailand’s rich culture is deeply rooted in respect, courtesy, and tradition. The traditional Thai greeting, known as the "wai," is a symbol of respect. To properly perform a wai, press your palms together at chest level and lightly bow your head. 

It's also important to observe social norms: dress modestly when visiting temples, remove your shoes before entering homes, and avoid touching someone’s head or pointing your feet at sacred objects or people. Adhering to these cultural customs not only shows respect but also helps you integrate more smoothly into local communities.

Important considerations:
- Use the "wai" greeting, especially with elders and in formal settings.
- Cover your shoulders and knees when visiting religious sites.
- Smile often—Thailand is known as the "Land of Smiles" for a reason!
`,
    image:
      "https://images.unsplash.com/photo-1530523502968-83278a5f5f74?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80",
    author: "Patchara Sukcharoen",
    date: "2024-02-01",
    readTime: 7,
    tags: ["Culture", "Etiquette", "Expat Life"],
  },

  // 5) New Post: Top Neighborhoods in Bangkok
  {
    id: "bangkok-neighborhoods",
    title: "Discovering Bangkok: Top Neighborhoods for Expats",
    excerpt:
      "A neighborhood-by-neighborhood guide to help you find the perfect fit in Thailand’s bustling capital.",
    content: `
Bangkok’s diversity means there’s a neighborhood for everyone, from the bustling commercial areas to quieter, family-friendly communities. Sukhumvit is a favorite among expats, thanks to its abundance of international restaurants, shopping malls, and easy access to the BTS Skytrain. If you’re looking for a more laid-back vibe, areas like Ari or Phra Khanong offer a quieter setting with trendy cafés and lush parks.

Before settling on a neighborhood, consider factors like commute time, local amenities, and your social network. Each district offers unique perks, so spend some time exploring to find the best match for your lifestyle.

Highlights:
- Sukhumvit: Lively, cosmopolitan, and well-connected by public transport.
- Ari: Trendy cafés, leafy streets, and a growing expat community.
- Thonglor/Ekkamai: Upscale dining and nightlife scene for those seeking a modern lifestyle.
`,
    image:
      "https://images.unsplash.com/photo-1609263728211-4d5d81209b1f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80",
    author: "Anthony White",
    date: "2024-02-10",
    readTime: 9,
    tags: ["Bangkok", "Lifestyle", "Property"],
  },

  // 6) New Post: Exploring Thai Cuisine
  {
    id: "thai-cuisine-explored",
    title:
      "Exploring Thai Cuisine: A Foodie’s Guide from Street Eats to Fine Dining",
    excerpt:
      "Dive into the flavors of Thailand: street markets, must-try dishes, and upscale dining experiences.",
    content: `
Thai cuisine is famed for its harmonious blend of spicy, sweet, sour, and salty flavors. Street food stalls serve up staples like Pad Thai, Som Tam (papaya salad), and grilled meats, often accompanied by fresh herbs and tangy sauces. Night markets are a must-visit for adventurous eaters, offering everything from insects to coconut ice cream.

For special occasions or a touch of luxury, Thailand’s cities are home to award-winning restaurants where chefs reimagine classic Thai dishes with modern techniques. Whether you’re a street-food enthusiast or a fine-dining aficionado, Thailand’s culinary scene promises an unforgettable experience.

Must-try items:
- Tom Yum Goong: Spicy and sour shrimp soup with lemongrass.
- Mango Sticky Rice: Sweet, creamy dessert that’s a local favorite.
- Khao Soi: Northern Thai curry noodle dish rich in coconut flavor.
`,
    image:
      "https://images.unsplash.com/photo-1607890246262-ebb09f1c034d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80",
    author: "Chef Anan Suriyaset",
    date: "2024-02-20",
    readTime: 6,
    tags: ["Food", "Culture", "Travel"],
  },
];
