import { useState } from 'react';
import Newsletter from '../components/home/Newsletter';
import { newsUpdates } from '../data/news';

export default function NewsletterPage() {
  return (
    <div className="pt-16">
      <section className="relative h-[40vh] min-h-[300px]">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1512075135822-67cdd9dd7314?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80")',
          }}
        >
          <div className="absolute inset-0 bg-black/40" />
        </div>
        
        <div className="relative h-full flex items-center">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl">
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
                Latest Updates
              </h1>
              <p className="text-xl text-white/90">
                Stay informed about our latest developments and community news.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="grid gap-8">
              {newsUpdates.map((update, index) => (
                <div key={index} className="bg-white rounded-xl overflow-hidden shadow-sm">
                  <div className="p-8">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm text-teal-600 font-medium">{update.date}</span>
                      <span className="px-3 py-1 bg-teal-50 text-teal-700 text-sm rounded-full">
                        {update.category}
                      </span>
                    </div>
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">{update.title}</h2>
                    <p className="text-gray-600 mb-6">{update.content}</p>
                    {update.link && (
                      <a 
                        href={update.link}
                        className="text-teal-600 hover:text-teal-700 font-medium"
                      >
                        Read more →
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Newsletter />
    </div>
  );
}