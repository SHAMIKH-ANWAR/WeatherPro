import React from 'react';
import './styles.css';
import GlobeViz from './GlobeViz';
import { FaGlobeAmericas, FaCloudSun, FaChartLine, FaBolt } from 'react-icons/fa';

function FeatureCard({ icon: Icon, title, description }) {
  return (
    <div className="feature-card bg-white/10 backdrop-blur-md rounded-xl p-6 hover:transform hover:scale-105 transition-all duration-300">
      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-500/20 mb-4">
        <Icon className="w-6 h-6 text-blue-400" />
      </div>
      <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
      <p className="text-white/70">{description}</p>
    </div>
  );
}

function Addcities() {
  const features = [
    {
      icon: FaGlobeAmericas,
      title: "Global Coverage",
      description: "Access weather information for any location worldwide with our comprehensive global coverage."
    },
    {
      icon: FaCloudSun,
      title: "Real-time Updates",
      description: "Stay informed with real-time weather updates and accurate forecasts for your location."
    },
    {
      icon: FaChartLine,
      title: "Detailed Analytics",
      description: "Get detailed weather analytics including temperature, humidity, wind speed, and more."
    },
    {
      icon: FaBolt,
      title: "Instant Alerts",
      description: "Receive instant alerts for severe weather conditions and important updates."
    }
  ];

  return (
    <div className="relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Discover Weather Pro Features
          </h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            Stay informed about weather conditions worldwide with our comprehensive weather tracking and forecasting system.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>

        <div className="mt-16 relative h-[400px] rounded-xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-sm"></div>
          <div className="globe-wrapper absolute inset-0">
            <GlobeViz />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Addcities;
