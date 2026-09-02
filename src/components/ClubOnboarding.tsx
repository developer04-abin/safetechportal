import { useState, useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { translations, districts, districtMalayalam } from '../utils/translations';
import { FiPlusCircle, FiCheck, FiMap, FiUploadCloud, FiCompass, FiLayers, FiInfo, FiSearch, FiMaximize2 } from 'react-icons/fi';

interface ClubOnboardingProps {
  language: 'en' | 'ml';
}

interface DistrictClubInfo {
  total: number;
  school: number;
  college: number;
  lsgd: number;
  zone: 'North' | 'Central' | 'South';
  hq: string;
  hqMl: string;
  lat: number;
  lng: number;
  coords: [number, number][];
}

const keralaDistrictData: Record<string, DistrictClubInfo> = {
  "Kasaragod": {
    total: 15,
    school: 7,
    college: 5,
    lsgd: 3,
    zone: 'North',
    hq: "Kasaragod",
    hqMl: "കാസർഗോഡ്",
    lat: 12.5102,
    lng: 74.9852,
    coords: [
      [12.79, 74.95], [12.83, 75.05], [12.60, 75.40], [12.35, 75.35],
      [12.18, 75.18], [12.15, 75.12], [12.30, 75.00], [12.55, 74.90], [12.79, 74.95]
    ]
  },
  "Kannur": {
    total: 28,
    school: 12,
    college: 10,
    lsgd: 6,
    zone: 'North',
    hq: "Kannur",
    hqMl: "കണ്ണൂർ",
    lat: 11.8745,
    lng: 75.3704,
    coords: [
      [12.18, 75.18], [12.35, 75.35], [12.28, 75.65], [11.95, 75.92],
      [11.82, 75.75], [11.68, 75.52], [11.85, 75.35], [12.18, 75.18]
    ]
  },
  "Wayanad": {
    total: 11,
    school: 6,
    college: 3,
    lsgd: 2,
    zone: 'North',
    hq: "Kalpetta",
    hqMl: "കൽപ്പറ്റ",
    lat: 11.6854,
    lng: 76.1320,
    coords: [
      [11.95, 75.92], [11.98, 76.12], [11.85, 76.40], [11.55, 76.45],
      [11.45, 76.25], [11.52, 75.95], [11.82, 75.75], [11.95, 75.92]
    ]
  },
  "Kozhikode": {
    total: 34,
    school: 14,
    college: 12,
    lsgd: 8,
    zone: 'North',
    hq: "Kozhikode",
    hqMl: "കോഴിക്കോട്",
    lat: 11.2588,
    lng: 75.7804,
    coords: [
      [11.68, 75.52], [11.82, 75.75], [11.52, 75.95], [11.35, 76.10],
      [11.12, 75.85], [11.25, 75.75], [11.45, 75.60], [11.68, 75.52]
    ]
  },
  "Malappuram": {
    total: 39,
    school: 18,
    college: 13,
    lsgd: 8,
    zone: 'Central',
    hq: "Malappuram",
    hqMl: "മലപ്പുറം",
    lat: 11.0510,
    lng: 76.0711,
    coords: [
      [11.35, 76.10], [11.45, 76.25], [11.35, 76.45], [11.00, 76.42],
      [10.78, 76.05], [10.75, 75.90], [11.12, 75.85], [11.35, 76.10]
    ]
  },
  "Palakkad": {
    total: 26,
    school: 12,
    college: 8,
    lsgd: 6,
    zone: 'Central',
    hq: "Palakkad",
    hqMl: "പാലക്കാട്",
    lat: 10.7867,
    lng: 76.6548,
    coords: [
      [11.35, 76.45], [11.15, 76.75], [10.95, 76.92], [10.60, 76.90],
      [10.35, 76.75], [10.45, 76.45], [10.78, 76.20], [11.00, 76.42], [11.35, 76.45]
    ]
  },
  "Thrissur": {
    total: 31,
    school: 13,
    college: 11,
    lsgd: 7,
    zone: 'Central',
    hq: "Thrissur",
    hqMl: "തൃശ്ശൂർ",
    lat: 10.5276,
    lng: 76.2144,
    coords: [
      [10.75, 75.90], [10.78, 76.05], [10.78, 76.20], [10.45, 76.45],
      [10.32, 76.70], [10.18, 76.50], [10.15, 76.18], [10.35, 76.00], [10.75, 75.90]
    ]
  },
  "Ernakulam": {
    total: 42,
    school: 15,
    college: 18,
    lsgd: 9,
    zone: 'Central',
    hq: "Kochi / Kakkanad",
    hqMl: "കൊച്ചി / കാക്കനാട്",
    lat: 9.9816,
    lng: 76.2999,
    coords: [
      [10.18, 76.18], [10.18, 76.50], [10.10, 76.82], [9.85, 76.75],
      [9.75, 76.42], [9.88, 76.25], [10.05, 76.20], [10.18, 76.18]
    ]
  },
  "Idukki": {
    total: 12,
    school: 6,
    college: 3,
    lsgd: 3,
    zone: 'South',
    hq: "Painavu",
    hqMl: "പൈനാവ്",
    lat: 9.8494,
    lng: 76.9720,
    coords: [
      [10.32, 76.70], [10.25, 77.25], [9.95, 77.35], [9.52, 77.25],
      [9.48, 76.95], [9.85, 76.75], [10.10, 76.82], [10.32, 76.70]
    ]
  },
  "Kottayam": {
    total: 22,
    school: 10,
    college: 8,
    lsgd: 4,
    zone: 'South',
    hq: "Kottayam",
    hqMl: "കോട്ടയം",
    lat: 9.5916,
    lng: 76.5222,
    coords: [
      [9.75, 76.42], [9.85, 76.75], [9.60, 76.92], [9.42, 76.80],
      [9.45, 76.52], [9.62, 76.45], [9.75, 76.42]
    ]
  },
  "Alappuzha": {
    total: 18,
    school: 8,
    college: 6,
    lsgd: 4,
    zone: 'South',
    hq: "Alappuzha",
    hqMl: "ആലപ്പുഴ",
    lat: 9.4981,
    lng: 76.3388,
    coords: [
      [9.88, 76.25], [9.75, 76.42], [9.62, 76.45], [9.45, 76.52],
      [9.15, 76.50], [9.10, 76.42], [9.35, 76.32], [9.60, 76.30], [9.88, 76.25]
    ]
  },
  "Pathanamthitta": {
    total: 14,
    school: 6,
    college: 5,
    lsgd: 3,
    zone: 'South',
    hq: "Pathanamthitta",
    hqMl: "പത്തനംതിട്ട",
    lat: 9.2648,
    lng: 76.7870,
    coords: [
      [9.48, 76.95], [9.52, 77.25], [9.25, 77.28], [9.10, 77.05],
      [9.15, 76.68], [9.42, 76.80], [9.60, 76.92], [9.48, 76.95]
    ]
  },
  "Kollam": {
    total: 25,
    school: 11,
    college: 9,
    lsgd: 5,
    zone: 'South',
    hq: "Kollam",
    hqMl: "കൊല്ലം",
    lat: 8.8932,
    lng: 76.6141,
    coords: [
      [9.15, 76.50], [9.15, 76.68], [9.10, 77.05], [8.95, 77.15],
      [8.75, 76.90], [8.80, 76.60], [8.95, 76.52], [9.15, 76.50]
    ]
  },
  "Thiruvananthapuram": {
    total: 45,
    school: 18,
    college: 19,
    lsgd: 8,
    zone: 'South',
    hq: "Thiruvananthapuram",
    hqMl: "തിരുവനന്തപുരം",
    lat: 8.5241,
    lng: 76.9366,
    coords: [
      [8.80, 76.60], [8.75, 76.90], [8.95, 77.15], [8.70, 77.30],
      [8.45, 77.25], [8.30, 77.10], [8.35, 76.95], [8.55, 76.85], [8.80, 76.60]
    ]
  }
};

export default function ClubOnboarding({ language }: ClubOnboardingProps) {
  const t = translations[language];

  const [selectedDistrict, setSelectedDistrict] = useState<string>("Thiruvananthapuram");
  const [zoneFilter, setZoneFilter] = useState<'All' | 'North' | 'Central' | 'South'>('All');
  const [searchFilter, setSearchFilter] = useState<string>('');
  const [mapTheme, setMapTheme] = useState<'voyager' | 'dark'>('dark');
  const [showRegForm, setShowRegForm] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [fileName, setFileName] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Form Fields
  const [instName, setInstName] = useState('');
  const [instType, setInstType] = useState('');
  const [coordName, setCoordName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [formDistrict, setFormDistrict] = useState('');

  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const layerGroupRef = useRef<L.LayerGroup | null>(null);
  const tileLayerRef = useRef<L.TileLayer | null>(null);

  // Initialize Leaflet Real Geographic Map of Kerala
  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current, {
        center: [10.35, 76.45],
        zoom: 7.2,
        minZoom: 6.8,
        maxZoom: 12,
        zoomControl: false,
        attributionControl: false
      });

      L.control.zoom({ position: 'topright' }).addTo(map);

      // Restrict panning bounds to Kerala Region
      const southWest = L.latLng(7.8, 74.0);
      const northEast = L.latLng(13.3, 78.2);
      const bounds = L.latLngBounds(southWest, northEast);
      map.setMaxBounds(bounds);

      mapInstanceRef.current = map;
      layerGroupRef.current = L.layerGroup().addTo(map);
    }

    const map = mapInstanceRef.current;

    // Tile Layer Setup (Dark Matter vs CartoDB Voyager)
    if (tileLayerRef.current) {
      map.removeLayer(tileLayerRef.current);
    }

    const tileUrl =
      mapTheme === 'dark'
        ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
        : 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png';

    tileLayerRef.current = L.tileLayer(tileUrl, {
      subdomains: 'abcd',
      maxZoom: 19
    }).addTo(map);

    return () => {
      // Map persists across renders
    };
  }, [mapTheme]);

  // Render Real Kerala District Polygons and Glowing Club Hub Markers
  useEffect(() => {
    if (!mapInstanceRef.current || !layerGroupRef.current) return;

    const layerGroup = layerGroupRef.current;
    layerGroup.clearLayers();

    districts.forEach((dist) => {
      const data = keralaDistrictData[dist];
      if (!data) return;

      const isSelected = selectedDistrict === dist;

      // Real Boundary Polygon
      const polygon = L.polygon(data.coords, {
        color: isSelected ? '#00b4d8' : '#004d80',
        weight: isSelected ? 3.5 : 1.5,
        opacity: isSelected ? 1 : 0.6,
        fillColor: isSelected ? '#00b4d8' : '#004d80',
        fillOpacity: isSelected ? 0.45 : 0.12,
        className: 'cursor-pointer transition-all duration-300'
      });

      polygon.on('click', () => {
        setSelectedDistrict(dist);
      });

      polygon.on('mouseover', (e) => {
        const layer = e.target;
        if (selectedDistrict !== dist) {
          layer.setStyle({
            fillOpacity: 0.3,
            color: '#00b4d8',
            weight: 2.5
          });
        }
      });

      polygon.on('mouseout', (e) => {
        const layer = e.target;
        if (selectedDistrict !== dist) {
          layer.setStyle({
            fillOpacity: 0.12,
            color: '#004d80',
            weight: 1.5
          });
        }
      });

      layerGroup.addLayer(polygon);

      // Custom Glowing Hub Marker Icon
      const customIcon = L.divIcon({
        className: 'custom-leaflet-marker',
        html: `
          <div style="position: relative; display: flex; align-items: center; justify-content: center; cursor: pointer;">
            ${
              isSelected
                ? `<div style="position: absolute; width: 36px; height: 36px; border-radius: 50%; background: rgba(0, 180, 216, 0.4); animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;"></div>`
                : ''
            }
            <div style="
              width: ${isSelected ? '28px' : '22px'};
              height: ${isSelected ? '28px' : '22px'};
              border-radius: 50%;
              background: ${isSelected ? '#00b4d8' : '#004d80'};
              border: 2px solid #ffffff;
              display: flex;
              align-items: center;
              justify-content: center;
              color: #ffffff;
              font-family: 'Space Grotesk', sans-serif;
              font-size: ${isSelected ? '11px' : '9px'};
              font-weight: 800;
              box-shadow: 0 4px 12px rgba(0, 77, 128, 0.5);
              transition: all 0.3s ease;
            ">
              ${data.total}
            </div>
            <div style="
              position: absolute;
              bottom: -18px;
              white-space: nowrap;
              background: rgba(15, 23, 42, 0.85);
              backdrop-filter: blur(4px);
              padding: 1px 6px;
              border-radius: 6px;
              border: 1px solid rgba(255, 255, 255, 0.15);
              color: #ffffff;
              font-family: 'Space Grotesk', sans-serif;
              font-size: 8.5px;
              font-weight: 700;
              pointer-events: none;
            ">
              ${language === 'en' ? dist : districtMalayalam[dist] || dist}
            </div>
          </div>
        `,
        iconSize: [30, 30],
        iconAnchor: [15, 15]
      });

      const marker = L.marker([data.lat, data.lng], { icon: customIcon });

      marker.on('click', () => {
        setSelectedDistrict(dist);
      });

      layerGroup.addLayer(marker);
    });
  }, [selectedDistrict, language]);

  // Pan to selected district smoothly
  const handleSelectDistrict = (dist: string) => {
    setSelectedDistrict(dist);
    const data = keralaDistrictData[dist];
    if (data && mapInstanceRef.current) {
      mapInstanceRef.current.flyTo([data.lat, data.lng], 8.5, {
        duration: 1.2
      });
    }
  };

  const handleResetView = () => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.flyTo([10.35, 76.45], 7.2, {
        duration: 1.2
      });
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      setUploadProgress(10);
      const interval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + 25;
        });
      }, 150);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!instName || !instType || !coordName || !email || !phone || !formDistrict || !fileName) {
      alert("Please fill all fields and upload the charter document.");
      return;
    }
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setShowRegForm(false);
      setInstName('');
      setInstType('');
      setCoordName('');
      setEmail('');
      setPhone('');
      setFormDistrict('');
      setFileName('');
      setUploadProgress(0);
    }, 4000);
  };

  const filteredDistricts = districts.filter((dist) => {
    const matchesZone = zoneFilter === 'All' || keralaDistrictData[dist]?.zone === zoneFilter;
    const matchesSearch =
      searchFilter.trim() === '' ||
      dist.toLowerCase().includes(searchFilter.toLowerCase()) ||
      (districtMalayalam[dist] && districtMalayalam[dist].includes(searchFilter));
    return matchesZone && matchesSearch;
  });

  const activeData = keralaDistrictData[selectedDistrict];

  return (
    <section id="clubs" className="py-20 lg:py-24 bg-slate-50/70 dark:bg-slate-950 border-b border-slate-200/60 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-ictak-cyan/10 border border-ictak-cyan/20 text-ictak-cyan text-[11px] font-space font-bold uppercase tracking-wider mb-3">
            <FiCompass className="text-sm" />
            <span>Statewide Active Chapters Map</span>
          </div>
          <h2 className="h2-scale font-space text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white tracking-tight">
            Interactive District Map of <span className="text-ictak-cyan">Active Clubs</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-light mt-2 max-w-xl mx-auto">
            Explore authentic grassroots SafeTech chapters across all 14 districts in Kerala. Built on official OpenStreetMap GIS data with live chapter hubs.
          </p>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Real Kerala Geographic Map */}
          <div className="lg:col-span-7 safetech-card p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-lg flex flex-col md:flex-row gap-8">
            
            {/* Districts List & Zone Controls */}
            <div className="flex flex-col gap-3.5 w-full md:w-5/12">
              <div>
                <h3 className="h3-scale text-base sm:text-lg font-bold font-space text-slate-900 dark:text-white flex items-center gap-2">
                  <FiMap className="text-ictak-cyan shrink-0" />
                  <span>{t.mapTitle}</span>
                </h3>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 font-light mt-0.5">
                  Select a district to fly the map
                </p>
              </div>

              {/* Quick Search */}
              <div className="relative flex items-center">
                <input
                  type="text"
                  placeholder="Search district..."
                  value={searchFilter}
                  onChange={(e) => setSearchFilter(e.target.value)}
                  className="w-full pl-8 pr-3 py-1.5 text-xs rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-ictak-cyan"
                />
                <FiSearch className="absolute left-2.5 text-slate-400 text-xs" />
              </div>

              {/* Zone Filter Pill Buttons */}
              <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl">
                {(['All', 'North', 'Central', 'South'] as const).map((zone) => (
                  <button
                    key={zone}
                    onClick={() => setZoneFilter(zone)}
                    className={`flex-1 py-1 text-[10px] font-space font-bold uppercase rounded-lg transition cursor-pointer ${
                      zoneFilter === zone
                        ? 'bg-white dark:bg-slate-900 text-ictak-blue dark:text-ictak-cyan shadow-xs'
                        : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    {zone}
                  </button>
                ))}
              </div>

              {/* List of Districts */}
              <div className="flex flex-wrap md:flex-col gap-1.5 max-h-48 md:max-h-[360px] overflow-y-auto pr-1.5 border-t md:border-t-0 md:border-r border-slate-100 dark:border-slate-800 scrollbar-thin scrollbar-thumb-slate-200 dark:scrollbar-thumb-slate-800">
                {filteredDistricts.map((dist) => {
                  const isSelected = selectedDistrict === dist;
                  return (
                    <button
                      key={dist}
                      onClick={() => handleSelectDistrict(dist)}
                      className={`px-3 py-2 rounded-xl text-left text-xs font-semibold font-space transition cursor-pointer flex justify-between items-center ${
                        isSelected
                          ? 'bg-gradient-to-r from-ictak-blue to-cyan-700 text-white shadow-sm'
                          : 'bg-slate-50 dark:bg-slate-800/40 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      <span className="truncate">{language === 'en' ? dist : districtMalayalam[dist] || dist}</span>
                      <span
                        className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${
                          isSelected
                            ? 'bg-white/20 text-white font-bold'
                            : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                        }`}
                      >
                        {keralaDistrictData[dist]?.total}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Map Layer Switcher & Reset Button */}
              <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-1.5 text-[10px] font-space font-bold">
                  <button
                    onClick={() => setMapTheme('dark')}
                    className={`px-2 py-1 rounded-lg transition ${
                      mapTheme === 'dark' ? 'bg-cyan-950 text-cyan-400 border border-cyan-700' : 'text-slate-400'
                    }`}
                  >
                    Dark GIS
                  </button>
                  <button
                    onClick={() => setMapTheme('voyager')}
                    className={`px-2 py-1 rounded-lg transition ${
                      mapTheme === 'voyager' ? 'bg-slate-200 text-slate-800 border border-slate-300' : 'text-slate-400'
                    }`}
                  >
                    Terrain
                  </button>
                </div>

                <button
                  onClick={handleResetView}
                  className="flex items-center gap-1 text-[10px] font-space font-semibold text-ictak-cyan hover:underline cursor-pointer"
                >
                  <FiMaximize2 className="text-xs" />
                  <span>Reset View</span>
                </button>
              </div>
            </div>

            {/* Real Interactive Leaflet Kerala Map Container */}
            <div className="w-full md:w-7/12 flex flex-col items-center justify-center rounded-3xl overflow-hidden border border-slate-200/80 dark:border-slate-800 relative shadow-inner">
              
              <div
                ref={mapContainerRef}
                className="w-full h-[520px] rounded-3xl bg-slate-950 z-0"
              />

              {/* Live Selected District Floating HUD */}
              <div className="absolute bottom-3 left-3 right-3 bg-slate-900/90 backdrop-blur-md p-3 rounded-2xl border border-slate-700/80 shadow-xl flex items-center justify-between z-10 pointer-events-none">
                <div className="flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-ictak-cyan animate-ping" />
                  <div className="flex flex-col text-left">
                    <span className="font-space text-xs font-bold text-white leading-none">
                      {language === 'en' ? selectedDistrict : districtMalayalam[selectedDistrict]}
                    </span>
                    <span className="text-[9.5px] text-slate-300 font-space mt-0.5">
                      HQ: {language === 'en' ? activeData?.hq : activeData?.hqMl}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 bg-ictak-cyan/20 px-2.5 py-1 rounded-xl border border-ictak-cyan/30">
                  <span className="text-xs font-space font-black text-ictak-cyan">
                    {activeData?.total}
                  </span>
                  <span className="text-[9px] uppercase font-space font-bold text-ictak-cyan">
                    Clubs
                  </span>
                </div>
              </div>

            </div>
          </div>

          {/* Right Column: Selected District Statistics Card & Charter Registration Trigger */}
          <div className="lg:col-span-5 flex flex-col gap-6 w-full">
            
            {/* Live stats for the selected district */}
            <div className="safetech-card p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-lg flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-space font-bold uppercase tracking-wider text-ictak-cyan">
                    {t.activeClubsIn}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-ictak-cyan/10 text-ictak-cyan text-[10px] font-space font-bold">
                    {keralaDistrictData[selectedDistrict]?.zone} Kerala Region
                  </span>
                </div>
                
                <h3 className="h3-scale text-2xl sm:text-3xl font-bold font-space text-slate-900 dark:text-white mt-1.5">
                  {language === 'en' ? selectedDistrict : districtMalayalam[selectedDistrict]}
                </h3>
                <span className="text-xs text-slate-400 font-space block mt-0.5">
                  Regional District HQ: {keralaDistrictData[selectedDistrict]?.hq}
                </span>

                {/* Breakdown Grid */}
                <div className="grid grid-cols-3 gap-3.5 mt-6 border-t border-slate-100 dark:border-slate-800 pt-6">
                  <div className="flex flex-col p-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-2xl text-center border border-slate-100 dark:border-slate-800">
                    <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">{t.school}</span>
                    <span className="text-2xl font-bold text-slate-800 dark:text-slate-100 mt-1 font-space">
                      {activeData?.school}
                    </span>
                    <span className="text-[9px] text-slate-400 font-space mt-0.5">Chapters</span>
                  </div>
                  <div className="flex flex-col p-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-2xl text-center border border-slate-100 dark:border-slate-800">
                    <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">{t.college}</span>
                    <span className="text-2xl font-bold text-slate-800 dark:text-slate-100 mt-1 font-space">
                      {activeData?.college}
                    </span>
                    <span className="text-[9px] text-slate-400 font-space mt-0.5">Chapters</span>
                  </div>
                  <div className="flex flex-col p-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-2xl text-center border border-slate-100 dark:border-slate-800">
                    <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">LSGD Units</span>
                    <span className="text-2xl font-bold text-slate-800 dark:text-slate-100 mt-1 font-space">
                      {activeData?.lsgd}
                    </span>
                    <span className="text-[9px] text-slate-400 font-space mt-0.5">Panchayats</span>
                  </div>
                </div>

                {/* Total Counter Highlight */}
                <div className="flex justify-between items-center bg-gradient-to-r from-ictak-blue/10 via-ictak-cyan/10 to-ictak-blue/5 dark:from-ictak-blue/20 dark:to-cyan-950/20 p-5 rounded-2xl border border-ictak-blue/15 dark:border-ictak-cyan/20 mt-6">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2.5 rounded-xl bg-ictak-cyan/15 text-ictak-cyan">
                      <FiLayers className="text-xl" />
                    </div>
                    <div>
                      <span className="text-xs font-space font-bold text-ictak-blue dark:text-ictak-cyan uppercase block">
                        Total Active Clubs
                      </span>
                      <span className="text-[10px] text-slate-400 font-space">
                        Empowering 4,000+ Ambassadors
                      </span>
                    </div>
                  </div>
                  <span className="text-3xl font-black text-ictak-blue dark:text-white font-space">
                    {activeData?.total}
                  </span>
                </div>
              </div>

              <button
                onClick={() => {
                  setFormDistrict(selectedDistrict);
                  setShowRegForm(true);
                }}
                className="w-full mt-6 py-3.5 rounded-2xl bg-gradient-to-r from-ictak-blue to-ictak-cyan hover:opacity-95 text-white font-space font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-md transition"
              >
                <FiPlusCircle className="text-base" />
                <span>Register a SafeTech Club in {selectedDistrict}</span>
              </button>
            </div>

            {/* Quick Informational Box */}
            <div className="p-6 rounded-3xl bg-cyan-50/50 dark:bg-slate-900 border border-cyan-100 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-350 leading-relaxed text-left flex flex-col gap-2.5 shadow-sm">
              <div className="flex items-center gap-2 font-bold text-ictak-blue dark:text-ictak-cyan uppercase font-space tracking-wider text-xs">
                <FiInfo className="text-base" />
                <span>Institutional Club Mandate & Support</span>
              </div>
              <p className="font-light">
                To establish an official SafeTech Club at your school or campus, download the campaign charter, secure authorization from the institutional head, and upload the signed PDF. Certified coordinators will receive PMU access within 48 hours.
              </p>
            </div>

          </div>
        </div>

        {/* Club Registration Modal */}
        {showRegForm && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="relative bg-white dark:bg-slate-900 max-w-lg w-full rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-2xl max-h-[90vh] overflow-y-auto">
              
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="h3-scale text-xl font-bold font-space text-slate-900 dark:text-white">
                    {t.registerClub}
                  </h3>
                  <p className="text-xs text-slate-400 font-light mt-0.5">
                    Register a new SafeTech chapter in {formDistrict || selectedDistrict}
                  </p>
                </div>
                <button
                  onClick={() => setShowRegForm(false)}
                  className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-white font-bold font-space text-base cursor-pointer"
                >
                  ✕
                </button>
              </div>

              {!formSubmitted ? (
                <form onSubmit={handleFormSubmit} className="flex flex-col gap-4 text-left">
                  
                  {/* Inst Name */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold uppercase text-slate-500 dark:text-slate-400 font-space">
                      {t.instName}
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Govt Model Higher Secondary School"
                      value={instName}
                      onChange={(e) => setInstName(e.target.value)}
                      className="px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 focus:outline-none focus:border-ictak-cyan text-slate-950 dark:text-white"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    {/* Inst Type */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold uppercase text-slate-500 dark:text-slate-400 font-space">
                        {t.instType}
                      </label>
                      <select
                        required
                        value={instType}
                        onChange={(e) => setInstType(e.target.value)}
                        className="px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 focus:outline-none focus:border-ictak-cyan text-slate-950 dark:text-white cursor-pointer"
                      >
                        <option value="">{t.selectType}</option>
                        <option value="school">{t.school}</option>
                        <option value="college">{t.college}</option>
                        <option value="lsgd">{t.lsgd}</option>
                      </select>
                    </div>

                    {/* District */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold uppercase text-slate-500 dark:text-slate-400 font-space">
                        {t.district}
                      </label>
                      <select
                        required
                        value={formDistrict}
                        onChange={(e) => setFormDistrict(e.target.value)}
                        className="px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 focus:outline-none focus:border-ictak-cyan text-slate-950 dark:text-white cursor-pointer"
                      >
                        <option value="">{t.district}</option>
                        {districts.map((d) => (
                          <option key={d} value={d}>
                            {d}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Coordinator */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold uppercase text-slate-500 dark:text-slate-400 font-space">
                      {t.coordName}
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Prof. Joseph Kurian"
                      value={coordName}
                      onChange={(e) => setCoordName(e.target.value)}
                      className="px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 focus:outline-none focus:border-ictak-cyan text-slate-950 dark:text-white"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    {/* Email */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold uppercase text-slate-500 dark:text-slate-400 font-space">
                        {t.email}
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="coord@school.edu"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 focus:outline-none focus:border-ictak-cyan text-slate-950 dark:text-white"
                      />
                    </div>

                    {/* Phone */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold uppercase text-slate-500 dark:text-slate-400 font-space">
                        {t.phone}
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="9876543210"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 focus:outline-none focus:border-ictak-cyan text-slate-950 dark:text-white"
                      />
                    </div>
                  </div>

                  {/* File Upload Zone */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold uppercase text-slate-500 dark:text-slate-400 font-space">
                      {t.uploadMandate}
                    </label>
                    <div className="border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-2xl p-6 text-center hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:border-ictak-cyan transition relative cursor-pointer">
                      <input
                        type="file"
                        required
                        accept=".pdf,.png,.jpg,.jpeg"
                        onChange={handleFileUpload}
                        className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                      />
                      <div className="flex flex-col items-center gap-2">
                        <FiUploadCloud className="text-3xl text-slate-400 dark:text-slate-500" />
                        <span className="text-xs text-slate-700 dark:text-slate-300 font-semibold">
                          {t.uploadHint}
                        </span>
                      </div>
                    </div>

                    {fileName && (
                      <div className="mt-2 p-3 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-xl flex items-center justify-between text-xs">
                        <span className="text-slate-700 dark:text-slate-300 truncate max-w-xs">{fileName}</span>
                        {uploadProgress < 100 ? (
                          <span className="text-ictak-cyan font-bold font-mono">{uploadProgress}%</span>
                        ) : (
                          <span className="text-emerald-500 font-bold flex items-center gap-1">
                            <FiCheck /> Complete
                          </span>
                        )}
                      </div>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="w-full mt-4 py-3.5 bg-gradient-to-r from-ictak-blue to-ictak-cyan hover:opacity-95 text-white rounded-xl font-space font-bold uppercase text-xs sm:text-sm tracking-wider cursor-pointer shadow-md transition"
                  >
                    {t.submitClub}
                  </button>

                </form>
              ) : (
                /* Submission Success */
                <div className="flex flex-col items-center text-center gap-6 py-12">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/40 text-emerald-500 flex items-center justify-center text-3xl">
                    <FiCheck />
                  </div>
                  <div className="flex flex-col gap-2">
                    <h4 className="font-bold text-lg text-slate-900 dark:text-white font-space">
                      {t.clubSuccess}
                    </h4>
                    <p className="text-xs text-slate-400 leading-relaxed font-light">
                      {language === 'en'
                        ? 'We are validating your charter. Your Coordinator will receive login credentials on their email within 2-3 business days.'
                        : 'നിങ്ങൾ സമർപ്പിച്ച രേഖകൾ ഞങ്ങൾ പരിശോധിച്ചുവരികയാണ്. രണ്ട് പ്രവൃത്തി ദിവസങ്ങൾക്കുള്ളിൽ ഇമെയിൽ വഴി കോർഡിനേറ്റർക്ക് വിവരങ്ങൾ ലഭിക്കുന്നതാണ്.'}
                    </p>
                  </div>
                </div>
              )}

            </div>
          </div>
        )}

      </div>
    </section>
  );
}
