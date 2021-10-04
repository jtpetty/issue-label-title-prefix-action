# issue-label-title-prefix-action

# GitHub Action - Issue Label Notifications
This Action allows you to prefix and issue title based on a label that is added. It runs every time a label is attached to an issue, and compares the label to the list of prefix mappings that you specify. If a match is found, the action will update the title to have the paired prefix. It will remove any known prefixes from the title.


## Usage
### Pre-requisites
Create a workflow `.yml` file in your repositories `.github/workflows` directory. An [example workflow](#example-workflow) is available below. For more information, reference the GitHub Help Documentation for [Creating a workflow file](https://help.github.com/en/articles/configuring-a-workflow#creating-a-workflow-file).

### Inputs
- `prefixes`: A map of labels and prefixes. Multiple labels can be configured by putting each on a newline. 

### Example workflow

```yaml
name: Update title based on issue labels

on:
  issues:
      types: [labeled]

jobs:
  notify:
    runs-on: ubuntu-latest
    steps:
        - uses: jtpetty/issue-label-title-prefix-action@v1.0
          with:
             prefixes: |
                  bug=🔴
                  feature=🔹
