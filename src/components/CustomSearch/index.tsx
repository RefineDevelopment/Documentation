import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faXmark, faFileAlt } from '@fortawesome/free-solid-svg-icons';
import { useHistory } from '@docusaurus/router';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { useAllDocsData } from '@docusaurus/plugin-content-docs/client';
import clsx from 'clsx';

interface SearchResult {
  title: string;
  path: string;
  description?: string;
  category?: string;
}

function SearchModal({ isOpen, onClose, query, setQuery, results, selectedIndex, setSelectedIndex, inputRef, handleResultClick }: any) {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 999999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0 1rem'
      }}
      onClick={onClose}
    >
      <div 
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.9)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)'
        }}
      />
      
      <div
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '48rem',
          backgroundColor: 'hsl(0 0% 6%)',
          border: '1px solid rgba(233, 30, 99, 0.3)',
          borderRadius: '1rem',
          boxShadow: '0 0 80px rgba(233, 30, 99, 0.4), 0 20px 60px rgba(0, 0, 0, 0.6)',
          overflow: 'hidden'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div 
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            borderRadius: '1rem',
            background: 'linear-gradient(135deg, rgba(233, 30, 99, 0.1) 0%, transparent 50%, rgba(233, 30, 99, 0.05) 100%)',
            pointerEvents: 'none'
          }}
        />
        
        <div style={{ 
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          padding: '1.25rem',
          borderBottom: '1px solid rgba(233, 30, 99, 0.2)'
        }}>
          <FontAwesomeIcon icon={faMagnifyingGlass} style={{ width: '1.25rem', height: '1.25rem', color: 'rgb(233, 30, 99)' }} />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search documentation..."
            style={{
              flex: 1,
              backgroundColor: 'transparent',
              color: 'hsl(0 0% 98%)',
              outline: 'none',
              fontSize: '1.125rem',
              border: 'none'
            }}
          />
          {query && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setQuery('');
              }}
              style={{
                padding: '0.375rem',
                borderRadius: '0.5rem',
                transition: 'background-color 0.2s',
                backgroundColor: 'transparent',
                border: 'none',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(233, 30, 99, 0.1)'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
            >
              <FontAwesomeIcon icon={faXmark} style={{ width: '1rem', height: '1rem', color: 'hsl(0 0% 65%)' }} />
            </button>
          )}
          <button
            onClick={onClose}
            style={{
              padding: '0.5rem',
              borderRadius: '0.5rem',
              transition: 'background-color 0.2s',
              backgroundColor: 'transparent',
              border: 'none',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(233, 30, 99, 0.1)'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
          >
            <FontAwesomeIcon icon={faXmark} style={{ width: '1.25rem', height: '1.25rem', color: 'hsl(0 0% 65%)' }} />
          </button>
        </div>

        <div style={{ 
          position: 'relative',
          maxHeight: '65vh',
          overflowY: 'auto'
        }}>
          {query.length < 1 ? (
            <div style={{ padding: '3rem', textAlign: 'center', color: 'hsl(0 0% 65%)' }}>
              <FontAwesomeIcon icon={faMagnifyingGlass} style={{ width: '4rem', height: '4rem', marginBottom: '1.5rem', opacity: 0.3, color: 'rgb(233, 30, 99)' }} />
              <p style={{ fontSize: '1.125rem', marginBottom: '0.75rem' }}>Start typing to search documentation</p>
              <p style={{ fontSize: '0.875rem' }}>
                Use <kbd style={{ padding: '0.25rem 0.5rem', fontSize: '0.75rem', backgroundColor: 'hsl(0 0% 10%)', borderRadius: '0.25rem', border: '1px solid hsl(0 0% 15%)', margin: '0 0.25rem' }}>↑↓</kbd> to navigate,{' '}
                <kbd style={{ padding: '0.25rem 0.5rem', fontSize: '0.75rem', backgroundColor: 'hsl(0 0% 10%)', borderRadius: '0.25rem', border: '1px solid hsl(0 0% 15%)', margin: '0 0.25rem' }}>Enter</kbd> to select,{' '}
                <kbd style={{ padding: '0.25rem 0.5rem', fontSize: '0.75rem', backgroundColor: 'hsl(0 0% 10%)', borderRadius: '0.25rem', border: '1px solid hsl(0 0% 15%)', margin: '0 0.25rem' }}>Esc</kbd> to close
              </p>
            </div>
          ) : results.length === 0 ? (
            <div style={{ padding: '3rem', textAlign: 'center', color: 'hsl(0 0% 65%)' }}>
              <p style={{ fontSize: '1.125rem' }}>No results found for "<span style={{ color: 'rgb(233, 30, 99)', fontWeight: 600 }}>{query}</span>"</p>
              <p style={{ fontSize: '0.875rem', marginTop: '0.5rem' }}>Try different keywords</p>
            </div>
          ) : (
            <div style={{ padding: '0.5rem 0' }}>
              {results.map((result, index) => (
                <button
                  key={`${result.path}-${index}`}
                  onClick={() => handleResultClick(result.path)}
                  onMouseEnter={() => setSelectedIndex(index)}
                  style={{
                    width: '100%',
                    textAlign: 'left',
                    padding: '1rem 1.25rem',
                    transition: 'all 0.2s',
                    borderLeft: selectedIndex === index ? '4px solid rgb(233, 30, 99)' : '4px solid transparent',
                    backgroundColor: selectedIndex === index ? 'rgba(233, 30, 99, 0.15)' : 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    display: 'block'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                    <div style={{
                      width: '2.5rem',
                      height: '2.5rem',
                      borderRadius: '0.5rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      backgroundColor: selectedIndex === index ? 'rgba(233, 30, 99, 0.2)' : 'hsl(0 0% 10%)'
                    }}>
                      <FontAwesomeIcon 
                        icon={faFileAlt} 
                        style={{
                          width: '1.25rem',
                          height: '1.25rem',
                          color: selectedIndex === index ? 'rgb(233, 30, 99)' : 'hsl(0 0% 65%)'
                        }} 
                      />
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                        <h4 style={{
                          fontWeight: 600,
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                          fontSize: '1rem',
                          color: selectedIndex === index ? 'rgb(233, 30, 99)' : 'hsl(0 0% 98%)',
                          margin: 0
                        }}>
                          {result.title}
                        </h4>
                        {result.category && (
                          <span style={{
                            fontSize: '0.75rem',
                            padding: '0.25rem 0.625rem',
                            borderRadius: '9999px',
                            fontWeight: 500,
                            flexShrink: 0,
                            backgroundColor: selectedIndex === index ? 'rgba(233, 30, 99, 0.2)' : 'hsl(0 0% 10%)',
                            color: selectedIndex === index ? 'rgb(233, 30, 99)' : 'hsl(0 0% 65%)'
                          }}>
                            {result.category}
                          </span>
                        )}
                      </div>
                      {result.description && (
                        <p style={{
                          fontSize: '0.875rem',
                          color: 'hsl(0 0% 65%)',
                          lineHeight: '1.5',
                          margin: 0,
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden'
                        }}>
                          {result.description}
                        </p>
                      )}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {results.length > 0 && (
          <div style={{
            position: 'relative',
            padding: '1rem 1.25rem',
            borderTop: '1px solid rgba(233, 30, 99, 0.2)',
            backgroundColor: 'rgba(0, 0, 0, 0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: '0.75rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: 'hsl(0 0% 65%)' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                <kbd style={{ padding: '0.25rem 0.5rem', backgroundColor: 'hsl(0 0% 6%)', borderRadius: '0.25rem', border: '1px solid hsl(0 0% 15%)' }}>↑↓</kbd>
                Navigate
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                <kbd style={{ padding: '0.25rem 0.5rem', backgroundColor: 'hsl(0 0% 6%)', borderRadius: '0.25rem', border: '1px solid hsl(0 0% 15%)' }}>Enter</kbd>
                Select
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                <kbd style={{ padding: '0.25rem 0.5rem', backgroundColor: 'hsl(0 0% 6%)', borderRadius: '0.25rem', border: '1px solid hsl(0 0% 15%)' }}>Esc</kbd>
                Close
              </span>
            </div>
            <span style={{ color: 'rgb(233, 30, 99)', fontWeight: 500 }}>{results.length} result{results.length !== 1 ? 's' : ''}</span>
          </div>
        )}
      </div>
    </div>,
    document.body
  );
}

export default function CustomSearch(): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const history = useHistory();
  const { siteConfig } = useDocusaurusContext();
  const allDocsData = useAllDocsData();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(true);
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    if (query.length < 1) {
      setResults([]);
      return;
    }

    const searchDocs = () => {
      const searchResults: SearchResult[] = [];
      const queryLower = query.toLowerCase();

      Object.entries(allDocsData).forEach(([pluginId, pluginData]) => {
        const version = pluginData.versions[0];
        if (!version || !version.docs) return;

        Object.entries(version.docs).forEach(([docId, doc]: [string, any]) => {
          const title = doc.title || doc.id || '';
          const description = doc.description || '';
          const id = doc.id || '';
          const permalink = doc.permalink || doc.path || '';
          
          const titleMatch = title.toLowerCase().includes(queryLower);
          const descMatch = description.toLowerCase().includes(queryLower);
          const idMatch = id.toLowerCase().includes(queryLower);
          const pathMatch = permalink.toLowerCase().includes(queryLower);
          
          if (titleMatch || descMatch || idMatch || pathMatch) {
            const pathParts = permalink.split('/').filter(Boolean);
            const category = pathParts[0] || pluginId;
            
            searchResults.push({
              title: title,
              path: permalink,
              description: description || `Documentation for ${title}`,
              category: category.charAt(0).toUpperCase() + category.slice(1),
            });
          }
        });
      });

      const uniqueResults = searchResults.filter((result, index, self) =>
        index === self.findIndex((r) => r.path === result.path)
      );

      uniqueResults.sort((a, b) => {
        const aInTitle = a.title.toLowerCase().includes(queryLower);
        const bInTitle = b.title.toLowerCase().includes(queryLower);
        if (aInTitle && !bInTitle) return -1;
        if (!aInTitle && bInTitle) return 1;
        return a.title.localeCompare(b.title);
      });

      setResults(uniqueResults.slice(0, 20));
      setSelectedIndex(0);
    };

    const debounce = setTimeout(searchDocs, 150);
    return () => clearTimeout(debounce);
  }, [query, allDocsData]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(prev => Math.min(prev + 1, results.length - 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(prev => Math.max(prev - 1, 0));
      } else if (e.key === 'Enter' && results[selectedIndex]) {
        e.preventDefault();
        handleResultClick(results[selectedIndex].path);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, results, selectedIndex]);

  const handleResultClick = (path: string) => {
    history.push(path);
    setIsOpen(false);
    setQuery('');
  };

  const handleClose = () => {
    setIsOpen(false);
    setQuery('');
    setResults([]);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className={clsx(
          "flex items-center gap-2 px-3 py-2 rounded-full",
          "bg-card border border-border",
          "text-muted-foreground hover:text-foreground",
          "transition-all duration-200",
          "hover:border-primary/50",
          "text-sm"
        )}
      >
        <FontAwesomeIcon icon={faMagnifyingGlass} className="w-4 h-4 text-foreground" />
        <span className="hidden md:inline">Search</span>
        <kbd className="hidden md:inline-flex items-center gap-1 px-2 py-0.5 text-xs bg-muted rounded border border-border">
          <span>⌘</span>
          <span>K</span>
        </kbd>
      </button>

      <SearchModal
        isOpen={isOpen}
        onClose={handleClose}
        query={query}
        setQuery={setQuery}
        results={results}
        selectedIndex={selectedIndex}
        setSelectedIndex={setSelectedIndex}
        inputRef={inputRef}
        handleResultClick={handleResultClick}
      />
    </>
  );
}