import { NextResponse } from "next/server";

export async function GET() {
  const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
  const GITHUB_USERNAME = process.env.GITHUB_USERNAME;

  if (!GITHUB_TOKEN) {
    return NextResponse.json(
      {
        error:
          "GitHub token not configured. Please add GITHUB_TOKEN and GITHUB_USERNAME to your .env.local file.",
        data: null,
      },
      { status: 200 },
    ); // Return 200 to allow frontend to show a friendly "setup" message
  }

  const query = `
    query($username: String!) {
      user(login: $username) {
        contributionsCollection {
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                contributionCount
                date
                color
              }
            }
          }
        }
        pullRequests(first: 100) {
          totalCount
        }
        openPRs: pullRequests(states: OPEN) {
          totalCount
        }
        closedPRs: pullRequests(states: CLOSED) {
          totalCount
        }
        mergedPRs: pullRequests(states: MERGED) {
          totalCount
        }
        repositoriesContributedTo(first: 10, contributionTypes: [COMMIT, ISSUE, PULL_REQUEST, REPOSITORY]) {
          totalCount
        }
        repositories(first: 100, ownerAffiliations: OWNER, isFork: false) {
          totalCount
        }
      }
    }
  `;

  try {
    const response = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query,
        variables: { username: GITHUB_USERNAME },
      }),
      next: { revalidate: 3600 }, // Cache for 1 hour
    });

    const result = await response.json();

    if (result.errors) {
      console.error("GitHub API errors:", result.errors);
      return NextResponse.json(
        { error: "GitHub API error", data: null },
        { status: 500 },
      );
    }
    // console.log("data", result.data.user);

    return NextResponse.json({
      success: true,
      data: result.data.user,
    });
  } catch (error) {
    console.error("Failed to fetch GitHub data:", error);
    return NextResponse.json(
      { error: "Failed to fetch GitHub data", data: null },
      { status: 500 },
    );
  }
}
