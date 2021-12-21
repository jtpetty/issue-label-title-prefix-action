const core = require('@actions/core');
const github = require('@actions/github');
const { correctTitle, parsePrefixMapping, extractKnownPrefixes } = require('./utils');

async function run() {
  try {
    const issue_number = github.context.payload.issue.number;
    const owner = github.context.repo.owner;
    const repo = github.context.repo.repo;
    const label = github.context.payload.label.name;

    // https://help.github.com/en/actions/automating-your-workflow-with-github-actions/authenticating-with-the-github_token#about-the-github_token-secret
    const token = core.getInput('token');
    const octokit = github.getOctokit(token);

    const mappings = parsePrefixMapping(core.getInput('prefixes'));

    if (label in mappings) {
      const prefix = mappings[label];

      const origTitle = github.context.payload.issue.title;
      const knownPrefixes = extractKnownPrefixes(mappings);
      const newTitle  = correctTitle(origTitle, prefix, knownPrefixes);

      if (origTitle !== newTitle) {

	      await octokit.rest.issues.update({
             owner,
             repo,
             issue_number,
             title: newTitle
        });
      }

    } else {
      console.log(`No matching prefix found for label ${label}.`);
    }
  } catch (error) {
    console.error(error);
    core.setFailed(`The issue-label-title-prefix-action action failed with ${error}`);
  }
}

run();
