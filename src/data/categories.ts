export type Category = {
  id: string;
  label: string;
  icon: string; // Ionicons name
};

export const CATEGORIES: Category[] = [
  { id: 'plumbing', label: 'Plumbing', icon: 'water-outline' },
  { id: 'electrical', label: 'Electrical', icon: 'flash-outline' },
  { id: 'painting', label: 'Painting', icon: 'color-palette-outline' },
  { id: 'carpentry', label: 'Carpentry', icon: 'hammer-outline' },
  { id: 'ac', label: 'Air conditioning', icon: 'snow-outline' },
  { id: 'appliance', label: 'Appliance repair', icon: 'construct-outline' },
  { id: 'cleaning', label: 'Cleaning', icon: 'sparkles-outline' },
];
