import { Clock, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { BlogPost } from '../../data/blog';

interface BlogCardProps {
  post: BlogPost;
}

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <article className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <Link to={`/blog/${post.id}`}>
        <div 
          className="h-48 bg-cover bg-center"
          style={{ backgroundImage: `url(${post.image})` }}
        />
        <div className="p-6">
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.map((tag) => (
              <span 
                key={tag}
                className="px-3 py-1 bg-teal-50 text-teal-700 text-sm rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
          
          <h2 className="text-xl font-semibold text-gray-800 mb-3">
            {post.title}
          </h2>
          
          <p className="text-gray-600 mb-4">
            {post.excerpt}
          </p>
          
          <div className="flex items-center text-sm text-gray-500 space-x-4">
            <div className="flex items-center">
              <User className="h-4 w-4 mr-1" />
              {post.author}
            </div>
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              {post.readTime} min read
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
}