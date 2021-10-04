const core = require('@actions/core');
const github = require('@actions/github');
const { correctTitle, parsePrefixMapping, extractKnownPrefixes } = require('./utils');

async function run() {
  try {
    const issueNumber = github.context.payload.issue.number;
    const owner = github.context.repo.owner;
    const repo = github.context.repo.repo;
    const label = github.context.payload.label.name;

    // https://help.github.com/en/actions/automating-your-workflow-with-github-actions/authenticating-with-the-github_token#about-the-github_token-secret
    const token = core.getInput('token');
    const octokit = github.getOctokit(token);

    const mappings = parsePrefixMapping(core.getInput('prefixes'));

    if (label in mappings) {
      const prefix = mappings[label];

      const issue = await octokit.issues.get({
        owner,
        repo,
        issueNumber
      });

      const origTitle = issue.title;
      const knownPrefixes = extractKnownPrefixes(mappings);
      const newTitle  = correctTitle(issue.title, prefix, knownPrefixes);

      if (origTitle !== newTitle) {

	await octokit.issues.update({
             owner,
             repo,
             issue_number,
             title: newTitle
        });
      }

    } else {
      console.log("No matching prefix found for label ${label}.");
    }
  } catch (error) {
    console.error(error);
    core.setFailed(`The issue-label-title-prefix-action action failed with ${error}`);
  }
}

run();
