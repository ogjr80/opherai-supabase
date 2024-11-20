export interface AgencyBasicInfo {
    name: string;
    website?: string;
    description: string;
    logoUrl?: string;
    companySize: string;
    foundedYear: number;
  }
  
  export interface AgencyContactInfo {
    email: string;
    phone?: string;
    address: {
      street?: string;
      city: string;
      country: string;
      postalCode?: string;
    };
    socialLinks?: {
      linkedin?: string;
      twitter?: string;
      website?: string;
    };
  }
  
  export interface AgencySpecializations {
    industries: string[];
    roles: string[];
    experience: {
      years: number;
      placements: number;
    };
  }
  
  export interface AgencyServices {
    services: Array<{
      service_name: string;
      description?: string;
      pricing_model: string;
    }>;
  }