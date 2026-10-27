import { createContext, ReactNode, useContext, useState } from 'react';
import { INITIAL_REQUESTS, RequestStatus, ServiceRequest } from '@/data/requests';
import { TECHNICIANS } from '@/data/technicians';

export type NewRequestInput = Pick<
  ServiceRequest,
  'service' | 'description' | 'photos' | 'address' | 'date' | 'time' | 'technicianId'
>;

type RequestsValue = {
  requests: ServiceRequest[];
  getRequest: (id: string) => ServiceRequest | undefined;
  addRequest: (input: NewRequestInput, customerName: string) => string;
  cancelRequest: (id: string) => void;
  decideEstimate: (id: string, approve: boolean) => void;
  reportDispute: (id: string) => void;
  markReviewed: (id: string) => void;
  sendEstimate: (id: string, price: number, hours: number) => void;
  rejectRequest: (id: string, reason: string) => void;
  setStatus: (id: string, status: RequestStatus) => void;
};

const RequestsContext = createContext<RequestsValue | null>(null);

export function RequestsProvider({ children }: { children: ReactNode }) {
  const [requests, setRequests] = useState<ServiceRequest[]>(INITIAL_REQUESTS);

  // change some fields of one request without touching the others
  const update = (id: string, changes: Partial<ServiceRequest>) => {
    setRequests((current) => current.map((r) => (r.id === id ? { ...r, ...changes } : r)));
  };

  const getRequest = (id: string) => requests.find((r) => r.id === id);

  const addRequest = (input: NewRequestInput, customerName: string) => {
    const id = `n${Date.now()}`;
    const technician = TECHNICIANS.find((t) => t.id === input.technicianId);
    const created: ServiceRequest = {
      ...input,
      id,
      mine: true,
      status: 'pending',
      technicianName: technician ? technician.name : null,
      customerName,
      disputed: false,
      reviewed: false,
    };
    setRequests((current) => [created, ...current]);
    return id;
  };

  const cancelRequest = (id: string) => update(id, { status: 'cancelled' });

  const decideEstimate = (id: string, approve: boolean) => {
    const request = getRequest(id);
    if (!request || !request.estimate) return;
    update(id, {
      estimate: { ...request.estimate, decision: approve ? 'approved' : 'declined' },
      status: approve ? request.status : 'cancelled',
    });
  };

  const reportDispute = (id: string) => update(id, { disputed: true });
  const markReviewed = (id: string) => update(id, { reviewed: true });

  const sendEstimate = (id: string, price: number, hours: number) => {
    update(id, { estimate: { price, hours, decision: 'waiting' }, status: 'accepted' });
  };

  const rejectRequest = (id: string, reason: string) => {
    update(id, { status: 'cancelled', rejectedReason: reason });
  };

  const setStatus = (id: string, status: RequestStatus) => update(id, { status });

  return (
    <RequestsContext.Provider
      value={{ requests, getRequest, addRequest, cancelRequest, decideEstimate, reportDispute, markReviewed, sendEstimate, rejectRequest, setStatus }}>
      {children}
    </RequestsContext.Provider>
  );
}

export function useRequests() {
  const ctx = useContext(RequestsContext);
  if (!ctx) throw new Error('useRequests must be used inside RequestsProvider');
  return ctx;
}
