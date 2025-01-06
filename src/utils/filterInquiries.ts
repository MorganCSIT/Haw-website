import { isWithinInterval, parseISO } from 'date-fns';
import type { AdminInquiry, CartInquiry } from '../types/admin';

interface Filters {
  startDate: string;
  endDate: string;
  category: string;
  statuses: string[];
}

export function filterInquiries(inquiries: AdminInquiry[], filters: Filters): AdminInquiry[] {
  return inquiries.filter(inquiry => {
    // Date filter
    if (filters.startDate && filters.endDate) {
      const inquiryDate = parseISO(inquiry.created_at);
      const startDate = parseISO(filters.startDate);
      const endDate = parseISO(filters.endDate);
      
      if (!isWithinInterval(inquiryDate, { start: startDate, end: endDate })) {
        return false;
      }
    }

    // Category filter
    if (filters.category && inquiry.category !== filters.category) {
      return false;
    }

    // Status filter
    if (filters.statuses.length > 0 && !filters.statuses.includes(inquiry.status)) {
      return false;
    }

    return true;
  });
}

export function filterCartInquiries(cartInquiries: CartInquiry[], filters: Filters): CartInquiry[] {
  return cartInquiries.filter(inquiry => {
    // Date filter
    if (filters.startDate && filters.endDate) {
      const inquiryDate = parseISO(inquiry.created_at);
      const startDate = parseISO(filters.startDate);
      const endDate = parseISO(filters.endDate);
      
      if (!isWithinInterval(inquiryDate, { start: startDate, end: endDate })) {
        return false;
      }
    }

    // Category filter - cart inquiries are always category 'cart'
    if (filters.category && filters.category !== 'cart') {
      return false;
    }

    // Status filter
    if (filters.statuses.length > 0 && !filters.statuses.includes(inquiry.status)) {
      return false;
    }

    return true;
  });
}