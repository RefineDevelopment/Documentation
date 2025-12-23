import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faTrash, faFileAlt, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { useHistory } from '@docusaurus/router';
import { useAllDocsData } from '@docusaurus/plugin-content-docs/client';
import clsx from 'clsx';

interface SearchResult {
  title: string;
  path: string;
  description?: string;
  category?: string;
  matches?: string[];
}

interface DocData {
  title?: string;
  id?: string;
  description?: string;
  permalink?: string;
  path?: string;
}

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  query: string;
  setQuery: (query: string) => void;
  results: SearchResult[];
  selectedIndex: number;
  setSelectedIndex: (index: number) => void;
  inputRef: React.RefObject<HTMLInputElement>;
  handleResultClick: (path: string) => void;
}

function SearchModal({
  isOpen,
  onClose,
  query,
  setQuery,
  results,
  selectedIndex,
  setSelectedIndex,
  inputRef,
  handleResultClick
}: SearchModalProps) {
  if (!isOpen) return null;

  const portal = (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 999999,
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        padding: '0 1rem',
        paddingTop: '8vh'
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
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
          backdropFilter: 'blur(4px)',
          WebkitBackdropFilter: 'blur(4px)'
        }}
      />

      <div
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '40rem',
          backgroundColor: 'hsl(var(--card))',
          border: '1px solid hsl(var(--border))',
          borderRadius: '0.5rem',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
          overflow: 'hidden'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          padding: '1rem 1.25rem',
          borderBottom: '1px solid hsl(var(--border))'
        }}>
          <FontAwesomeIcon icon={faMagnifyingGlass} style={{ width: '1rem', height: '1rem', color: 'hsl(var(--muted-foreground))' }} />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search documentation..."
            style={{
              flex: 1,
              backgroundColor: 'transparent',
              color: 'hsl(var(--foreground))',
              outline: 'none',
              fontSize: '0.9375rem',
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
                padding: '0.5rem',
                borderRadius: '0.25rem',
                transition: 'background-color 0.15s',
                backgroundColor: 'transparent',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'hsl(var(--secondary))'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
            >
              <FontAwesomeIcon icon={faTrash} style={{ width: '0.875rem', height: '0.875rem', color: 'hsl(var(--muted-foreground))' }} />
            </button>
          )}
        </div>

        <div style={{
          position: 'relative',
          maxHeight: '60vh',
          overflowY: 'auto'
        }}>
          {query.length < 2 ? (
            <div style={{ padding: '2.5rem 1.5rem', textAlign: 'center', color: 'hsl(var(--muted-foreground))' }}>
              <FontAwesomeIcon icon={faMagnifyingGlass} style={{ width: '2.5rem', height: '2.5rem', marginBottom: '1rem', opacity: 0.2 }} />
              <p style={{ fontSize: '0.875rem', margin: 0, lineHeight: 1.5 }}>Type at least 2 characters to search</p>
            </div>
          ) : results.length === 0 ? (
            <div style={{ padding: '2.5rem 1.5rem', textAlign: 'center', color: 'hsl(var(--muted-foreground))' }}>
              <p style={{ fontSize: '0.875rem', margin: 0 }}>No results for &quot;<span style={{ color: 'hsl(var(--primary))', fontWeight: 500 }}>{query}</span>&quot;</p>
            </div>
          ) : (
            <div>
              {results.map((result, index) => (
                <button
                  key={`${result.path}-${index}`}
                  onClick={() => handleResultClick(result.path)}
                  onMouseEnter={() => setSelectedIndex(index)}
                  style={{
                    width: '100%',
                    textAlign: 'left',
                    padding: '0.75rem 1rem',
                    transition: 'background-color 0.1s',
                    backgroundColor: selectedIndex === index ? 'hsl(var(--secondary))' : 'transparent',
                    border: 'none',
                    borderLeft: selectedIndex === index ? '2px solid hsl(var(--primary))' : '2px solid transparent',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '0.75rem'
                  }}
                >
                  <div style={{
                    marginTop: '0.125rem',
                    flexShrink: 0
                  }}>
                    <FontAwesomeIcon
                      icon={faFileAlt}
                      style={{
                        width: '0.875rem',
                        height: '0.875rem',
                        color: selectedIndex === index ? 'hsl(var(--primary))' : 'hsl(var(--muted-foreground))'
                      }}
                    />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                      {result.category && (
                        <>
                          <span style={{
                            fontSize: '0.625rem',
                            padding: '0.125rem 0.375rem',
                            borderRadius: '0.25rem',
                            fontWeight: 500,
                            backgroundColor: 'hsl(var(--muted))',
                            color: 'hsl(var(--muted-foreground))',
                            textTransform: 'uppercase',
                            letterSpacing: '0.025em'
                          }}>
                            {result.category}
                          </span>
                          <FontAwesomeIcon
                            icon={faChevronRight}
                            style={{
                              width: '0.5rem',
                              height: '0.5rem',
                              color: 'hsl(var(--muted-foreground))',
                              opacity: 0.4
                            }}
                          />
                        </>
                      )}
                    </div>
                    <h4 style={{
                      fontWeight: 600,
                      fontSize: '0.8125rem',
                      color: 'hsl(var(--foreground))',
                      margin: '0 0 0.25rem 0',
                      lineHeight: 1.3
                    }}>
                      {result.title}
                    </h4>
                    {result.description && (
                      <p style={{
                        fontSize: '0.6875rem',
                        color: 'hsl(var(--muted-foreground))',
                        lineHeight: 1.4,
                        margin: 0,
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden'
                      }}>
                        {result.description}
                      </p>
                    )}
                    {result.matches && result.matches.length > 0 && (
                      <div style={{ marginTop: '0.375rem', display: 'flex', gap: '0.25rem', flexWrap: 'wrap' }}>
                        {result.matches.slice(0, 3).map((match, i) => (
                          <span
                            key={i}
                            style={{
                              fontSize: '0.625rem',
                              padding: '0.0625rem 0.3125rem',
                              borderRadius: '0.1875rem',
                              backgroundColor: 'hsl(var(--primary) / 0.1)',
                              color: 'hsl(var(--primary))',
                              fontFamily: 'monospace'
                            }}
                          >
                            {match}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {results.length > 0 && (
          <div style={{
            padding: '0.625rem 1rem',
            borderTop: '1px solid hsl(var(--border))',
            backgroundColor: 'hsl(var(--muted) / 0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: '0.6875rem',
            color: 'hsl(var(--muted-foreground))'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                <kbd style={{ padding: '0.0625rem 0.3125rem', fontSize: '0.625rem', backgroundColor: 'hsl(var(--background))', borderRadius: '0.1875rem', border: '1px solid hsl(var(--border))' }}>↑↓</kbd>
                Navigate
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                <kbd style={{ padding: '0.0625rem 0.3125rem', fontSize: '0.625rem', backgroundColor: 'hsl(var(--background))', borderRadius: '0.1875rem', border: '1px solid hsl(var(--border))' }}>↵</kbd>
                Open
              </span>
            </div>
            <span style={{ fontWeight: 500 }}>{results.length} result{results.length !== 1 ? 's' : ''}</span>
          </div>
        )}
      </div>
    </div>
  );

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return ReactDOM.createPortal(portal, document.body) as any;
}

export default function CustomSearch(): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const history = useHistory();
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
    if (query.length < 2) {
      const timer = setTimeout(() => {
        setResults([]);
      }, 0);
      return () => clearTimeout(timer);
    }

    const searchDocs = () => {
      const searchResults: SearchResult[] = [];
      const queryLower = query.toLowerCase();
      const keywords = queryLower.split(/\s+/).filter(k => k.length > 1);

      Object.entries(allDocsData).forEach(([pluginId, pluginData]) => {
        const version = pluginData.versions[0];
        if (!version || !version.docs) return;

        Object.entries(version.docs).forEach(([_docId, doc]) => {
          const typedDoc = doc as DocData;
          const title = typedDoc.title || typedDoc.id || '';
          const description = typedDoc.description || '';
          const id = typedDoc.id || '';
          const permalink = typedDoc.permalink || typedDoc.path || '';

          const titleLower = title.toLowerCase();
          const descLower = description.toLowerCase();
          const matches: string[] = [];

          let score = 0;
          keywords.forEach(keyword => {
            if (titleLower.includes(keyword)) {
              score += 10;
              matches.push(keyword);
            }
            if (descLower.includes(keyword)) {
              score += 5;
              if (!matches.includes(keyword)) matches.push(keyword);
            }
            if (id.toLowerCase().includes(keyword)) {
              score += 3;
            }
          });

          if (score > 0) {
            const pathParts = permalink.split('/').filter(Boolean);
            const category = pathParts[0] || pluginId;

            searchResults.push({
              title: title,
              path: permalink,
              description: description || `Documentation for ${title}`,
              category: category.charAt(0).toUpperCase() + category.slice(1),
              matches: matches.slice(0, 3)
            });
          }
        });
      });

      const uniqueResults = searchResults.filter((result, index, self) =>
        index === self.findIndex((r) => r.path === result.path)
      );

      uniqueResults.sort((a, b) => {
        const aMatches = a.matches?.length || 0;
        const bMatches = b.matches?.length || 0;
        if (aMatches !== bMatches) return bMatches - aMatches;
        return a.title.localeCompare(b.title);
      });

      setResults(uniqueResults.slice(0, 15));
      setSelectedIndex(0);
    };

    const debounce = setTimeout(searchDocs, 200);
    return () => clearTimeout(debounce);
  }, [query, allDocsData]);

  const handleResultClick = React.useCallback((path: string) => {
    history.push(path);
    setIsOpen(false);
    setQuery('');
  }, [history]);

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
  }, [isOpen, results, selectedIndex, handleResultClick]);

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