import React from 'react';
import { VideoRecorder } from './components/Recorder/VideoRecorder';
import { VideoPlayback } from './components/Preview/VideoPlayback';
import { FeatureList } from './components/Features/FeatureList';
import { AdvancedControls } from './components/Controls/AdvancedControls';
import { WalkthroughTutorial } from './components/Tutorial/WalkthroughTutorial';
import { HelpCircle } from 'lucide-react';
import { SaaSPage } from './components/SaaS';
import './index.css';

function App() {
  const [showTutorial, setShowTutorial] = React.useState(true);
  const [hasSeenTutorial, setHasSeenTutorial] = React.useState(false);
  const [showSaaSPage, setShowSaaSPage] = React.useState(false);

  React.useEffect(() => {
    const seen = localStorage.getItem('hasSeenTutorial');
    if (seen) {
      setHasSeenTutorial(true);
      setShowTutorial(false);
    }
  }, []);

  const handleCloseTutorial = () => {
    setShowTutorial(false);
    if (!hasSeenTutorial) {
      localStorage.setItem('hasSeenTutorial', 'true');
      setHasSeenTutorial(true);
    }
  };

  if (showSaaSPage) {
    return <SaaSPage onBack={() => setShowSaaSPage(false)} />;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-6 flex justify-between items-center">
          <h1 className="typing-animation font-bold text-3xl text-transparent bg-clip-text bg-gradient-to-r from-[#E44E51] to-[#D43B3E] text-center">
            AI Screen Recorder
          </h1>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setShowSaaSPage(true)}
              className="px-4 py-2 bg-[#E44E51] text-white rounded-lg hover:bg-[#D43B3E]
                shadow-lg hover:shadow-[#E44E51]/25 transition-colors"
            >
              View Features
            </button>
            <button
              onClick={() => setShowTutorial(true)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <HelpCircle className="w-6 h-6 text-[#E44E51]" />
            </button>
          </div>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <VideoRecorder />
            <FeatureList />
          </div>
          
          <div className="space-y-6">
            <VideoPlayback />
            <AdvancedControls />
          </div>
        </div>
      </main>

      <WalkthroughTutorial
        isOpen={showTutorial}
        onClose={handleCloseTutorial}
      />
    </div>
  );
}

export default App;