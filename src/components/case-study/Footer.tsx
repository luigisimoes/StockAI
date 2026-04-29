import React from 'react';
import { Link } from 'react-router-dom';
import { Github, ExternalLink, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-graphite-900 text-white py-16">
      <div className="max-w-[900px] mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <p className="text-[11px] uppercase tracking-widest font-bold text-indigo-300 mb-3">
              About this case study
            </p>
            <p className="text-sm text-graphite-300 leading-relaxed">
              Designed and built by Luigi Simões as part of the Foundey Senior Product Designer challenge. 4 days, solo, PM + PD.
            </p>
          </div>
          <div>
            <p className="text-[11px] uppercase tracking-widest font-bold text-indigo-300 mb-3">
              Links
            </p>
            <div className="space-y-2">
              <Link to="/app" className="flex items-center gap-2 text-sm text-graphite-300 hover:text-white transition-colors">
                <ExternalLink className="w-3.5 h-3.5" strokeWidth={2} />
                <span>Live prototype</span>
              </Link>
              <a href="https://github.com/luigisimoes/StockAI" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm text-graphite-300 hover:text-white transition-colors">
                <Github className="w-3.5 h-3.5" strokeWidth={2} />
                <span>Source on GitHub</span>
              </a>
              <a href="https://luigi.is" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm text-graphite-300 hover:text-white transition-colors">
                <ExternalLink className="w-3.5 h-3.5" strokeWidth={2} />
                <span>luigi.is</span>
              </a>
              <a href="mailto:luigiproduct@gmail.com" className="flex items-center gap-2 text-sm text-graphite-300 hover:text-white transition-colors">
                <Mail className="w-3.5 h-3.5" strokeWidth={2} />
                <span>luigiproduct@gmail.com</span>
              </a>
            </div>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-graphite-700 flex justify-between text-[11px] text-graphite-500 font-mono">
          <span>© 2026 Luigi Simões</span>
          <span>Built with React · Tailwind · Vercel</span>
        </div>
      </div>
    </footer>
  );
}
