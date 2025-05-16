import { getJobs } from '../lib/jobs';
import { Job } from '../types/job';

function JobTable({ jobs }: { jobs: Job[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-cyberpunk-muted">
            <th className="p-4 text-left text-cyberpunk-text font-mono border border-cyberpunk-text">Title</th>
            <th className="p-4 text-left text-cyberpunk-text font-mono border border-cyberpunk-text">Company</th>
            <th className="p-4 text-left text-cyberpunk-text font-mono border border-cyberpunk-text">Location</th>
            <th className="p-4 text-left text-cyberpunk-text font-mono border border-cyberpunk-text">Posted</th>
          </tr>
        </thead>
        <tbody>
          {jobs.map((job, index) => (
            <tr 
              key={job.link} 
              className={`${index % 2 === 0 ? 'bg-cyberpunk-bg' : 'bg-cyberpunk-muted'} hover:bg-cyberpunk-accent/10 transition-colors`}
            >
              <td className="p-4 border border-cyberpunk-text">
                <a 
                  href={job.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-cyberpunk-text hover:text-cyberpunk-secondary font-mono"
                >
                  {job.title}
                </a>
              </td>
              <td className="p-4 text-cyberpunk-text font-mono border border-cyberpunk-text">
                {job.company || 'N/A'}
              </td>
              <td className="p-4 text-cyberpunk-text font-mono border border-cyberpunk-text">
                {job.location || 'Remote'}
              </td>
              <td className="p-4 text-cyberpunk-text font-mono border border-cyberpunk-text">
                {new Date(job.pubDate).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default async function Home() {
  const { items: jobs } = await getJobs();

  return (
    <main className="min-h-screen bg-cyberpunk-bg text-cyberpunk-text p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-mono mb-8 text-cyberpunk-accent">
          React Jobs
        </h1>
        <div className="bg-cyberpunk-muted/50 p-6 rounded-lg border border-cyberpunk-text">
          <JobTable jobs={jobs} />
        </div>
      </div>
    </main>
  );
}
