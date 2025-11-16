import { Product } from '../types';

export const mockProducts: Product[] = [
  {
    id: '1',
    title: 'Dell XPS 13 Laptop - Intel Core i7, 16GB RAM, 512GB SSD',
    image: 'https://images.pexels.com/photos/7974/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=400',
    category: 'computers',
    brand: 'Dell',
    price: 1299.99,
    pricePerUnit: '$81.25/month (16 months)',
    rating: 4.5,
    reviewCount: 2847,
    specs: {
      processor: 'Intel Core i7',
      ram: '16GB',
      storage: '512GB SSD',
      screen: '13.3"'
    },
    amazonUrl: '#'
  },
  {
    id: '2',
    title: 'HP Pavilion Desktop - AMD Ryzen 5, 12GB RAM, 256GB SSD + 1TB HDD',
    image: 'https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'computers',
    brand: 'HP',
    price: 749.99,
    pricePerUnit: '$46.87/month (16 months)',
    rating: 4.3,
    reviewCount: 1523,
    specs: {
      processor: 'AMD Ryzen 5',
      ram: '12GB',
      storage: '256GB SSD + 1TB HDD',
      type: 'Desktop'
    },
    amazonUrl: '#'
  },
  {
    id: '3',
    title: 'Apple MacBook Air M2 - 8GB RAM, 256GB SSD, 13.6" Display',
    image: 'https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=400',
    category: 'computers',
    brand: 'Apple',
    price: 1149.00,
    pricePerUnit: '$71.81/month (16 months)',
    rating: 4.8,
    reviewCount: 4521,
    specs: {
      processor: 'Apple M2',
      ram: '8GB',
      storage: '256GB SSD',
      screen: '13.6"'
    },
    amazonUrl: '#'
  },
  {
    id: '4',
    title: 'Lenovo ThinkCentre Mini PC - Intel i5, 8GB RAM, 256GB SSD',
    image: 'https://images.pexels.com/photos/2588757/pexels-photo-2588757.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'computers',
    brand: 'Lenovo',
    price: 549.99,
    pricePerUnit: '$34.37/month (16 months)',
    rating: 4.4,
    reviewCount: 987,
    specs: {
      processor: 'Intel Core i5',
      ram: '8GB',
      storage: '256GB SSD',
      type: 'Mini PC'
    },
    amazonUrl: '#'
  },
  {
    id: '5',
    title: 'Pampers Swaddlers Diapers Size 1 (198 Count) - Newborn',
    image: 'https://images.pexels.com/photos/6973051/pexels-photo-6973051.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'baby',
    brand: 'Pampers',
    price: 47.99,
    pricePerUnit: '$0.24/diaper',
    rating: 4.7,
    reviewCount: 15482,
    specs: {
      size: 'Size 1',
      count: '198',
      ageRange: 'Newborn (8-14 lbs)'
    },
    amazonUrl: '#'
  },
  {
    id: '6',
    title: 'Huggies Little Snugglers Diapers Size 2 (140 Count)',
    image: 'https://images.pexels.com/photos/6958549/pexels-photo-6958549.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'baby',
    brand: 'Huggies',
    price: 42.99,
    pricePerUnit: '$0.31/diaper',
    rating: 4.6,
    reviewCount: 12304,
    specs: {
      size: 'Size 2',
      count: '140',
      ageRange: '2-4 months (12-18 lbs)'
    },
    amazonUrl: '#'
  },
  {
    id: '7',
    title: 'Graco Pack n Play Playard with Bassinet - Portable Baby Playpen',
    image: 'https://images.pexels.com/photos/8363055/pexels-photo-8363055.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'baby',
    brand: 'Graco',
    price: 129.99,
    rating: 4.5,
    reviewCount: 8947,
    specs: {
      type: 'Playard',
      features: 'Bassinet included',
      ageRange: '0-3 years'
    },
    amazonUrl: '#'
  },
  {
    id: '8',
    title: 'Canon EOS R50 Mirrorless Camera with 18-45mm Lens',
    image: 'https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'cameras',
    brand: 'Canon',
    price: 799.00,
    pricePerUnit: '$49.94/month (16 months)',
    rating: 4.7,
    reviewCount: 3421,
    specs: {
      megapixels: '24.2MP',
      sensor: 'APS-C',
      video: '4K 30fps',
      lens: '18-45mm'
    },
    amazonUrl: '#'
  },
  {
    id: '9',
    title: 'Sony Alpha a6400 Mirrorless Camera Body Only',
    image: 'https://images.pexels.com/photos/51383/photo-camera-subject-photographer-51383.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'cameras',
    brand: 'Sony',
    price: 898.00,
    pricePerUnit: '$56.13/month (16 months)',
    rating: 4.6,
    reviewCount: 5632,
    specs: {
      megapixels: '24.2MP',
      sensor: 'APS-C',
      video: '4K 30fps',
      lens: 'Body only'
    },
    amazonUrl: '#'
  },
  {
    id: '10',
    title: 'Infant Optics DXR-8 PRO Video Baby Monitor with 5" Screen',
    image: 'https://images.pexels.com/photos/4297421/pexels-photo-4297421.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'cameras',
    brand: 'Infant Optics',
    price: 199.99,
    rating: 4.4,
    reviewCount: 9845,
    specs: {
      screenSize: '5"',
      features: 'Night vision, Two-way audio',
      range: '700ft',
      type: 'Baby Monitor'
    },
    amazonUrl: '#'
  },
  {
    id: '11',
    title: 'ASUS VivoBook 15 - Intel Core i5, 8GB RAM, 512GB SSD',
    image: 'https://images.pexels.com/photos/18104/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=400',
    category: 'computers',
    brand: 'ASUS',
    price: 649.99,
    pricePerUnit: '$40.62/month (16 months)',
    rating: 4.2,
    reviewCount: 2145,
    specs: {
      processor: 'Intel Core i5',
      ram: '8GB',
      storage: '512GB SSD',
      screen: '15.6"'
    },
    amazonUrl: '#'
  },
  {
    id: '12',
    title: 'Nanit Pro Baby Monitor Camera with Floor Stand',
    image: 'https://images.pexels.com/photos/7948019/pexels-photo-7948019.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'cameras',
    brand: 'Nanit',
    price: 349.99,
    rating: 4.5,
    reviewCount: 4521,
    specs: {
      resolution: '1080p HD',
      features: 'Sleep tracking, Two-way audio',
      type: 'Baby Monitor',
      connectivity: 'WiFi'
    },
    amazonUrl: '#'
  }
];
