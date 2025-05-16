import Parser from "rss-parser";
import { Job, JobsResponse } from "../types/job";

const parser = new Parser();

export async function getJobs(): Promise<JobsResponse> {
  try {
    const feed = await parser.parseURL("https://reactjobs.xyz/jobs.rss");

    const items: Job[] = feed.items.map((item) => {
      // Extract company and location from title if available
      const titleParts = item.title?.split(" - ") || [];
      const company = titleParts.length > 1 ? titleParts[1] : undefined;
      const location = titleParts.length > 2 ? titleParts[2] : undefined;

      return {
        title: item.title || "",
        link: item.link || "",
        pubDate: item.pubDate || new Date().toISOString(),
        description: item.contentSnippet || item.content || "",
        company,
        location,
      };
    });

    return {
      items,
      lastUpdated: new Date().toISOString(),
    };
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return {
      items: [],
      lastUpdated: new Date().toISOString(),
    };
  }
}
