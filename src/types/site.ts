export type TagTone = "default" | "coral" | "sky";

export type ServiceCard = {
  imageSrc: string;
  imageAlt: string;
  tags: Array<{
    label: string;
    tone?: TagTone;
  }>;
  title: string;
  description: string;
  price: string;
  meta: string;
};

export type PriceRow = {
  item: string;
  includes: string;
  price: string;
};

export type InteriorSlide = {
  imageSrc: string;
  imageAlt: string;
  title: string;
  description: string;
  dotLabel: string;
};

export type CustomerReview = {
  name: string;
  pet: string;
  service: string;
  date: string;
  rating: string;
  quote: string;
  highlight: string;
};

export type SelectOption<T extends string = string> = {
  value: T;
  label: string;
};

export type PetType = "dog" | "cat";
export type PetSize = "small" | "medium" | "large";
export type ServiceType = "wash" | "style" | "soothe";
