
import React from 'react';

interface HeaderProps {
    currentView: 'form' | 'table';
    setView: (view: 'form' | 'table') => void;
}

const Header: React.FC<HeaderProps> = ({ currentView, setView }) => {
    const baseClasses = "px-4 py-2 rounded-md font-semibold transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500";
    const activeClasses = "bg-sky-600 text-white shadow";
    const inactiveClasses = "bg-white text-slate-600 hover:bg-slate-200";

    return (
        <header className="bg-white shadow-md">
            <nav className="max-w-4xl mx-auto p-4 flex justify-between items-center">
                <div className="flex items-center gap-3">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-sky-600">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.125-.504 1.125-1.125V14.25m-17.25 4.5v-1.875a3.375 3.375 0 0 0 3.375-3.375h1.5a1.125 1.125 0 0 1 1.125 1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75V7.5a1.125 1.125 0 0 1 1.125-1.125h1.5a1.125 1.125 0 0 1 1.125 1.125v1.875m-7.5 9.375-3.75-3.75a1.125 1.125 0 0 1 0-1.591l.53-.53c.468-.468 1.229-.468 1.697 0L7.5 15.25l3.75-3.75a1.125 1.125 0 0 1 1.591 0l.53.53c.468.468.468 1.229 0 1.697l-3.75 3.75a1.125 1.125 0 0 1-1.591 0Z" />
                    </svg>
                    <h1 className="text-xl sm:text-2xl font-bold text-slate-800">Reporte T1</h1>
                </div>
                <div className="flex gap-2">
                    <button onClick={() => setView('form')} className={`${baseClasses} ${currentView === 'form' ? activeClasses : inactiveClasses}`}>
                        Registrar
                    </button>
                    <button onClick={() => setView('table')} className={`${baseClasses} ${currentView === 'table' ? activeClasses : inactiveClasses}`}>
                        Consultar
                    </button>
                </div>
            </nav>
        </header>
    );
};

export default Header;