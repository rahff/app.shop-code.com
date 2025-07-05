import React, { useState } from 'react';
import { Globe, Check } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface Region {
  code: string;
  name: string;
  flag: string;
  description: string;
}

const regions: Region[] = [
  {
    code: 'eu-west-3',
    name: 'Paris',
    flag: '🇫🇷',
    description: 'Best if you are in Western Europe'
  },
  {
    code: 'eu-central-1',
    name: 'Frankfurt',
    flag: '🇩🇪',
    description: 'Best if you are in Central Europe'
  },
  {
    code: 'us-east-1',
    name: 'N. Virginia',
    flag: '🇺🇸',
    description: 'Best if you are in Eastern US'
  },
  {
    code: 'us-west-2',
    name: 'Oregon',
    flag: '🇺🇸',
    description: 'Best if you are in Western US'
  }
];

const RegionPickerComponentPage: React.FC = () => {
  const { t } = useTranslation('global');
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);

  const handleRegionSelect = (regionCode: string) => {
    setSelectedRegion(regionCode);
    console.log("Selected region:", regionCode);
  };

  const handleContinue = () => {
    if (selectedRegion) {
      const regionName = t(`regionPicker.regions.${selectedRegion}.name`);
      console.log(`Proceeding with region: ${regionName} (${selectedRegion})`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-8">
      <div className="max-w-4xl w-full">
        {/* Header Section */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="w-16 h-16 bg-gradient-to-br from-[#6C63FF] to-[#5845E9] rounded-xl flex items-center justify-center mx-auto mb-6">
            <Globe className="w-8 h-8 text-white" />
          </div>
          
          <h1 className="text-3xl sm:text-4xl font-bold text-[#2B2C34] font-['Inter'] mb-6">
            {t('regionPicker.title')}
          </h1>
          
          <p className="text-[#A0A0A8] text-lg max-w-3xl mx-auto leading-relaxed">
            {t('regionPicker.description')}
          </p>
        </div>

        {/* Region Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 max-w-4xl mx-auto mb-8">
          {regions.map((region) => (
            <div
              key={region.code}
              onClick={() => handleRegionSelect(region.code)}
              className={`relative bg-white rounded-xl border-2 p-6 cursor-pointer transition-all duration-300 hover:shadow-lg ${
                selectedRegion === region.code
                  ? 'border-[#6C63FF] shadow-lg ring-2 ring-[#6C63FF]/20'
                  : 'border-gray-200 hover:border-[#6C63FF]/30 hover:shadow-md'
              }`}
              role="button"
              tabIndex={0}
              aria-label={t('regionPicker.selectRegion', { region: t(`regionPicker.regions.${region.code}.name`) })}
              aria-pressed={selectedRegion === region.code}
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

              {/* Flag and Region Info */}
              <div className="flex items-start space-x-4">
                <div className="text-4xl" role="img" aria-label={`${region.name} flag`}>
                  {region.flag}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-[#2B2C34] font-['Inter'] mb-2">
                    {t(`regionPicker.regions.${region.code}.name`)}
                  </h3>
                  <p className="text-sm font-medium text-[#6C63FF] mb-3">
                    {region.code}
                  </p>
                  <p className="text-[#A0A0A8] text-sm leading-relaxed">
                    {t(`regionPicker.regions.${region.code}.description`)}
                  </p>
                </div>
              </div>

              {/* Hover Effect Overlay */}
              <div className={`absolute inset-0 rounded-xl transition-all duration-300 pointer-events-none ${
                selectedRegion === region.code
                  ? 'bg-[#6C63FF]/5'
                  : ''
              }`} />
            </div>
          ))}
        </div>

        {/* Continue Button (appears when region is selected) */}
        {selectedRegion && (
          <div className="text-center">
            <button
              onClick={handleContinue}
              className="bg-[#6C63FF] text-white px-8 py-4 rounded-xl font-medium hover:bg-[#5845E9] focus:outline-none focus:ring-2 focus:ring-[#6C63FF]/20 transition-all duration-200 shadow-lg hover:shadow-xl"
              aria-label={t('regionPicker.continueWith', { region: t(`regionPicker.regions.${selectedRegion}.name`) })}
            >
              {t('common.continue')}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default RegionPickerComponentPage;