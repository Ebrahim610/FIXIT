export type RequestStatus = 'pending' | 'accepted' | 'on_the_way' | 'in_progress' | 'completed' | 'cancelled';

export type Estimate = {
  price: number;
  hours: number;
  decision: 'waiting' | 'approved' | 'declined';
};

export type ServiceRequest = {
  id: string;
  mine: boolean; // true = created by the logged in customer
  service: string;
  description: string;
  photos: number;
  address: string;
  date: string;
  time: string;
  status: RequestStatus;
  technicianId: string | null;
  technicianName: string | null;
  customerName: string;
  estimate?: Estimate;
  disputed: boolean;
  reviewed: boolean;
  rejectedReason?: string;
};

export const INITIAL_REQUESTS: ServiceRequest[] = [
  { id: 'q1', mine: true, service: 'Plumbing', description: 'Kitchen sink pipe is leaking under the cabinet.', photos: 2, address: '12 Abbas El Akkad St, Nasr City', date: 'Tomorrow', time: '10:00 AM', status: 'accepted', technicianId: '1', technicianName: 'Mahmoud Hassan', customerName: 'Abdelrahman', estimate: { price: 350, hours: 2, decision: 'waiting' }, disputed: false, reviewed: false },
  { id: 'q2', mine: true, service: 'Electrical', description: 'Two sockets in the living room stopped working.', photos: 1, address: '5 Ahmed Fakhry St, Nasr City', date: 'Today', time: '4:00 PM', status: 'in_progress', technicianId: '2', technicianName: 'Karim Adel', customerName: 'Abdelrahman', estimate: { price: 280, hours: 1, decision: 'approved' }, disputed: false, reviewed: false },
  { id: 'q3', mine: true, service: 'Air conditioning', description: 'AC is not cooling and makes a noise.', photos: 3, address: 'Office 4, Tagamoa 5, New Cairo', date: 'Mon 12 Oct', time: '1:00 PM', status: 'completed', technicianId: '3', technicianName: 'Omar Fathy', customerName: 'Abdelrahman', estimate: { price: 450, hours: 2, decision: 'approved' }, disputed: false, reviewed: false },
  { id: 'q4', mine: true, service: 'Plumbing', description: 'Bathroom tap keeps dripping.', photos: 0, address: '12 Abbas El Akkad St, Nasr City', date: 'Wed 7 Oct', time: '9:00 AM', status: 'completed', technicianId: '1', technicianName: 'Mahmoud Hassan', customerName: 'Abdelrahman', estimate: { price: 150, hours: 1, decision: 'approved' }, disputed: false, reviewed: true },
  // requests from other customers, shown on the technician side
  { id: 't1', mine: false, service: 'Plumbing', description: 'Water heater is leaking from the bottom and the floor is wet.', photos: 2, address: '8 Mostafa El Nahas St, Nasr City', date: 'Today', time: '6:00 PM', status: 'pending', technicianId: '1', technicianName: 'Mahmoud Hassan', customerName: 'Laila Mostafa', disputed: false, reviewed: false },
  { id: 't2', mine: false, service: 'Plumbing', description: 'Blocked drain in the shop bathroom.', photos: 1, address: 'Shop 14, Makram Ebeid, Nasr City', date: 'Tomorrow', time: '11:00 AM', status: 'pending', technicianId: '1', technicianName: 'Mahmoud Hassan', customerName: 'Sherif Adly', disputed: false, reviewed: false },
  { id: 't3', mine: false, service: 'Plumbing', description: 'Install a new kitchen mixer tap.', photos: 0, address: '21 Tayaran St, Nasr City', date: 'Today', time: '1:00 PM', status: 'accepted', technicianId: '1', technicianName: 'Mahmoud Hassan', customerName: 'Rania Fouad', estimate: { price: 200, hours: 1, decision: 'approved' }, disputed: false, reviewed: false },
];
