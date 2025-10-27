import { useState } from 'react';
import { HelpCircle, Grid3X3 } from 'lucide-react';

type Tab = 'about' | 'experiences' | 'recommended';

export default function TabsWidget() {
  const [activeTab, setActiveTab] = useState<Tab>('about');

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-6">
        <div className="w-6 h-6 flex items-center justify-center">
          <HelpCircle className="w-5 h-5 text-gray-500" />
        </div>

        <div className="flex-1 mx-4">
          <div className="bg-[#171717] rounded-[20px] p-1.5 flex gap-1 shadow-insetSoft border border-white/5">
            <button
              onClick={() => setActiveTab('about')}
              className={`flex-1 px-6 py-3 rounded-[16px] text-[15px] font-medium transition-all ${
                activeTab === 'about'
                  ? 'bg-[#28292F] text-white shadow-[inset_0_6px_14px_rgba(0,0,0,0.55)] border border-white/5'
                  : 'text-[#A3ADB2] hover:text-white'
              }`}
            >
              About Me
            </button>
            <button
              onClick={() => setActiveTab('experiences')}
              className={`flex-1 px-6 py-3 rounded-[16px] text-[15px] font-medium transition-all ${
                activeTab === 'experiences'
                  ? 'bg-[#28292F] text-white shadow-[inset_0_6px_14px_rgba(0,0,0,0.55)] border border-white/5'
                  : 'text-[#A3ADB2] hover:text-white'
              }`}
            >
              Experiences
            </button>
            <button
              onClick={() => setActiveTab('recommended')}
              className={`flex-1 px-6 py-3 rounded-[16px] text-[15px] font-medium transition-all ${
                activeTab === 'recommended'
                  ? 'bg-[#28292F] text-white shadow-[inset_0_6px_14px_rgba(0,0,0,0.55)] border border-white/5'
                  : 'text-[#A3ADB2] hover:text-white'
              }`}
            >
              Recommended
            </button>
          </div>
        </div>
        {/* Removed profile/placeholder square to match expected UI */}
      </div>

      <div className="h-[280px] pr-2">
        <div className="flex h-full gap-4">
          {/* left small grid icon to match mock */}
          <div className="pt-2 pl-1 pr-2 text-gray-500 shrink-0 flex">
            <Grid3X3 className="w-6 h-6 opacity-70" />
          </div>
          <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
            {activeTab === 'about' && (
              <div className="text-[#C2C7CC] text-[15px] leading-[1.8] space-y-6">
                <p>
                  Hello! I'm Dave, your sales rep here from Salesforce. I've been working at this awesome company for 3 years now.
                </p>
                <p>
                  I was born and raised in Albany, NY & have been living in Santa Carla for the past 10 years my wife Tiffany and my 4 year old twin daughters- Emma and Ella. Both of them are just starting school, so my calender is usually blocked between 9-10 AM. This is a...
                </p>
              </div>
            )}
            {activeTab === 'experiences' && (
              <div className="text-[#C2C7CC] text-[15px] leading-[1.8] space-y-6">
                <p>
                  I have over 10 years of experience in enterprise software sales, specializing in cloud solutions and digital transformation.
                </p>
                <p>
                  Throughout my career, I've worked with Fortune 500 companies to implement scalable CRM systems that have increased productivity by up to 40%.
                </p>
              </div>
            )}
            {activeTab === 'recommended' && (
              <div className="text-[#C2C7CC] text-[15px] leading-[1.8] space-y-6">
                <p>
                  Based on your business needs, I'd recommend starting with our Enterprise package which includes advanced analytics and AI-powered insights.
                </p>
                <p>
                  Many of our clients have seen significant ROI within the first 6 months of implementation.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
