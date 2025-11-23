import React from 'react';
import EditThisPage from '@theme-original/EditThisPage';
import type { Props } from '@theme/EditThisPage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import clsx from 'clsx';

export default function EditThisPageWrapper(props: Props): JSX.Element {
  const { editUrl } = props;

  if (!editUrl) {
    return <EditThisPage {...props} />;
  }

  return (
    <a
      href={editUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={clsx(
        "inline-flex items-center gap-2 px-4 py-2.5 rounded-lg",
        "bg-primary/10 hover:bg-primary/20 border border-primary/30 hover:border-primary/50",
        "text-primary font-medium text-sm",
        "transition-all duration-200 ease-in-out",
        "hover:shadow-lg hover:shadow-primary/20",
        "no-underline hover:no-underline",
        "group"
      )}
    >
      <FontAwesomeIcon 
        icon={faPenToSquare} 
        className="w-4 h-4 transition-transform duration-200 group-hover:scale-110" 
      />
      <span>Edit this page</span>
      <svg
        className="w-3 h-3 opacity-70 transition-transform duration-200 group-hover:translate-x-0.5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
        />
      </svg>
    </a>
  );
}