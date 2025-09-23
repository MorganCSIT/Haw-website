import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import type { CMSContent, CMSPage, CMSBlogPost } from '../types/cms';

export function useCMSContent<T extends CMSContent>(
  type: T['type'],
  slug?: string
) {
  const [content, setContent] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        let query = supabase
          .from('cms_content')
          .select('*')
          .eq('type', type)
          .eq('status', 'published');

        if (slug) {
          query = query.eq('slug', slug);
        }

        const { data, error } = await query;

        if (error) throw error;

        if (slug) {
          setContent(data?.[0] as T || null);
        } else {
          setContent(data as T || null);
        }
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, [type, slug]);

  return { content, loading, error };
}

export function useCMSPages() {
  return useCMSContent<CMSPage>('page');
}

export function useCMSBlogPosts() {
  return useCMSContent<CMSBlogPost>('blog');
}