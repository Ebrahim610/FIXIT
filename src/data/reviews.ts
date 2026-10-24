export type Review = {
  id: string;
  technicianId: string;
  author: string;
  rating: number;
  comment: string;
  reply?: string;
};

export const REVIEWS: Review[] = [
  { id: 'r1', technicianId: '1', author: 'Nour A.', rating: 5, comment: 'Fixed the leak in 30 minutes and cleaned up after. Price matched the estimate.', reply: 'Thank you Nour, happy to help!' },
  { id: 'r2', technicianId: '1', author: 'Tarek M.', rating: 4, comment: 'Good work, arrived a little late but called ahead.' },
  { id: 'r3', technicianId: '1', author: 'Mona S.', rating: 5, comment: 'Very professional and explained what went wrong.' },
  { id: 'r4', technicianId: '2', author: 'Ahmed K.', rating: 5, comment: 'Found the fault in our shop wiring quickly.' },
  { id: 'r5', technicianId: '3', author: 'Dina R.', rating: 5, comment: 'AC works like new after the service.' },
];
