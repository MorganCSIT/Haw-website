import { supabase } from '../supabase';
import type { CMSContent, CMSPage, CMSBlogPost } from '../../types/cms';

export async function getCMSContent<T extends CMSContent>(
  type: T['type'],
  slug?: string
): Promise<T | null> {
  try {
    let query = supabase
      .from('cms_content')
      .select('*')
      .eq('type', type)
      .eq('status', 'published');

    if (slug) {
      query = query.eq('slug', slug).single();
    }

    const { data, error } = await query;

    if (error) {
      if (error.code === 'PGRST116') {
        return null; // No content found
      }
      throw error;
    }

    return data as T;
  } catch (error) {
    console.error('Error fetching CMS content:', error);
    return null;
  }
}

export async function getCMSPages(): Promise<CMSPage[]> {
  try {
    const { data, error } = await supabase
      .from('cms_content')
      .select('*')
      .eq('type', 'page')
      .eq('status', 'published')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data as CMSPage[] || [];
  } catch (error) {
    console.error('Error fetching CMS pages:', error);
    return [];
  }
}

export async function getCMSBlogPosts(): Promise<CMSBlogPost[]> {
  try {
    const { data, error } = await supabase
      .from('cms_content')
      .select('*')
      .eq('type', 'blog')
      .eq('status', 'published')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data as CMSBlogPost[] || [];
  } catch (error) {
    console.error('Error fetching CMS blog posts:', error);
    return [];
  }
}

export async function createCMSContent(content: Omit<CMSContent, 'id' | 'created_at' | 'updated_at'>) {
  try {
    const { data, error } = await supabase
      .from('cms_content')
      .insert(content)
      .select()
      .single();

    if (error) throw error;
    return { success: true, data };
  } catch (error) {
    console.error('Error creating CMS content:', error);
    return { success: false, error };
  }
}

export async function updateCMSContent(id: string, updates: Partial<CMSContent>) {
  try {
    const { data, error } = await supabase
      .from('cms_content')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return { success: true, data };
  } catch (error) {
    console.error('Error updating CMS content:', error);
    return { success: false, error };
  }
}