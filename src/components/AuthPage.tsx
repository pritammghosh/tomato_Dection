import { useState } from 'react';
import { motion } from 'framer-motion';

interface AuthPageProps {
  onLogin: () => void;
}

export function AuthPage({ onLogin }: AuthPageProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="min-h-screen bg-[var(--bg-main)] flex items-center justify-center p-4 relative overflow-hidden font-sans">
      {/* Background Decorative Elements */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-[var(--accent)]/20 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/4 -right-20 w-[30rem] h-[30rem] bg-[var(--bg-panel)] rounded-full blur-3xl pointer-events-none"></div>
      
      {/* Abstract 3D-like spheres simulated with CSS */}
      <div className="absolute bottom-10 left-20 w-64 h-64 rounded-full bg-gradient-to-br from-[var(--bg-panel-heavy)] via-[var(--bg-main)] to-[var(--accent)]/40 shadow-[inset_-20px_-20px_60px_rgba(0,0,0,0.1),_20px_40px_60px_rgba(0,0,0,0.1)]"></div>
      <div className="absolute top-20 right-40 w-32 h-32 rounded-full bg-gradient-to-br from-[var(--bg-panel-heavy)] to-[var(--bg-main)] shadow-[inset_-10px_-10px_30px_rgba(0,0,0,0.05),_10px_20px_30px_rgba(0,0,0,0.1)]"></div>

      <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-8 z-10 relative">
        {/* Left Form Card */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="bg-[var(--bg-panel)] backdrop-blur-2xl border border-[var(--border-panel)] p-10 rounded-[2.5rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] flex flex-col justify-between h-[600px]"
        >
          <div className="flex justify-between items-center">
            <span className="text-[var(--text-muted)] font-medium tracking-wide">TomaroLab</span>
            <button className="text-[var(--text-main)] font-medium hover:text-[var(--accent)] transition-colors">Sign up</button>
          </div>

          <div className="space-y-8">
            <div className="flex justify-between items-end">
              <h1 className="text-5xl font-light text-[var(--text-main)]">Log in</h1>
              <button className="px-5 py-2 rounded-full border border-[var(--border-panel)] text-[var(--text-main)] text-sm font-medium hover:bg-[var(--bg-panel-heavy)] transition-colors flex items-center gap-2">
                <span className="w-4 h-4 rounded-full bg-[var(--btn-bg)] text-[var(--btn-text)] flex items-center justify-center text-[10px] font-bold">f</span>
                Facebook
              </button>
            </div>

            <div className="space-y-4 pt-4">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-[var(--text-muted)]">
                  @
                </div>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-6 py-4 bg-[var(--bg-panel-heavy)] border border-[var(--border-panel)] rounded-full focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/50 text-[var(--text-main)] placeholder:text-[var(--text-muted)]"
                  placeholder="e-mail address"
                />
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-[var(--text-muted)]">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"></path></svg>
                </div>
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-24 py-4 bg-[var(--bg-panel-heavy)] border border-[var(--border-panel)] rounded-full focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/50 text-[var(--text-main)] placeholder:text-[var(--text-muted)]"
                  placeholder="password"
                />
                <div className="absolute inset-y-0 right-2 flex items-center">
                  <button className="px-4 py-1.5 bg-[var(--bg-panel)] rounded-full text-xs font-semibold text-[var(--text-main)] shadow-sm hover:shadow-md transition-shadow">
                    I forgot
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-between items-end mt-12">
            <p className="text-[10px] text-[var(--text-muted)] leading-relaxed max-w-[200px]">
              For use by authorized personnel only. Keep out of reach of unauthorized users. In case of system error contact our <a href="#" className="underline hover:text-[var(--text-main)]">hotline</a>.
              <br/><br/>
              Please analyze responsibly!
            </p>
            <button 
              onClick={onLogin}
              className="w-16 h-10 bg-[var(--btn-bg)] rounded-full flex items-center justify-center text-[var(--btn-text)] hover:opacity-80 transition-colors shadow-lg hover:w-20 group"
            >
              <svg className="transform group-hover:translate-x-1 transition-transform" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </button>
          </div>
        </motion.div>

        {/* Right Feature Card */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="bg-[var(--bg-panel-heavy)] rounded-[2.5rem] shadow-xl p-0 flex overflow-hidden h-[600px] relative"
        >
          {/* Left tinted glass section */}
          <div className="w-1/2 h-full bg-[var(--bg-panel)] backdrop-blur-xl border-r border-[var(--border-panel)] p-10 flex flex-col justify-between z-10">
            <div>
              <h2 className="text-6xl font-light text-[var(--text-main)] leading-tight">
                {new Date().toLocaleDateString('en-US', { weekday: 'short' })}<br/>
                <span className="text-[var(--text-muted)]">{new Date().getDate()}th</span>
              </h2>
            </div>
            
            <div className="space-y-1">
              <p className="text-sm font-medium text-[var(--text-main)]">Batch Analysis</p>
              <p className="text-xs text-[var(--text-muted)]">Quality Control Lab</p>
              <p className="text-xs text-[var(--text-muted)]">Amsterdam</p>
            </div>
            
            <div className="flex items-center gap-2 mt-8">
              <div className="w-8 h-8 rounded-full border border-[var(--border-panel)] flex items-center justify-center">
                <div className="w-4 h-4 bg-[var(--text-main)] rounded-full" style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}></div>
              </div>
              <span className="text-xs font-semibold text-[var(--text-main)]">T.Lab</span>
            </div>
          </div>
          
          {/* Right white section with the orange circle */}
          <div className="w-1/2 h-full bg-[var(--bg-panel-heavy)] p-10 flex flex-col justify-between items-end relative overflow-hidden">
            <div className="text-right z-10">
              <p className="text-xs text-[var(--text-main)] font-medium">New capabilities</p>
              <p className="text-xs text-[var(--text-muted)]">v2.4 update</p>
            </div>
            
            <div className="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[var(--accent)] rounded-full z-0"></div>
            
            <button 
              onClick={onLogin}
              className="mt-auto px-6 py-3 bg-[var(--btn-bg)] rounded-full text-[var(--btn-text)] text-sm font-medium hover:opacity-80 transition-colors shadow-lg flex items-center gap-2 z-10"
            >
              Sign in
              <div className="w-6 h-6 bg-[var(--bg-panel-light)] rounded-full flex items-center justify-center text-[10px]">&gt;</div>
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
