import TabsWidget from './components/TabsWidget';
import GalleryWidget from './components/GalleryWidget';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#373E44] via-[#2B3137] to-[#191B1F] flex">
      {/* Left half intentionally blank on laptop+ widths */}
  <div className="hidden md:block md:w-[52%] xl:w-[58%]"></div>

      {/* Right column pinned with breathing room similar to mock */}
      <div className="w-full md:w-[48%] xl:w-[42%] min-h-screen flex items-start justify-end p-6 md:p-10">
        <div className="w-full max-w-[720px] space-y-8">
          <TabsWidget />
          <div className="divider" />
          <GalleryWidget />
          <div className="divider" />
        </div>
      </div>
    </div>
  );
}

export default App;
