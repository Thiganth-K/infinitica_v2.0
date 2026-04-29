import React from 'react';
import InfiniteMenu from '../../../components/InfiniteMenu';

const items = [
  {
    image: 'https://images.unsplash.com/photo-1635350736475-c8cef4b21906?q=80&w=1000&auto=format&fit=crop',
    link: '#hiresapien',
    title: 'Hiresapien',
    description: 'AI Talent\nIntelligence'
  },
  {
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1000&auto=format&fit=crop',
    link: '#sentra',
    title: 'Sentra',
    description: 'Secure Data\nInfrastructure'
  },
  {
    image: 'https://images.unsplash.com/photo-1614850523296-d8c1af93d400?q=80&w=1000&auto=format&fit=crop',
    link: '#zippymind',
    title: 'Zippy\nMind',
    description: 'Neural Creative\nWorkflow'
  }
];

const Products = () => {
  return (
    <section className="products-section bg-infinitica-black text-infinitica-glow snap-start snap-always relative z-20 shadow-[0_-50px_100px_rgba(0,0,0,0.8)]" style={{ height: '100vh', width: '100%' }}>
      <InfiniteMenu items={items} scale={1.0} />
    </section>
  );
};

export default Products;
