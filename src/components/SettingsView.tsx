import { type ChangeEvent } from 'react';
import { motion } from 'framer-motion';
import { X, Moon, Sun, Sliders, Bell, Download, Monitor } from 'lucide-react';
import { AppSettings } from '../types';

interface SettingsViewProps {
  settings: AppSettings;
  onUpdateSettings: (settings: AppSettings) => void;
  onClose: () => void;
}

export function SettingsView({ settings, onUpdateSettings, onClose }: SettingsViewProps) {
  const handleToggleTheme = () => {
    onUpdateSettings({
      ...settings,
      theme: settings.theme === 'dark' ? 'light' : 'dark'
    });
  };

  const handleToggleSound = () => {
    onUpdateSettings({
      ...settings,
      soundEnabled: !settings.soundEnabled
    });
  };

  const handleToggleExport = () => {
    onUpdateSettings({
      ...settings,
      autoExport: !settings.autoExport
    });
  };

  const handleThresholdChange = (e: ChangeEvent<HTMLInputElement>) => {
    onUpdateSettings({
      ...settings,
      confidenceThreshold: parseInt(e.target.value, 10)
    });
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-[#1a1a1a]/40 dark:bg-black/60 backdrop-blur-sm flex justify-end"
    >
      <motion.div 
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="w-full max-w-md h-full bg-[var(--bg-main)] shadow-2xl flex flex-col"
      >
        <div className="px-8 py-6 bg-[var(--bg-panel)] backdrop-blur-xl border-b border-[var(--border-panel)] flex justify-between items-center shrink-0">
          <div>
            <h2 className="text-2xl font-light text-[var(--text-main)]">Settings</h2>
            <p className="text-xs text-[var(--text-muted)] mt-1 font-medium tracking-widest uppercase">System Preferences</p>
          </div>
          <button 
            onClick={onClose}
            className="w-10 h-10 bg-[var(--bg-panel-heavy)] rounded-full flex items-center justify-center text-[var(--text-main)] shadow-sm hover:bg-[var(--btn-bg)] hover:text-[var(--btn-text)] transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar p-8 space-y-8">
          
          {/* Appearance Section */}
          <section>
            <h3 className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-widest mb-4 flex items-center gap-2">
              <Monitor size={14} /> Appearance
            </h3>
            <div className="bg-[var(--bg-panel)] backdrop-blur-md border border-[var(--border-panel)] rounded-3xl p-2 flex gap-2">
              <button
                onClick={() => onUpdateSettings({ ...settings, theme: 'light' })}
                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl text-sm font-medium transition-colors ${
                  settings.theme === 'light' 
                    ? 'bg-white shadow-sm text-[#1a1a1a]' 
                    : 'text-[var(--text-muted)] hover:bg-[var(--bg-panel-heavy)]'
                }`}
              >
                <Sun size={16} /> Light
              </button>
              <button
                onClick={() => onUpdateSettings({ ...settings, theme: 'dark' })}
                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl text-sm font-medium transition-colors ${
                  settings.theme === 'dark' 
                    ? 'bg-[#1a1a1a] shadow-sm text-white' 
                    : 'text-[var(--text-muted)] hover:bg-[var(--bg-panel-heavy)]'
                }`}
              >
                <Moon size={16} /> Dark
              </button>
            </div>
          </section>

          {/* Analysis Section */}
          <section>
            <h3 className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-widest mb-4 flex items-center gap-2">
              <Sliders size={14} /> Analysis Tuning
            </h3>
            <div className="bg-[var(--bg-panel)] backdrop-blur-md border border-[var(--border-panel)] rounded-3xl p-6">
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm font-medium text-[var(--text-main)]">Confidence Threshold</span>
                <span className="text-xs font-mono font-bold text-[var(--accent)]">{settings.confidenceThreshold}%</span>
              </div>
              <input 
                type="range" 
                min="50" max="99" 
                value={settings.confidenceThreshold} 
                onChange={handleThresholdChange}
                className="w-full accent-[var(--accent)] h-1.5 bg-[var(--border-panel)] rounded-full appearance-none outline-none"
              />
              <div className="flex justify-between text-[10px] text-[var(--text-muted)] font-medium mt-2">
                <span>Lower Precision</span>
                <span>High Precision</span>
              </div>
            </div>
          </section>

          {/* System Section */}
          <section>
            <h3 className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-widest mb-4 flex items-center gap-2">
              <Bell size={14} /> System
            </h3>
            <div className="bg-[var(--bg-panel)] backdrop-blur-md border border-[var(--border-panel)] rounded-3xl p-2 space-y-2">
              
              <div className="flex items-center justify-between p-4 bg-[var(--bg-panel-heavy)] rounded-2xl">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[var(--bg-panel)] flex items-center justify-center text-[var(--text-main)]">
                    <Download size={14} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-[var(--text-main)]">Auto-export Reports</p>
                    <p className="text-[10px] text-[var(--text-muted)]">Save PDF automatically on completion</p>
                  </div>
                </div>
                <button 
                  onClick={handleToggleExport}
                  className={`w-12 h-6 rounded-full p-1 transition-colors ${settings.autoExport ? 'bg-[#2e9e4a]' : 'bg-[var(--border-panel)]'}`}
                >
                  <motion.div 
                    layout
                    className="w-4 h-4 bg-white rounded-full shadow-sm"
                    initial={false}
                    animate={{ x: settings.autoExport ? 24 : 0 }}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between p-4 bg-[var(--bg-panel-heavy)] rounded-2xl">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[var(--bg-panel)] flex items-center justify-center text-[var(--text-main)]">
                    <Bell size={14} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-[var(--text-main)]">Sound Notifications</p>
                    <p className="text-[10px] text-[var(--text-muted)]">Play chime when analysis finishes</p>
                  </div>
                </div>
                <button 
                  onClick={handleToggleSound}
                  className={`w-12 h-6 rounded-full p-1 transition-colors ${settings.soundEnabled ? 'bg-[#ff7f3f]' : 'bg-[var(--border-panel)]'}`}
                >
                  <motion.div 
                    layout
                    className="w-4 h-4 bg-white rounded-full shadow-sm"
                    initial={false}
                    animate={{ x: settings.soundEnabled ? 24 : 0 }}
                  />
                </button>
              </div>

            </div>
          </section>

        </div>
      </motion.div>
    </motion.div>
  );
}
