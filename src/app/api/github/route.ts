import { NextResponse } from "next/server";

export async function GET() {
  try {
    const username = "SheeladityaVinayKumar";
    const headers: HeadersInit = {
      Accept: "application/vnd.github.v3+json",
      "User-Agent": "Portfolio-App"
    };

    // If you add a GITHUB_TOKEN in Vercel env vars later, it increases API rate limit from 60 to 5000 requests/hour
    if (process.env.GITHUB_TOKEN) {
      headers["Authorization"] = `Bearer ${process.env.GITHUB_TOKEN}`;
    }

    const userRes = await fetch(`https://api.github.com/users/${username}`, {
      headers,
      next: { revalidate: 3600 } // Cache for 1 hour
    });

    if (!userRes.ok) {
      throw new Error(`GitHub user API returned ${userRes.status}`);
    }

    const userData = await userRes.json();

    const reposRes = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=6`, {
      headers,
      next: { revalidate: 3600 }
    });

    if (!reposRes.ok) {
      throw new Error(`GitHub repos API returned ${reposRes.status}`);
    }

    const reposData = await reposRes.json();

    const repositories = reposData.map((repo: {
      id: number;
      name: string;
      description: string | null;
      html_url: string;
      stargazers_count: number;
      forks_count: number;
      language: string | null;
      updated_at: string;
    }) => ({
      id: repo.id,
      name: repo.name,
      description: repo.description,
      url: repo.html_url,
      stars: repo.stargazers_count,
      forks: repo.forks_count,
      language: repo.language,
      updatedAt: repo.updated_at
    }));

    return NextResponse.json({
      success: true,
      profile: {
        name: userData.name,
        username: userData.login,
        avatar: userData.avatar_url,
        bio: userData.bio,
        publicRepos: userData.public_repos,
        followers: userData.followers,
        following: userData.following,
        profileUrl: userData.html_url
      },
      repositories
    });
  } catch (error) {
    console.error("[GitHub API Error]:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch GitHub data." },
      { status: 500 }
    );
  }
}
