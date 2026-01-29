# GitHub Actions Workflows

## Release Workflow

The release workflow uses [Changesets](https://github.com/changesets/changesets) to manage versioning and publishing.

### Setup Required

To allow the release workflow to create pull requests, you need to create a Personal Access Token (PAT) and add it as a repository secret:

1. **Create a Personal Access Token:**
   - Go to GitHub Settings → Developer settings → Personal access tokens → Tokens (classic)
   - Click "Generate new token (classic)"
   - Give it a descriptive name like "Changesets Release"
   - Select the `repo` scope (full control of private repositories)
   - Generate the token and copy it

2. **Add the token as a repository secret:**
   - Go to your repository Settings → Secrets and variables → Actions
   - Click "New repository secret"
   - Name: `CHANGESETS_TOKEN`
   - Value: Paste your PAT
   - Click "Add secret"

### Why is this needed?

GitHub Actions has a security restriction that prevents the default `GITHUB_TOKEN` from creating or approving pull requests in workflows triggered by push events. This is to prevent infinite automation loops.

The release workflow needs to create PRs for version bumps, so it requires a PAT with appropriate permissions.

### Fallback Behavior

If the `CHANGESETS_TOKEN` secret is not configured, the workflow will fall back to using the default `GITHUB_TOKEN`. In this case:
- It can still publish to npm if there's a version bump ready
- It will fail when trying to create release PRs with the error: "GitHub Actions is not permitted to create or approve pull requests"
