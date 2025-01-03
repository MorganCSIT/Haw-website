import { Clock, User, ArrowLeft } from 'lucide-react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { blogPosts } from '../../data/blog';
import Newsletter from '../home/Newsletter';

export default function BlogPost() {
  const { id } = useParams();
  const post = blogPosts.find(p => p.id === id);

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  return (
    <div className="pt-20">
      <article className="max-w-4xl mx-auto px-6 py-12">
        <Link 
          to="/blog"
          className="inline-flex items-center text-teal-600 hover:text-teal-700 mb-8"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Blog
        </Link>

        <div 
          className="h-[400px] bg-cover bg-center rounded-xl mb-8"
          style={{ backgroundImage: `url(${post.image})` }}
        />

        <div className="flex flex-wrap gap-2 mb-6">
          {post.tags.map((tag) => (
            <span 
              key={tag}
              className="px-3 py-1 bg-teal-50 text-teal-700 text-sm rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>

        <h1 className="text-4xl font-bold text-gray-800 mb-6">
          {post.title}
        </h1>

        <div className="flex items-center text-sm text-gray-500 space-x-4 mb-8">
          <div className="flex items-center">
            <User className="h-4 w-4 mr-1" />
            {post.author}
          </div>
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-1" />
            {post.readTime} min read
          </div>
        </div>

        <div className="prose prose-lg max-w-none">
          {post.content}
        </div>
      </article>

      <div className="bg-gray-50 py-20">
        <Newsletter />
      </div>
    </div>
  );
}