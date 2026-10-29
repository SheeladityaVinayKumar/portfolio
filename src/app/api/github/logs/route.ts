import { NextResponse } from "next/server";

export async function GET() {
  try {
    const owner = "SheeladityaVinayKumar";
    const repo = "portfolio";
    const headers: HeadersInit = {
      Accept: "application/vnd.github.v3+json",
      "User-Agent": "Portfolio-App"
    };

    if (process.env.GITHUB_TOKEN) {
      headers["Authorization"] = `Bearer ${process.env.GITHUB_TOKEN}`;
    }

    // 1. Fetch recent commits
    const commitsRes = await fetch(`https://api.github.com/repos/${owner}/${repo}/commits?per_page=5`, {
      headers,
      next: { revalidate: 300 } // Cache for 5 mins
    });

    let commits = [];
    if (commitsRes.ok) {
      const commitsData = await commitsRes.json();
      commits = commitsData.map((c: {
        sha: string;
        commit: {
          message: string;
          author: {
            name: string;
            date: string;
          };
        };
        html_url: string;
      }) => ({
        sha: c.sha.substring(0, 7),
        message: c.commit.message,
        author: c.commit.author.name,
        date: c.commit.author.date,
        url: c.html_url
      }));
    }

    // 2. Fetch recent GitHub Actions workflow runs
    const runsRes = await fetch(`https://api.github.com/repos/${owner}/${repo}/actions/runs?per_page=5`, {
      headers,
      next: { revalidate: 60 }
    });

    let workflowRuns = [];
    if (runsRes.ok) {
      const runsData = await runsRes.json();
      workflowRuns = (runsData.workflow_runs || []).map((run: {
        id: number;
        name: string;
        status: string;
        conclusion: string | null;
        created_at: string;
        html_url: string;
        head_commit: {
          message: string;
        };
      }) => ({
        id: run.id,
        name: run.name,
        status: run.status, // completed, in_progress, queued
        conclusion: run.conclusion, // success, failure, cancelled
        createdAt: run.created_at,
        url: run.html_url,
        message: run.head_commit?.message || ""
      }));
    }

    return NextResponse.json({
      success: true,
      repo: `${owner}/${repo}`,
      commits,
      workflowRuns
    });
  } catch (error) {
    console.error("[GitHub Logs API Error]:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch GitHub logs and workflow runs." },
      { status: 500 }
    );
  }
}
