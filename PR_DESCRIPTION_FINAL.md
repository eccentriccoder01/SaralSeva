# PR Description: Add Dependabot automation + security docs for monorepo

## Title
```
chore(security): add Dependabot automation + security docs for monorepo
```

## Description
```markdown
## Summary
Implements comprehensive automated dependency management using GitHub Dependabot to address security vulnerabilities across all modules in the SaralSeva monorepo.

**Note**: Rebased onto upstream/main @ 0f28f68 (2025-09-27)

## Changes
- ✅ **`.github/dependabot.yml`**: Comprehensive configuration for 4 npm modules + GitHub Actions
- ✅ **`DEPENDABOT.md`**: Developer documentation and workflow guide  
- ✅ **`SECURITY.md`**: Security policy with responsible disclosure procedures
- ✅ **`README.md`**: Updated with Dependabot section and status badges

## Security Impact
- **Current**: ~78 npm audit findings across all modules
- **After**: Dependabot will create PRs to address findings over time
- **Maintenance**: Automated weekly dependency updates prevent future accumulation

## Dependabot Configuration Details
**Monorepo Paths Configured:**
- `/backend` - Node.js/Express API
- `/user` - React user portal  
- `/admin` - React admin dashboard
- `/employee` - React employee portal
- `/` - GitHub Actions workflows

**Update Schedule:**
- npm dependencies: Weekly (Mondays, 9:00 AM IST)
- GitHub Actions: Monthly (1st Monday)
- Smart grouping reduces PR volume (minor/patch updates bundled)

## Testing Performed
All modules verified to build successfully:
```bash
# Backend
cd backend && npm install && npm run dev

# User Portal  
cd user && npm install && npm run build

# Admin Portal
cd admin && npm install && npm run build  

# Employee Portal
cd employee && npm install && npm run build
```

## Reviewer Instructions
1. **Pre-review audit** (optional):
   ```bash
   # Check current vulnerabilities
   npm audit --audit-level=low          # Human-readable summary
   npm audit --json                     # Machine-readable output
   
   # Test builds
   cd backend && npm run build || npm test
   cd user && npm run build
   cd admin && npm run build  
   cd employee && npm run build
   ```

2. **Review backup branch** (pre-rebase state):
   ```bash
   git checkout backup-fix-security-issue
   # Compare with current PR if needed
   ```

3. **Verify configuration**:
   - Confirm `.github/dependabot.yml` directory paths match repo structure
   - Review security policy in `SECURITY.md` 
   - Check documentation completeness in `DEPENDABOT.md`

## Auto-merge Considerations
**Not enabled** in this PR. If considering future auto-merge:
- ⚠️ **Risks**: Potential breaking changes, CI bypass
- ✅ **Requirements**: Passing CI, PR review, semver-minor only
- ✅ **Conditions**: Comprehensive test coverage + branch protection

## Security Contact
- **Primary**: [@eccentriccoder01](https://github.com/eccentriccoder01)
- **Email**: [Maintainer to add if desired]
- **Disclosure**: 90-day responsible disclosure timeline (see SECURITY.md)

## CI Recommendations
Ensure CI runs build/test steps for Dependabot PRs:
```yaml
# In your GitHub Actions workflow
if: github.actor == 'dependabot[bot]' || github.actor != 'dependabot[bot]'
```

## Breaking Changes
❌ **None** - This is purely additive automation

## Post-merge Actions
1. Monitor initial Dependabot PRs for any issues
2. Adjust grouping rules if PR volume too high/low
3. Consider enabling auto-merge for patch updates after observing behavior

---
**Backup Branch**: `backup-fix-security-issue` available for pre-rebase inspection
```