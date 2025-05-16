export interface Job {
  title: string;
  link: string;
  pubDate: string;
  description: string;
  company?: string;
  location?: string;
  salary?: string;
}

export interface JobsResponse {
  items: Job[];
  lastUpdated: string;
}
