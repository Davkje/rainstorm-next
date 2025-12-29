'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { loadIdeas, Idea } from '../../lib/ideas';
import { loadTemplates } from '@/helpers/storage';

export default function IdeasPage() {
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [templates, setTemplates] = useState(loadTemplates());

  useEffect(() => {
    // delay state update to avoid synchronous setState warning
    const timeout = setTimeout(() => {
      setIdeas(loadIdeas());
    }, 0);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">Ideas</h1>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Create New Idea</h2>
        <div className="flex gap-2">
          {templates.map(t => (
            <Link
              key={t.id}
              href={`/ideas/create/${t.id}`}
              className="px-3 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              {t.name}
            </Link>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2">Existing Ideas</h2>
        {ideas.length === 0 ? (
          <p>No ideas yet.</p>
        ) : (
          <ul className="list-disc pl-5">
            {ideas.map(i => (
              <li key={i.id} className="mb-1">
                <Link href={`/ideas/${i.id}`} className="text-blue-600 hover:underline">
                  {i.name}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
