export type Technician = {
  id: string;
  name: string;
  services: string[];
  rating: number;
  reviews: number;
  priceFrom: number; // EGP
  distanceKm: number;
  available: boolean;
  verified: boolean; // approved by an admin (prototype only)
  experienceYears: number;
  jobsDone: number;
  area: string;
  about: string;
};

// The technician account used when you log in as "Technician".
export const DEMO_TECHNICIAN_ID = '1';

export const TECHNICIANS: Technician[] = [
  { id: '1', name: 'Mahmoud Hassan', services: ['Plumbing', 'Appliance repair'], rating: 4.8, reviews: 126, priceFrom: 150, distanceKm: 1.2, available: true, verified: true, experienceYears: 9, jobsDone: 412, area: 'Nasr City', about: 'Licensed plumber covering leaks, blocked drains, water heaters and full bathroom fitting. Clean work and clear prices before I start.' },
  { id: '2', name: 'Karim Adel', services: ['Electrical'], rating: 4.6, reviews: 89, priceFrom: 200, distanceKm: 2.5, available: true, verified: true, experienceYears: 6, jobsDone: 233, area: 'Heliopolis', about: 'Home and shop wiring, fuse boards, lighting and fault finding. Same-day visits for urgent faults.' },
  { id: '3', name: 'Omar Fathy', services: ['Air conditioning', 'Appliance repair'], rating: 4.9, reviews: 203, priceFrom: 300, distanceKm: 3.1, available: false, verified: true, experienceYears: 12, jobsDone: 689, area: 'New Cairo', about: 'Installation, gas refill and servicing for split and central units, for homes and offices.' },
  { id: '4', name: 'Youssef Nabil', services: ['Carpentry', 'Painting'], rating: 4.4, reviews: 41, priceFrom: 180, distanceKm: 4.0, available: true, verified: false, experienceYears: 4, jobsDone: 77, area: 'Maadi', about: 'Furniture assembly, door and cabinet repair, custom shelves and light painting jobs.' },
  { id: '5', name: 'Salma Reda', services: ['Cleaning'], rating: 4.7, reviews: 158, priceFrom: 250, distanceKm: 2.0, available: true, verified: true, experienceYears: 5, jobsDone: 301, area: 'Nasr City', about: 'Deep cleaning for apartments, shops and offices with a small trained team.' },
  { id: '6', name: 'Hany Samir', services: ['Painting'], rating: 4.5, reviews: 64, priceFrom: 400, distanceKm: 5.2, available: true, verified: true, experienceYears: 10, jobsDone: 190, area: 'Heliopolis', about: 'Interior and exterior painting, wall repair and finishing. Free measuring visit.' },
];
