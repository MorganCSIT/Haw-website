import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import AdminHeader from '../components/admin/AdminHeader';
import InquiryTable from '../components/admin/InquiryTable';
import InquiryDetails from '../components/admin/InquiryDetails';
import AdminStats from '../components/admin/AdminStats';
import InquiryFilters from '../components/admin/filters/InquiryFilters';
import SalesTips from '../components/admin/SalesTips';
import { filterInquiries } from '../utils/filterInquiries';
import type { AdminInquiry } from '../types/admin';

export default function AdminPage() {
  const [inquiries, setInquiries] = useState<AdminInquiry[]>([]);
  const [selectedInquiry, setSelectedInquiry] = useState<AdminInquiry | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showDetails, setShowDetails] = useState(false);
  const [filters, setFilters] = useState({
    startDate: '',
    endDate: '',
    category: '',
    statuses: [] as string[]
  });
  const navigate = useNavigate();

  const fetchInquiries = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('inquiries')
        .select(`
          *,
          property_inquiries (*),
          healthcare_inquiries (*),
          vacation_inquiries (*),
          insurance_inquiries (*),
          newsletter_subscriptions (*),
          contact_inquiries (*)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setInquiries(data || []);
      
      // Update selected inquiry if it exists
      if (selectedInquiry) {
        const updatedInquiry = data?.find(i => i.id === selectedInquiry.id);
        if (updatedInquiry) {
          setSelectedInquiry(updatedInquiry);
        }
      }
    } catch (error) {
      console.error('Error fetching inquiries:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate('/admin/login');
      }
    };
    checkAuth();
  }, [navigate]);

  useEffect(() => {
    fetchInquiries();
  }, []);

  const handleStatusUpdate = async (id: string, status: string) => {
    try {
      const { error } = await supabase
        .from('inquiries')
        .update({ status })
        .eq('id', id);

      if (error) throw error;
      await fetchInquiries();
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const handleFilterChange = (key: string, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleInquirySelect = (inquiry: AdminInquiry) => {
    setSelectedInquiry(inquiry);
    setShowDetails(true);
  };

  const handleNotesUpdate = async (id: string, notes: string) => {
    try {
      const { error } = await supabase
        .from('inquiries')
        .update({ notes })
        .eq('id', id);

      if (error) throw error;
      await fetchInquiries();
    } catch (error) {
      console.error('Error updating notes:', error);
    }
  };

  const filteredInquiries = filterInquiries(inquiries, filters);

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader />
      <div className="container mx-auto px-4 py-8">
        <AdminStats inquiries={filteredInquiries} />
        
        <div className="mt-8">
          <InquiryFilters 
            filters={filters}
            onFilterChange={handleFilterChange}
          />
        </div>

        <div className="mt-8 grid lg:grid-cols-3 gap-8">
          <div className={`${showDetails ? 'hidden lg:block' : ''} lg:col-span-2`}>
            <InquiryTable
              inquiries={filteredInquiries}
              isLoading={isLoading}
              onSelect={handleInquirySelect}
              onStatusUpdate={handleStatusUpdate}
            />
          </div>
          <div className={`${!showDetails ? 'hidden lg:block' : ''}`}>
            <div className="sticky top-4">
              <InquiryDetails
                inquiry={selectedInquiry}
                onClose={() => setShowDetails(false)}
                onNotesUpdate={handleNotesUpdate}
              />
              <div className="mt-8">
                <SalesTips />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}