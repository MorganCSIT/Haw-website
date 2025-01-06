import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { deleteInquiry, deleteCartInquiry } from '../lib/api/admin';
import InquiryTable from '../components/admin/InquiryTable';
import InquiryDetails from '../components/admin/InquiryDetails';
import CartInquiryDetails from '../components/admin/CartInquiryDetails';
import AdminStats from '../components/admin/AdminStats';
import InquiryFilters from '../components/admin/filters/InquiryFilters';
import SalesTips from '../components/admin/SalesTips';
import { filterInquiries, filterCartInquiries } from '../utils/filterInquiries';
import type { AdminInquiry, CartInquiry } from '../types/admin';

export default function AdminPage() {
  const [inquiries, setInquiries] = useState<AdminInquiry[]>([]);
  const [cartInquiries, setCartInquiries] = useState<CartInquiry[]>([]);
  const [selectedInquiry, setSelectedInquiry] = useState<AdminInquiry | CartInquiry | null>(null);
  const [selectedInquiryType, setSelectedInquiryType] = useState<'general' | 'cart'>('general');
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
    try {
      // Fetch general inquiries
      const { data: generalData, error: generalError } = await supabase
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

      if (generalError) throw generalError;
      setInquiries(generalData || []);

      // Fetch cart inquiries with user emails
      const { data: cartData, error: cartError } = await supabase
        .from('cart_inquiries_with_users')
        .select(`
          *,
          items:cart_inquiry_items(*)
        `)
        .order('created_at', { ascending: false });

      if (cartError) throw cartError;
      setCartInquiries(cartData || []);
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
        return;
      }

      // Verify admin access
      if (session.user.email !== 'morgankieffer@gmail.com') {
        navigate('/');
        return;
      }
    };
    checkAuth();
  }, [navigate]);

  useEffect(() => {
    fetchInquiries();
  }, []);

  const handleStatusUpdate = async (id: string, status: string, type: 'general' | 'cart') => {
    try {
      const table = type === 'general' ? 'inquiries' : 'cart_inquiries';
      const { error } = await supabase
        .from(table)
        .update({ status })
        .eq('id', id);

      if (error) throw error;
      await fetchInquiries();
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const handleDelete = async (id: string, type: 'general' | 'cart') => {
    try {
      const result = type === 'general' 
        ? await deleteInquiry(id)
        : await deleteCartInquiry(id);

      if (!result.success) throw result.error;
      await fetchInquiries();
      
      // If the deleted inquiry was selected, clear the selection
      if (selectedInquiry && selectedInquiry.id === id) {
        setSelectedInquiry(null);
        setShowDetails(false);
      }
    } catch (error) {
      console.error('Error deleting inquiry:', error);
    }
  };

  const handleFilterChange = (key: string, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleInquirySelect = (inquiry: AdminInquiry | CartInquiry, type: 'general' | 'cart') => {
    setSelectedInquiry(inquiry);
    setSelectedInquiryType(type);
    setShowDetails(true);
  };

  const filteredGeneralInquiries = filterInquiries(inquiries, filters);
  const filteredCartInquiries = filterCartInquiries(cartInquiries, filters);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
          <button
            onClick={() => {
              supabase.auth.signOut();
              navigate('/admin/login');
            }}
            className="px-4 py-2 text-sm text-red-600 hover:text-red-700 font-medium"
          >
            Sign Out
          </button>
        </div>

        <AdminStats inquiries={[...filteredGeneralInquiries, ...filteredCartInquiries]} />
        
        <div className="mt-8">
          <InquiryFilters 
            filters={filters}
            onFilterChange={handleFilterChange}
          />
        </div>

        <div className="mt-8 grid lg:grid-cols-3 gap-8">
          <div className={`${showDetails ? 'hidden lg:block' : ''} lg:col-span-2`}>
            <InquiryTable
              inquiries={filteredGeneralInquiries}
              cartInquiries={filteredCartInquiries}
              isLoading={isLoading}
              onSelect={handleInquirySelect}
              onStatusUpdate={handleStatusUpdate}
              onDelete={handleDelete}
            />
          </div>
          <div className={`${!showDetails ? 'hidden lg:block' : ''}`}>
            <div className="sticky top-4">
              {selectedInquiryType === 'general' ? (
                <InquiryDetails
                  inquiry={selectedInquiry as AdminInquiry}
                  onClose={() => setShowDetails(false)}
                  onNotesUpdate={async () => {}}
                />
              ) : (
                <CartInquiryDetails
                  inquiry={selectedInquiry as CartInquiry}
                  onClose={() => setShowDetails(false)}
                />
              )}
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