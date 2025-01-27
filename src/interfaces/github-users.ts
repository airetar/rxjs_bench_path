import { GithubUser } from "./github-user";

export interface GitHubUsers {
    total_count:        number;
    incomplete_results: boolean;
    items:              GithubUser[];
}
