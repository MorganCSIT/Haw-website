import { useCart } from '../hooks/useCart';
import { carePackages } from './carePackages';
import { insuranceOptions } from './insurance';
import { experiences } from './experiences';
import { properties } from './properties';
import { events } from './events';
import type { SelectionStepType } from '../types/selection';

export const selectionSteps: SelectionStepType[] = [
  {
    title: "Select Healthcare Package",
    description: "Choose a healthcare package that suits your needs",
    products: carePackages.map(pkg => ({
      id: pkg.id,
      name: pkg.title,
      description: pkg.description,
      image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80",
      onSelect: () => {
        const { addToCart } = useCart();
        addToCart({
          id: pkg.id,
          name: pkg.title,
          description: pkg.description,
          price: parseFloat(pkg.price.replace(/[^0-9.]/g, '')),
          category: 'healthcare'
        });
      }
    }))
  },
  {
    title: "Choose Insurance Coverage",
    description: "Select insurance coverage for your stay",
    products: insuranceOptions.map(option => ({
      id: option.id,
      name: option.title,
      description: option.description,
      image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80",
      onSelect: () => {
        const { addToCart } = useCart();
        addToCart({
          id: option.id,
          name: option.title,
          description: option.description,
          price: parseFloat(option.price.replace(/[^0-9.]/g, '')),
          category: 'insurance'
        });
      }
    }))
  },
  {
    title: "Plan Your Experience",
    description: "Choose from our curated experiences",
    products: experiences.slice(0, 6).map(exp => ({
      id: exp.id,
      name: exp.title,
      description: exp.description,
      image: exp.image,
      onSelect: () => {
        const { addToCart } = useCart();
        addToCart({
          id: exp.id,
          name: exp.title,
          description: exp.description,
          price: exp.price,
          category: 'vacation'
        });
      }
    }))
  },
  {
    title: "Find Your Property",
    description: "Discover your perfect property in Phuket",
    products: properties.slice(0, 6).map(prop => ({
      id: prop.id,
      name: prop.title,
      description: prop.description,
      image: prop.image,
      onSelect: () => {
        const { addToCart } = useCart();
        addToCart({
          id: prop.id,
          name: prop.title,
          description: prop.description,
          price: prop.price,
          category: 'property'
        });
      }
    }))
  },
  {
    title: "Join Community Events",
    description: "Connect with our vibrant community",
    products: events.map(event => ({
      id: event.id,
      name: event.title,
      description: event.description,
      image: event.image,
      onSelect: () => {
        const { addToCart } = useCart();
        addToCart({
          id: event.id,
          name: event.title,
          description: event.description,
          price: typeof event.price === 'number' ? event.price : 0,
          category: 'event'
        });
      }
    }))
  }
];