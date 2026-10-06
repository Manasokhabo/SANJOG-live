import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  Product, 
  GalleryItem, 
  Metric, 
  SANJOG_PRODUCTS as defaultProducts, 
  SANJOG_GALLERY as defaultGallery, 
  SANJOG_METRICS as defaultMetrics,
  COMPANY_DOSSIER as defaultDossier
} from '../data/companyData';

export interface HeroSlide {
  id: string;
  badge: string;
  title: string;
  highlightText: string;
  subtitle: string;
  image: string;
  primaryBtnText: string;
  primaryBtnAction: 'products' | 'contact' | 'gallery';
  secondaryBtnText: string;
  specLabel1?: string;
  specValue1?: string;
  specLabel2?: string;
  specValue2?: string;
}

export interface NewsItem {
  id: string;
  tag: string;
  title: string;
  date: string;
  linkText?: string;
}

export interface InquiryItem {
  id: string;
  ticketId: string;
  name: string;
  phone: string;
  email: string;
  company: string;
  product: string;
  cityState: string;
  quantity: string;
  message: string;
  date: string;
  status: 'New' | 'In Progress' | 'Quoted' | 'Completed';
}

export interface CompanyInfo {
  companyName: string;
  tagline: string;
  phone: string;
  salesPhone: string;
  inquiryEmail: string;
  supportEmail: string;
  headquarters: string;
  worksAddress: string;
  regionalOffices: string;
  registrationNo: string;
  metricBarriers: string;
  metricHighMasts: string;
  metricClients: string;
  metricStandards: string;
  mapEmbedUrl: string;
  googleMapQuery: string;
}

export interface FounderDeskData {
  name: string;
  designation: string;
  badge: string;
  image: string;
  quoteTitle: string;
  paragraph1: string;
  paragraph2: string;
  signatureName: string;
  experienceYears: string;
  keyMotto: string;
}

export interface MapHub {
  id: string;
  name: string;
  state: string;
  type: 'Factory & Galvanizing' | 'Corporate Office' | 'Supply Depot' | 'Major Corridor';
  coordinates: { x: number; y: number };
  capacity: string;
  contact: string;
  description: string;
}

interface CmsContextType {
  // Data
  heroSlides: HeroSlide[];
  newsItems: NewsItem[];
  products: Product[];
  gallery: GalleryItem[];
  companyInfo: CompanyInfo;
  founderDesk: FounderDeskData;
  mapHubs: MapHub[];
  inquiries: InquiryItem[];

  // Website Icon & Catalogue PDF
  websiteIcon: string;
  updateWebsiteIcon: (iconUrl: string) => void;
  cataloguePdfUrl: string | null;
  cataloguePdfName: string;
  uploadCataloguePdf: (pdfDataUrl: string, name: string) => void;
  removeCataloguePdf: () => void;
  downloadCatalogue: () => void;

  // Auth State
  isAdminAuthenticated: boolean;
  loginAdmin: (id: string, pass: string) => boolean;
  logoutAdmin: () => void;
  updateAdminPassword: (newPass: string) => void;

  // Mutations
  updateHeroSlide: (slide: HeroSlide) => void;
  addHeroSlide: (slide: Omit<HeroSlide, 'id'>) => void;
  deleteHeroSlide: (id: string) => void;

  updateNewsItem: (item: NewsItem) => void;
  addNewsItem: (item: Omit<NewsItem, 'id'>) => void;
  deleteNewsItem: (id: string) => void;

  updateProduct: (product: Product) => void;
  addProduct: (product: Product) => void;
  deleteProduct: (id: string) => void;

  updateGalleryItem: (item: GalleryItem) => void;
  addGalleryItem: (item: GalleryItem) => void;
  deleteGalleryItem: (id: string) => void;

  updateCompanyInfo: (info: CompanyInfo) => void;
  updateFounderDesk: (data: FounderDeskData) => void;
  updateMapHub: (hub: MapHub) => void;
  addMapHub: (hub: MapHub) => void;
  deleteMapHub: (id: string) => void;

  addInquiry: (inquiry: Omit<InquiryItem, 'id' | 'ticketId' | 'date' | 'status'>) => string;
  updateInquiryStatus: (id: string, status: InquiryItem['status']) => void;
  deleteInquiry: (id: string) => void;

  resetToDefaults: () => void;
}

const DEFAULT_HERO_SLIDES: HeroSlide[] = [
  {
    id: 'slide-1',
    badge: 'MoRTH Section 811 & AASHTO M180 Certified',
    title: 'Highway Crash Barriers & Road Safety Systems',
    highlightText: 'Built for Maximum Containment',
    subtitle: 'Direct manufacturing of hot-dip galvanized W-Beam and Thrie-Beam crash barriers with ≥ 550 g/m² zinc coating for national expressways and flyovers.',
    image: '/src/assets/images/sanjog_crash_barrier_1791292174622.jpg',
    primaryBtnText: 'View Crash Barrier Catalog',
    primaryBtnAction: 'products',
    secondaryBtnText: 'Request Factory Pricing'
  },
  {
    id: 'slide-2',
    badge: 'Heavy-Duty 12m to 35m Tapered Polygonal Poles',
    title: 'High Mast Lighting Octagonal Towers',
    highlightText: 'With Motorized Winch System',
    subtitle: 'Continuously tapered octagonal high mast lighting poles engineered for wind speeds up to 180 km/h, illuminating expressway toll plazas, junctions, and railway yards.',
    image: '/src/assets/images/sanjog_highmast_lighting_1791292229696.jpg',
    primaryBtnText: 'Explore Lighting Towers',
    primaryBtnAction: 'products',
    secondaryBtnText: 'Get Mast Quotation'
  },
  {
    id: 'slide-3',
    badge: 'High-Penetration Quarry & Mining Tooling',
    title: 'Mining Drill Rods & Rock Drill Machines',
    highlightText: 'Induction Carburized Alloy Steel',
    subtitle: 'Tungsten carbide tipped (TCT) chisel drill rods, hollow alloy mining steels, and pneumatic sinker rock drills designed for rapid blast hole penetration in hard granite.',
    image: '/src/assets/images/sanjog_drilling_mining_1791292188310.jpg',
    primaryBtnText: 'View Mining Products',
    primaryBtnAction: 'products',
    secondaryBtnText: 'Enquire Bulk Rates'
  },
  {
    id: 'slide-4',
    badge: 'Infrastructure Civil Machinery & Safety Delineation',
    title: 'Concrete Mixers, Road Marking & Fencing',
    highlightText: 'Ready Stock for Urgent Site Dispatch',
    subtitle: '10/7 CFT hydraulic batch concrete mixers, flexible needle poker vibrators, solar LED road studs, reflective thermoplastic paint, and heavy perimeter chainlink fencing.',
    image: '/src/assets/images/sanjog_gallery_factory_1791292902900.jpg',
    primaryBtnText: 'See All 16 Products',
    primaryBtnAction: 'products',
    secondaryBtnText: 'Download Full Catalog'
  }
];

const DEFAULT_NEWS_ITEMS: NewsItem[] = [
  {
    id: 'news-1',
    tag: 'TENDER DISPATCH',
    title: 'Over 85 Kilometers of W-Beam Crash Barriers successfully dispatched for National Highway NH-16 Package',
    date: 'Oct 2026'
  },
  {
    id: 'news-2',
    tag: 'PRODUCTION UPDATE',
    title: 'Second 14-Meter Structural Hot-Dip Galvanizing Bath operational at West Bengal Works (≥ 550 g/m² certified)',
    date: 'Oct 2026'
  },
  {
    id: 'news-3',
    tag: 'READY INVENTORY',
    title: 'Immediate stock available: 30m High Mast Lighting Towers, Solar Road Studs (ADC12), and TCT Mining Drill Rods',
    date: 'Oct 2026'
  },
  {
    id: 'news-4',
    tag: 'QUALITY AUDIT',
    title: 'All current batches certified compliant with MoRTH Section 811 & 803 and IS 2062 by accredited NABL testing facility',
    date: 'Oct 2026'
  }
];

const DEFAULT_COMPANY_INFO: CompanyInfo = {
  companyName: defaultDossier.companyName,
  tagline: defaultDossier.tagline,
  phone: '+91 98300-12345 / +91 (033) 2450-8900',
  salesPhone: '+91 98300-12345 (Direct WhatsApp / Calls)',
  inquiryEmail: defaultDossier.inquiryEmail,
  supportEmail: defaultDossier.supportEmail,
  headquarters: 'Sector V, Salt Lake, Kolkata, West Bengal - 700091',
  worksAddress: 'Fabrication & Galvanizing Works, Industrial Growth Centre, West Bengal',
  regionalOffices: 'Kolkata, Bhubaneswar, Ranchi & Central Stock Depots',
  registrationNo: defaultDossier.registrationNo,
  metricBarriers: '1,200+ km',
  metricHighMasts: '3,800+',
  metricClients: '450+',
  metricStandards: '100% MoRTH & IS',
  mapEmbedUrl: 'https://maps.google.com/maps?q=Sector+V+Salt+Lake+Kolkata+West+Bengal+India&t=&z=13&ie=UTF8&iwloc=&output=embed',
  googleMapQuery: 'Sanjog Infrastructure Works West Bengal India'
};

const DEFAULT_FOUNDER_DESK: FounderDeskData = {
  name: 'Suman Sen',
  designation: 'Managing Director & Founder',
  badge: "Message from Founder's Desk",
  image: '/src/assets/images/sanjog_founder_portrait_1791294725163.jpg',
  quoteTitle: '“Every kilometer of highway crash barrier we manufacture represents human lives protected and India\'s infrastructure advancing forward.”',
  paragraph1: 'When we laid the foundation of Sanjog in 2021, India was entering an unprecedented golden era of expressway, bridge, and high-speed corridor construction under national vision programs like Bharatmala. However, contractors routinely grappled with supply delays, sub-standard zinc coating, and erratic quality from fragmented vendors.',
  paragraph2: 'We established Sanjog to eliminate those compromises. By investing in our own modern continuous roll-forming mills, dedicated 14-meter hot-dip galvanizing baths, and strict NABL testing protocols, we ensure that every single W-Beam, octagonal mast, drill rod, and concrete machine leaving our factory meets the highest MoRTH, IS, and AASHTO benchmarks with complete transparency. We treat every client\'s project schedule with the same urgency as our own.',
  signatureName: 'Suman Sen',
  experienceYears: '18+ Years',
  keyMotto: 'Uncompromising Quality & Pan-India On-Time Site Delivery'
};

const DEFAULT_MAP_HUBS: MapHub[] = [
  {
    id: 'hub-1',
    name: 'Sanjog Primary Fabrication Works & Galvanizing Facility',
    state: 'West Bengal',
    type: 'Factory & Galvanizing',
    coordinates: { x: 74, y: 52 },
    capacity: '3,500 MT / Month Continuous Roll Forming, 14m Zinc Bath',
    contact: '+91 (033) 2450-8900',
    description: 'Main manufacturing facility for W-Beam & Thrie-Beam crash barriers, octagonal high mast lighting poles, and hot-dip galvanizing.'
  },
  {
    id: 'hub-2',
    name: 'Kolkata Corporate & Sales Headquarters',
    state: 'West Bengal',
    type: 'Corporate Office',
    coordinates: { x: 76, y: 54 },
    capacity: 'Tender Execution, Project Engineering, Client Billing',
    contact: '+91 98300-12345',
    description: 'Central commercial office handling NHAI contracts, state PWD tenders, and nationwide contractor liaison.'
  }
];

const CmsContext = createContext<CmsContextType | undefined>(undefined);

export const CmsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Auth state
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem('sanjog_cms_auth') === 'true';
    } catch {
      return false;
    }
  });

  const [adminCredentials, setAdminCredentials] = useState<{ id: string; pass: string }>(() => {
    try {
      const saved = localStorage.getItem('sanjog_cms_credentials');
      return saved ? JSON.parse(saved) : { id: 'admin', pass: 'sanjog@2026' };
    } catch {
      return { id: 'admin', pass: 'sanjog@2026' };
    }
  });

  const loginAdmin = (id: string, pass: string): boolean => {
    if (id.trim() === adminCredentials.id && pass === adminCredentials.pass) {
      setIsAdminAuthenticated(true);
      try {
        sessionStorage.setItem('sanjog_cms_auth', 'true');
      } catch {}
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    setIsAdminAuthenticated(false);
    try {
      sessionStorage.removeItem('sanjog_cms_auth');
    } catch {}
  };

  const updateAdminPassword = (newPass: string) => {
    const updated = { ...adminCredentials, pass: newPass };
    setAdminCredentials(updated);
    localStorage.setItem('sanjog_cms_credentials', JSON.stringify(updated));
  };

  // Website Icon / Favicon
  const [websiteIcon, setWebsiteIcon] = useState<string>(() => {
    try {
      const saved = localStorage.getItem('sanjog_website_icon');
      return saved || '/src/assets/images/sanjog_logo_3d_1791291627051.jpg';
    } catch {
      return '/src/assets/images/sanjog_logo_3d_1791291627051.jpg';
    }
  });

  const updateWebsiteIcon = (iconUrl: string) => {
    setWebsiteIcon(iconUrl);
    try {
      localStorage.setItem('sanjog_website_icon', iconUrl);
    } catch {}
  };

  // Dynamically update favicon in document head
  useEffect(() => {
    if (websiteIcon) {
      let link: HTMLLinkElement | null = document.querySelector("link[rel*='icon']");
      if (!link) {
        link = document.createElement('link');
        link.type = 'image/x-icon';
        link.rel = 'shortcut icon';
        document.getElementsByTagName('head')[0].appendChild(link);
      }
      link.href = websiteIcon;
    }
  }, [websiteIcon]);

  // Catalogue PDF
  const [cataloguePdfUrl, setCataloguePdfUrl] = useState<string | null>(() => {
    try {
      return localStorage.getItem('sanjog_catalogue_pdf');
    } catch {
      return null;
    }
  });

  const [cataloguePdfName, setCataloguePdfName] = useState<string>(() => {
    try {
      return localStorage.getItem('sanjog_catalogue_pdf_name') || 'Sanjog_Product_Catalog.pdf';
    } catch {
      return 'Sanjog_Product_Catalog.pdf';
    }
  });

  const uploadCataloguePdf = (pdfDataUrl: string, name: string) => {
    setCataloguePdfUrl(pdfDataUrl);
    setCataloguePdfName(name);
    try {
      localStorage.setItem('sanjog_catalogue_pdf', pdfDataUrl);
      localStorage.setItem('sanjog_catalogue_pdf_name', name);
    } catch {}
  };

  const removeCataloguePdf = () => {
    setCataloguePdfUrl(null);
    setCataloguePdfName('Sanjog_Product_Catalog.pdf');
    try {
      localStorage.removeItem('sanjog_catalogue_pdf');
      localStorage.removeItem('sanjog_catalogue_pdf_name');
    } catch {}
  };

  const downloadCatalogue = () => {
    if (cataloguePdfUrl) {
      // Trigger download of custom uploaded PDF
      const link = document.createElement('a');
      link.href = cataloguePdfUrl;
      link.download = cataloguePdfName || 'Sanjog_Product_Catalog.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      // Fallback: create printable window / HTML catalog
      window.print();
    }
  };

  // Hero slides
  const [heroSlides, setHeroSlides] = useState<HeroSlide[]>(() => {
    try {
      const saved = localStorage.getItem('sanjog_cms_hero_slides');
      return saved ? JSON.parse(saved) : DEFAULT_HERO_SLIDES;
    } catch {
      return DEFAULT_HERO_SLIDES;
    }
  });

  // News ticker items
  const [newsItems, setNewsItems] = useState<NewsItem[]>(() => {
    try {
      const saved = localStorage.getItem('sanjog_cms_news');
      return saved ? JSON.parse(saved) : DEFAULT_NEWS_ITEMS;
    } catch {
      return DEFAULT_NEWS_ITEMS;
    }
  });

  // Products
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('sanjog_cms_products');
      return saved ? JSON.parse(saved) : defaultProducts;
    } catch {
      return defaultProducts;
    }
  });

  // Gallery
  const [gallery, setGallery] = useState<GalleryItem[]>(() => {
    try {
      const saved = localStorage.getItem('sanjog_cms_gallery');
      return saved ? JSON.parse(saved) : defaultGallery;
    } catch {
      return defaultGallery;
    }
  });

  // Company info
  const [companyInfo, setCompanyInfo] = useState<CompanyInfo>(() => {
    try {
      const saved = localStorage.getItem('sanjog_cms_company');
      return saved ? JSON.parse(saved) : DEFAULT_COMPANY_INFO;
    } catch {
      return DEFAULT_COMPANY_INFO;
    }
  });

  // Founder's desk data
  const [founderDesk, setFounderDesk] = useState<FounderDeskData>(() => {
    try {
      const saved = localStorage.getItem('sanjog_cms_founder');
      return saved ? JSON.parse(saved) : DEFAULT_FOUNDER_DESK;
    } catch {
      return DEFAULT_FOUNDER_DESK;
    }
  });

  // Interactive map hubs
  const [mapHubs, setMapHubs] = useState<MapHub[]>(() => {
    try {
      const saved = localStorage.getItem('sanjog_cms_map_hubs');
      return saved ? JSON.parse(saved) : DEFAULT_MAP_HUBS;
    } catch {
      return DEFAULT_MAP_HUBS;
    }
  });

  // Inquiries / Leads
  const [inquiries, setInquiries] = useState<InquiryItem[]>(() => {
    try {
      const saved = localStorage.getItem('sanjog_cms_inquiries');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('sanjog_cms_hero_slides', JSON.stringify(heroSlides));
  }, [heroSlides]);

  useEffect(() => {
    localStorage.setItem('sanjog_cms_news', JSON.stringify(newsItems));
  }, [newsItems]);

  useEffect(() => {
    localStorage.setItem('sanjog_cms_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('sanjog_cms_gallery', JSON.stringify(gallery));
  }, [gallery]);

  useEffect(() => {
    localStorage.setItem('sanjog_cms_company', JSON.stringify(companyInfo));
  }, [companyInfo]);

  useEffect(() => {
    localStorage.setItem('sanjog_cms_founder', JSON.stringify(founderDesk));
  }, [founderDesk]);

  useEffect(() => {
    localStorage.setItem('sanjog_cms_map_hubs', JSON.stringify(mapHubs));
  }, [mapHubs]);

  useEffect(() => {
    localStorage.setItem('sanjog_cms_inquiries', JSON.stringify(inquiries));
  }, [inquiries]);

  // Mutations
  const updateHeroSlide = (slide: HeroSlide) => {
    setHeroSlides(prev => prev.map(s => s.id === slide.id ? slide : s));
  };

  const addHeroSlide = (slideData: Omit<HeroSlide, 'id'>) => {
    const newSlide: HeroSlide = {
      ...slideData,
      id: `slide-${Date.now()}`
    };
    setHeroSlides(prev => [...prev, newSlide]);
  };

  const deleteHeroSlide = (id: string) => {
    setHeroSlides(prev => prev.filter(s => s.id !== id));
  };

  const updateNewsItem = (item: NewsItem) => {
    setNewsItems(prev => prev.map(n => n.id === item.id ? item : n));
  };

  const addNewsItem = (itemData: Omit<NewsItem, 'id'>) => {
    const newItem: NewsItem = {
      ...itemData,
      id: `news-${Date.now()}`
    };
    setNewsItems(prev => [...prev, newItem]);
  };

  const deleteNewsItem = (id: string) => {
    setNewsItems(prev => prev.filter(n => n.id !== id));
  };

  const updateProduct = (product: Product) => {
    setProducts(prev => prev.map(p => p.id === product.id ? product : p));
  };

  const addProduct = (product: Product) => {
    setProducts(prev => [...prev, product]);
  };

  const deleteProduct = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  const updateGalleryItem = (item: GalleryItem) => {
    setGallery(prev => prev.map(g => g.id === item.id ? item : g));
  };

  const addGalleryItem = (item: GalleryItem) => {
    setGallery(prev => [...prev, item]);
  };

  const deleteGalleryItem = (id: string) => {
    setGallery(prev => prev.filter(g => g.id !== id));
  };

  const updateCompanyInfo = (info: CompanyInfo) => {
    setCompanyInfo(info);
  };

  const updateFounderDesk = (data: FounderDeskData) => {
    setFounderDesk(data);
  };

  const updateMapHub = (hub: MapHub) => {
    setMapHubs(prev => prev.map(h => h.id === hub.id ? hub : h));
  };

  const addMapHub = (hub: MapHub) => {
    setMapHubs(prev => [...prev, hub]);
  };

  const deleteMapHub = (id: string) => {
    setMapHubs(prev => prev.filter(h => h.id !== id));
  };

  const addInquiry = (inquiryData: Omit<InquiryItem, 'id' | 'ticketId' | 'date' | 'status'>): string => {
    const ticketId = `SNJ-INQ-${Math.floor(100000 + Math.random() * 900000)}`;
    const newInquiry: InquiryItem = {
      ...inquiryData,
      id: `inq-${Date.now()}`,
      ticketId,
      date: new Date().toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
      }),
      status: 'New'
    };
    setInquiries(prev => [newInquiry, ...prev]);
    return ticketId;
  };

  const updateInquiryStatus = (id: string, status: InquiryItem['status']) => {
    setInquiries(prev => prev.map(i => i.id === id ? { ...i, status } : i));
  };

  const deleteInquiry = (id: string) => {
    setInquiries(prev => prev.filter(i => i.id !== id));
  };

  const resetToDefaults = () => {
    setHeroSlides(DEFAULT_HERO_SLIDES);
    setNewsItems(DEFAULT_NEWS_ITEMS);
    setProducts(defaultProducts);
    setGallery(defaultGallery);
    setCompanyInfo(DEFAULT_COMPANY_INFO);
    setFounderDesk(DEFAULT_FOUNDER_DESK);
    setMapHubs(DEFAULT_MAP_HUBS);
    removeCataloguePdf();
    localStorage.removeItem('sanjog_cms_hero_slides');
    localStorage.removeItem('sanjog_cms_news');
    localStorage.removeItem('sanjog_cms_products');
    localStorage.removeItem('sanjog_cms_gallery');
    localStorage.removeItem('sanjog_cms_company');
    localStorage.removeItem('sanjog_cms_founder');
    localStorage.removeItem('sanjog_cms_map_hubs');
    localStorage.removeItem('sanjog_website_icon');
  };

  return (
    <CmsContext.Provider
      value={{
        heroSlides,
        newsItems,
        products,
        gallery,
        companyInfo,
        founderDesk,
        mapHubs,
        inquiries,
        websiteIcon,
        updateWebsiteIcon,
        cataloguePdfUrl,
        cataloguePdfName,
        uploadCataloguePdf,
        removeCataloguePdf,
        downloadCatalogue,
        isAdminAuthenticated,
        loginAdmin,
        logoutAdmin,
        updateAdminPassword,
        updateHeroSlide,
        addHeroSlide,
        deleteHeroSlide,
        updateNewsItem,
        addNewsItem,
        deleteNewsItem,
        updateProduct,
        addProduct,
        deleteProduct,
        updateGalleryItem,
        addGalleryItem,
        deleteGalleryItem,
        updateCompanyInfo,
        updateFounderDesk,
        updateMapHub,
        addMapHub,
        deleteMapHub,
        addInquiry,
        updateInquiryStatus,
        deleteInquiry,
        resetToDefaults
      }}
    >
      {children}
    </CmsContext.Provider>
  );
};

export const useCms = () => {
  const context = useContext(CmsContext);
  if (!context) {
    throw new Error('useCms must be used within a CmsProvider');
  }
  return context;
};
