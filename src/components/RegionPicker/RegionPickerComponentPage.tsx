import React, { useState } from 'react';
import { Globe, MapPin, Check } from 'lucide-react';

interface Region {
  code: string;
  name: string;
  city: string;
  flag: string;
  description: string;
}

const regions: Region[] = [
  {
    code: 'eu-west-3',
    name: 'Paris',
    city: 'Paris',
    flag: '🇫🇷',
    description: 'Ideal if you are in Western Europe'
  },
  {
    code: 'eu-central-1',
    name: 'Frankfurt',
    city: 'Frankfurt',
    flag: '🇩🇪',
    description: 'Ideal if you are in Central Europe'
  },
  {
    code: 'us-east-1',
    name: 'N. Virginia',
    city: 'N. Virginia',
    flag: '🇺🇸',
    description: 'Ideal if you are in Eastern US'
  },
  {
    code: 'us-west-2',
    name: 'Oregon',
    city: 'Oregon',
    flag: '🇺🇸',
    description: 'Ideal if you are in Western US'
  }
];

const RegionPickerComponentPage: React.FC = () => {
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);

  const handleRegionSelect = (regionCode: string) => {
    setSelectedRegion(regionCode);
    console.log("Selected region:", regionCode);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-8">
      <div className="max-w-4xl w-full">
        {/* Header Section */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="w-16 h-16 bg-gradient-to-br from-[#6C63FF] to-[#5845E9] rounded-xl flex items-center justify-center mx-auto mb-6">
            <Globe className="w-8 h-8 text-white" />
          </div>
          
          <h1 className="text-3xl sm:text-4xl font-bold text-[#2B2C34] font-['Inter'] mb-4">
            Select your preferred AWS region
          </h1>
          
          <p className="text-[#A0A0A8] text-lg max-w-2xl mx-auto leading-relaxed">
            This will determine where your data is stored and processed. You can change this later in your account settings.
          </p>
        </div>

        {/* Region Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 max-w-3xl mx-auto">
          {regions.map((region) => (
            <div
              key={region.code}
              onClick={() => handleRegionSelect(region.code)}
              className={`relative bg-white rounded-xl border-2 p-6 cursor-pointer transition-all duration-300 hover:shadow-lg ${
                selectedRegion === region.code
                  ? 'border-[#6C63FF] shadow-lg ring-2 ring-[#6C63FF]/20'
                  : 'border-gray-200 hover:border-[#6C63FF]/30'
              }`}
              role="button"
              tabIndex={0}
              aria-label={`Select ${region.city} region`}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleRegionSelect(region.code);
                }
              }}
            >
              {/* Selection Indicator */}
              {selectedRegion === region.code && (
                <div className="absolute top-4 right-4">
                  <div className="w-6 h-6 bg-[#6C63FF] rounded-full flex items-center justify-center">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                </div>
              )}

              {/* Flag and Location */}
              <div className="flex items-center space-x-4 mb-4">
                <div className="text-3xl" role="img" aria-label={`${region.city} flag`}>
                  {region.flag}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-[#2B2C34] font-['Inter'] mb-1">
                    {region.city}
                  </h3>
                  <div className="flex items-center space-x-2 text-[#A0A0A8]">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm font-medium">{region.code}</span>
                  </div>
                </div>
              </div>

              {/* Description */}
              <p className="text-[#A0A0A8] text-sm leading-relaxed">
                {region.description}
              </p>

              {/* Hover Effect Overlay */}
              <div className={`absolute inset-0 rounded-xl transition-all duration-300 pointer-events-none ${
                selectedRegion === region.code
                  ? 'bg-[#6C63FF]/5'
                  : 'hover:bg-gray-50'
              }`} />
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-8 sm:mt-12 text-center">
          <div className="bg-white rounded-xl border border-gray-200 p-6 max-w-2xl mx-auto">
            <div className="flex items-center justify-center space-x-2 mb-3">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-sm font-medium text-[#2B2C34]">Serverless Architecture</span>
            </div>
            <p className="text-[#A0A0A8] text-sm">
              No idle costs in unused regions. Your selection optimizes for compliance, latency, and data sovereignty.
            </p>
          </div>
        </div>

        {/* Continue Button (appears when region is selected) */}
        {selectedRegion && (
          <div className="mt-8 text-center">
            <button
              onClick={() => {
                const selected = regions.find(r => r.code === selectedRegion);
                console.log(`Proceeding with region: ${selected?.city} (${selectedRegion})`);
              }}
              className="bg-[#6C63FF] text-white px-8 py-3 rounded-xl font-medium hover:bg-[#5845E9] focus:outline-none focus:ring-2 focus:ring-[#6C63FF]/20 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Continue with {regions.find(r => r.code === selectedRegion)?.city}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default RegionPickerComponentPage;