# Claude Code Agent Instructions for Ratel Docs

## Project Overview

This repository (`ratel-docs`) is the **documentation website** for the Ratel platform. It is NOT the main application codebase.

- **Purpose**: Documentation and guides for Ratel users
- **Tech Stack**: Docusaurus 3.3.2 + Decap CMS + AWS (S3/CloudFront)
- **Production URL**: https://docs.ratel.foundation
- **Admin Panel**: https://docs.ratel.foundation/admin

## Related Repositories

### Main Ratel Application
- **Location**: `/home/hackartist/data/devel/github.com/biyard/ratel/`
- **Endpoint**: https://dev.ratel.foundation
- **Frontend Code**: `ts-packages/web/` (within main ratel directory)

This documentation repository should be updated to reflect features, APIs, and guides for the main Ratel application.

## Development Workflow

### Local Development
```bash
npm start              # Start dev server (http://localhost:3000)
npm run build          # Build static site
npm run serve          # Serve built site locally
```

### Content Editing

**Option 1: Decap CMS (Web UI)**
- Navigate to `/admin` in browser
- Login with GitHub OAuth
- Create/edit content through visual editor
- Creates PR to `dev` branch

**Option 2: Direct File Editing**
- English docs: `docs/` directory
- Korean docs: `i18n/ko/docusaurus-plugin-content-docs/current/` directory
- Commit directly to repository

### Deployment

```bash
make deploy           # Deploy CDK infrastructure (API Gateway, Lambda, S3, CloudFront)
make sync             # Build and sync to S3, invalidate CloudFront cache
```

**CI/CD**: GitHub Actions automatically deploys on push to `main` branch

## Using Playwright for Testing

You can use Playwright to test the Ratel application by navigating to the local endpoint:

```javascript
// Navigate to local Ratel instance
await page.goto('https://dev.ratel.foundation');

// Or for docs site
await page.goto('http://localhost:3000');
```

Use Playwright to walk through the main Ratel application UI and verify that documentation matches the actual user experience.

## Content Structure

```
docs/
├── intro.md                    # Root page (/)
├── getting-started/            # Getting started guides
├── guide/                      # User guides
└── spaces/                     # Spaces feature documentation

i18n/ko/docusaurus-plugin-content-docs/current/
└── (mirrors docs/ structure)   # Korean translations
```

## Key Workflows for Documentation Updates

### When Adding New Features to Ratel
1. Implement feature in `/home/hackartist/data/devel/github.com/biyard/ratel/`
2. Test feature at http://localhost:8080
3. Create/update documentation in this repository (`docs/` directory)
4. Optionally use Playwright to capture screenshots for docs
5. Build and verify docs locally (`npm start`)
6. Commit and push to create PR

### When Updating API Documentation
1. Review API changes in main Ratel codebase (`ts-packages/web/` or backend)
2. Update relevant documentation pages
3. Ensure code examples are accurate and tested
4. Update both English and Korean versions if applicable

## Important Notes

- **Branch Strategy**: Work on `dev` branch, merge to `main` for production deployment
- **Localization**: Always consider if content should be translated to Korean
- **Images**: Store in `static/img/uploads/` or `docs/` subdirectories
- **Cross-References**: Use relative links between documentation pages
- **Screenshots**: Keep screenshots up-to-date with actual UI from https://dev.ratel.foundation

## AWS Infrastructure

The documentation site is hosted on AWS:
- **S3 Bucket**: Static files
- **CloudFront**: CDN distribution
- **API Gateway + Lambda**: GitHub OAuth proxy for Decap CMS
- **Region**: us-east-1
- **Stack Name**: `ratel-{ENV}-docs`

## Common Tasks

### Add a New Documentation Page
```bash
# Create English version
touch docs/category-name/page-name.md

# Add frontmatter
---
title: Page Title
description: Brief description
sidebar_position: 2
---

# Or use Decap CMS at /admin
```

### Update Navigation/Sidebar
Edit `sidebars.ts` or create `_category_.json` files in subdirectories

### Test Documentation Locally with Ratel Running
```bash
# Terminal 1: Start Ratel application
cd /home/hackartist/data/devel/github.com/biyard/ratel/
# (start ratel - check main repo for exact command)

# Terminal 2: Start docs site
cd /home/hackartist/data/devel/github.com/biyard/ratel-docs/
npm start

# Terminal 3: Use Playwright to test and capture workflows
```

## Agent Expectations

When working on this repository:

### CRITICAL: Always Verify Build
**⚠️ MANDATORY**: After ANY documentation edit, ALWAYS run `make build` to ensure the build works properly. Do NOT skip this step.

```bash
make build  # Must succeed with no errors or warnings
```

### Other Requirements
1. **Verify accuracy**: Cross-reference documentation with actual Ratel application behavior
2. **Test locally**: Always preview documentation changes with `npm start`
3. **Use Playwright**: When documenting UI features, use Playwright to verify steps
4. **Maintain consistency**: Keep tone, style, and formatting consistent across pages
5. **Consider i18n**: Flag when Korean translations need updates (don't auto-translate)
6. **Link to source**: When documenting APIs, reference the actual code location in main ratel repo

## Common Issues & Solutions

### Build Failures
If `make build` fails:
1. Check for broken links (use extensionless paths like `./page-name` not `./page-name.md`)
2. Look for duplicate category names or translation key conflicts
3. Ensure all referenced files exist
4. Verify frontmatter syntax is correct
5. Check for special characters in titles or descriptions

### Link Format
- ✅ Correct: `[Link](./page-name)` or `[Link](../other-section/page)`
- ❌ Wrong: `[Link](./page-name.md)` or `[Link](../other-section/page.md)`

## Getting Help

- Docusaurus docs: https://docusaurus.io/docs
- Decap CMS docs: https://decapcms.org/docs/
- Main Ratel repository: `/home/hackartist/data/devel/github.com/biyard/ratel/`
- Build issues: Check `BUILD_FIX_SUMMARY.md` for common problems and solutions
- Try to attach screenshots which help users understand UX and UIs. You can take screenshot by Playwright MCP.
- For taking screenshot, use https://dev.ratel.foundation instead of local endpoint.
- Always write documentation in English and Korean