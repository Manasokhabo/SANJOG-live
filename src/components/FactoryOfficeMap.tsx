import React, { useState } from 'react';
import { useCms } from '../context/CmsContext';
import { MapPin, Building, ExternalLink, Navigation, Phone, Mail } from 'lucide-react';

export const FactoryOfficeMap: React.FC = () => {
  const { companyInfo } = useCms();
  const [activeLocation, setActiveLocation] = useState<'works' | 'office'>('works');

  const locations = {
    works: {
      name: 'Manufacturing Works & Hot-Dip Galvanizing Plant',
      tag: 'Primary Plant & Yard',
      address: companyInfo.worksAddress,
      mapQuery: 'Industrial Growth Centre, West Bengal, India',
      details: '14-Meter Hot-Dip Galvanizing Bath & Heavy Roll-Forming Mills'
    },
    office: {
      name: 'Corporate Sales & Commercial Headquarters',
      tag: 'Registered Sales Office',
      address: companyInfo.headquarters,
      mapQuery: 'Sector V, Salt Lake, Kolkata, West Bengal, 700091, India',
      details: 'EPC Tender Liaison & Commercial Contracting'
    }
  };

  const current = locations[activeLocation];

  return (
    <div className="w-full bg-slate-900/90 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl backdrop-blur-xl text-left">
      {/* Top Header & Switcher */}
      <div className="p-6 border-b border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/70 border border-cyan-800/60 text-xs font-mono text-cyan-300 mb-2">
            <MapPin className="w-3.5 h-3.5 text-cyan-400" />
            <span>Factory & Office Location Map</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-white font-display">
            {current.name}
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            {current.address}
          </p>
        </div>

        {/* Location Toggle Tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-950 rounded-xl border border-slate-800 shrink-0 self-start sm:self-auto">
          <button
            onClick={() => setActiveLocation('works')}
            className={`flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-lg transition-all ${
              activeLocation === 'works'
                ? 'bg-slate-800 text-cyan-300 shadow-sm border border-cyan-500/30 font-bold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Building className="w-3.5 h-3.5 text-cyan-400" />
            <span>Manufacturing Works</span>
          </button>

          <button
            onClick={() => setActiveLocation('office')}
            className={`flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-lg transition-all ${
              activeLocation === 'office'
                ? 'bg-slate-800 text-lime-400 shadow-sm border border-lime-500/30 font-bold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Navigation className="w-3.5 h-3.5 text-lime-400" />
            <span>Corporate Office</span>
          </button>
        </div>
      </div>

      {/* Clean Direct Map Frame */}
      <div className="relative w-full h-[400px] sm:h-[450px] bg-slate-950">
        <iframe
          title="Sanjog Location Map"
          width="100%"
          height="100%"
          className="w-full h-full border-0 filter invert-[0.9] hue-rotate-[180deg] contrast-125 brightness-95"
          loading="lazy"
          src={`https://maps.google.com/maps?q=${encodeURIComponent(current.mapQuery)}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
        />

        {/* Floating Detail Overlay */}
        <div className="absolute bottom-4 left-4 right-4 sm:right-auto sm:max-w-md bg-slate-950/95 backdrop-blur-md border border-slate-800 rounded-2xl p-4 shadow-2xl">
          <div className="flex items-start justify-between gap-3">
            <div>
              <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800 font-semibold inline-block mb-1">
                {current.tag}
              </span>
              <p className="text-xs text-white font-medium leading-relaxed">
                {current.address}
              </p>
              <p className="text-[11px] text-slate-400 mt-1 font-mono">
                {current.details}
              </p>
            </div>

            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(current.mapQuery)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-2 bg-gradient-to-r from-cyan-400 to-lime-400 hover:from-cyan-300 hover:to-lime-300 text-slate-950 font-bold text-xs rounded-xl shadow-md flex items-center gap-1.5 shrink-0 transition-transform hover:scale-105"
            >
              <span>Get Directions</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
