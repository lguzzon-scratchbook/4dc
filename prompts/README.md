# VS Code Copilot Prompt Files

This directory contains reusable [VS Code Copilot prompt files](https://code.visualstudio.com/docs/copilot/customization/prompt-files) for the 4DC (4 Document Cascade) methodology. These prompts guide AI assistants in creating structured documentation that separates project concerns across different roles and perspectives.

## What are Copilot Prompt Files?

Copilot prompt files are markdown files with YAML front-matter metadata that contain instructions for GitHub Copilot. They provide context-aware guidance for common development tasks, ensuring consistent outputs across your team.

**Benefits:**
- **Consistency:** Standardized outputs across team members
- **Efficiency:** Reusable templates reduce repetitive work
- **Context:** Built-in best practices and organizational knowledge
- **Discoverability:** VS Code surfaces prompts in the Copilot Chat interface

## Available Prompts

This repository includes four core prompts for the 4DC methodology:

| Prompt File | Purpose | Persona |
|-------------|---------|---------|
| `create-adr.md` | Generate Architecture Decision Records (ADRs) | Senior Developer |
| `create-constitution.md` | Create project constitutions defining principles and tech stack | CTO/Architect |
| `create-feature.md` | Write feature specifications with acceptance criteria | Product Owner |
| `create-tasks.md` | Break features into implementation task lists | Developer |

## How to Use in VS Code

### Prerequisites
- **VS Code** (latest version recommended)
- **GitHub Copilot** extension installed and activated
- **GitHub Copilot Chat** extension installed

### Using Workspace Prompts

1. **Open your project** in VS Code
2. **Open Copilot Chat** (Ctrl+Alt+I / Cmd+Alt+I)
3. **Reference a prompt** using the `#file` syntax:
   ```
   #file:prompts/create-feature.md I need a feature for user profile upload
   ```
4. **Follow the prompts** - Copilot will ask clarifying questions based on the prompt file
5. **Review and refine** the generated output

### Quick Access Tips

- Type `#` in Copilot Chat to see available files and prompts
- Use `@workspace` to give Copilot context about your entire project
- Combine prompts with workspace context: `@workspace #file:prompts/create-adr.md`

## Recommended Location: `.github/prompts`

**For repository-level prompts that should be version-controlled and shared across your team, we recommend storing them in `.github/prompts/` instead of the root `prompts/` directory.**

**Why `.github/prompts/`?**
- **Discoverability:** Developers expect tooling configuration in `.github/`
- **Organization:** Keeps repository root clean
- **Convention:** Aligns with GitHub's conventions (`.github/workflows/`, `.github/ISSUE_TEMPLATE/`)
- **Visibility:** Clear signal that these are development tools, not documentation

**To move these prompts to `.github/prompts/`:**

```bash
# Create the .github/prompts directory
mkdir -p .github/prompts

# Move prompt files
mv prompts/*.md .github/prompts/

# Remove old directory
rmdir prompts

# Update references in VS Code
# Prompts will now be referenced as: #file:.github/prompts/create-feature.md
```

Alternatively, you can copy these prompts to `.github/prompts/` and keep `prompts/` as template storage.

## Reusing Across Repositories

There are several strategies for sharing prompts across multiple repositories:

### Option 1: Copy Files (Simplest)

**Best for:** Small teams, infrequent updates

```bash
# Copy prompts to a new repository
cp -r /path/to/4dc/prompts /path/to/your-repo/.github/prompts
```

**Pros:** Simple, no dependencies  
**Cons:** Manual updates, prompts can drift

### Option 2: Git Submodule (Version Control)

**Best for:** Teams that need versioned prompt updates

```bash
# Add 4dc as a submodule in your repository
git submodule add https://github.com/co0p/4dc .github/4dc-prompts

# Create symbolic link to prompts
ln -s .github/4dc-prompts/prompts .github/prompts

# Initialize submodule for team members
git submodule update --init --recursive
```

**Pros:** Version-controlled, easy updates  
**Cons:** Adds submodule complexity

### Option 3: Git Subtree (Embedded History)

**Best for:** Teams that want embedded prompts without submodule complexity

```bash
# Add 4dc prompts as a subtree
git subtree add --prefix .github/prompts https://github.com/co0p/4dc main --squash

# Update prompts later
git subtree pull --prefix .github/prompts https://github.com/co0p/4dc main --squash
```

**Pros:** No submodule complexity, full history  
**Cons:** Larger repository size

### Option 4: Automation / Sync Script

**Best for:** Large organizations with many repositories

Create a simple sync script (e.g., `.github/scripts/sync-prompts.sh`):

```bash
#!/bin/bash
# Sync prompts from 4dc repository
PROMPTS_SOURCE="https://raw.githubusercontent.com/co0p/4dc/main/prompts"
PROMPTS_DIR=".github/prompts"

mkdir -p "$PROMPTS_DIR"

curl -o "$PROMPTS_DIR/create-adr.md" "$PROMPTS_SOURCE/create-adr.md"
curl -o "$PROMPTS_DIR/create-constitution.md" "$PROMPTS_SOURCE/create-constitution.md"
curl -o "$PROMPTS_DIR/create-feature.md" "$PROMPTS_SOURCE/create-feature.md"
curl -o "$PROMPTS_DIR/create-tasks.md" "$PROMPTS_SOURCE/create-tasks.md"

echo "✓ Prompts synced from 4dc repository"
```

Run periodically via cron or GitHub Actions.

**Pros:** Centralized control, automated updates  
**Cons:** Requires maintenance, can break if source changes

## Authoring Your Own Prompts

### Prompt File Structure

Every Copilot prompt file should include:

1. **YAML Front-matter** - Metadata for VS Code
2. **Instructions** - Clear guidance for the AI
3. **Examples** - Sample outputs to guide generation
4. **Constraints** - Boundaries and requirements

**Template:**

```markdown
---
title: "Short descriptive title"
description: "What this prompt does"
author: "your-name or org"
language: "markdown"
tags:
  - relevant
  - tags
  - here
---

# Rule: [What this prompt generates]

## Goal
[Clear objective for the AI assistant]

## Prerequisites
[Required files or context]

## Process
1. Step one
2. Step two
3. Step three

## Output Format
[Expected structure of generated content]

## Examples
[Sample outputs]
```

### Best Practices

**Do:**
- ✅ Use clear, imperative language
- ✅ Provide concrete examples
- ✅ Define explicit success criteria
- ✅ Include prerequisite checks
- ✅ Specify output format and location
- ✅ Use structured questions with multiple-choice answers

**Don't:**
- ❌ Use vague or aspirational language
- ❌ Assume context without verification
- ❌ Skip examples or templates
- ❌ Create prompts longer than necessary
- ❌ Mix multiple concerns in one prompt

### Testing Your Prompts

1. **Test with minimal context** - Ensure prompts work without extensive setup
2. **Test with edge cases** - Missing files, incomplete information
3. **Test with real users** - Get feedback from team members
4. **Iterate based on outputs** - Refine prompts based on actual usage

## Maintenance & Governance

### Versioning Prompts

Consider versioning your prompts if they change frequently:

```
.github/prompts/
  v1/
    create-feature.md
  v2/
    create-feature.md
  create-feature.md -> v2/create-feature.md (symlink)
```

### Review Process

Treat prompt files like code:
- **Code review** for all prompt changes
- **Test** prompts before merging
- **Document** breaking changes
- **Communicate** updates to team

### Ownership

Assign ownership to ensure quality:
- **Constitution prompts:** Architecture team
- **Feature prompts:** Product team
- **ADR prompts:** Senior developers
- **Task prompts:** Development team

## Example Workflows

### Creating a New Feature

```bash
# 1. Ensure constitution exists
@workspace #file:.github/prompts/create-constitution.md

# 2. Create feature specification
@workspace #file:.github/prompts/create-feature.md Upload profile picture

# 3. Document technical decisions
@workspace #file:.github/prompts/create-adr.md for upload-profile-picture feature

# 4. Generate implementation tasks
@workspace #file:.github/prompts/create-tasks.md for upload-profile-picture feature
```

### Starting a New Project

```bash
# 1. Define project principles
#file:.github/prompts/create-constitution.md for a task management SaaS

# 2. Create first feature
#file:.github/prompts/create-feature.md user authentication

# 3. Continue with ADR and tasks...
```

## Troubleshooting

### Prompt Not Appearing in VS Code

- **Check file location:** Ensure prompt files are in the workspace
- **Verify YAML syntax:** Malformed YAML breaks parsing
- **Reload VS Code:** Sometimes prompts need a reload to register
- **Check Copilot status:** Ensure Copilot Chat is enabled

### Copilot Not Following Prompt Instructions

- **Add more examples:** Concrete examples improve AI adherence
- **Use imperative language:** "Generate a feature" vs. "You might want to generate"
- **Check prompt length:** Very long prompts may be truncated
- **Iterate on wording:** Small phrasing changes can have big impacts

### Outputs Are Inconsistent

- **Add structured questions:** Multiple choice reduces variability
- **Define explicit format:** Use templates and schemas
- **Include success criteria:** Help AI understand "done"
- **Test with team:** Collect feedback and refine

## Security and Privacy

**Important considerations:**

- **No secrets in prompts:** Never include API keys, passwords, or credentials
- **Review generated outputs:** Always review AI-generated content before committing
- **Sensitive data:** Don't include proprietary business logic in prompts
- **Access control:** Ensure prompt files match repository visibility (public repos = public prompts)

## Contributing

To contribute improvements to these prompts:

1. **Fork** the [4dc repository](https://github.com/co0p/4dc)
2. **Create a feature branch** for your changes
3. **Test** your prompt changes thoroughly
4. **Submit a PR** with examples of improved outputs
5. **Document** the rationale for changes

## Additional Resources

- [VS Code Copilot Prompt Files Documentation](https://code.visualstudio.com/docs/copilot/customization/prompt-files)
- [GitHub Copilot Documentation](https://docs.github.com/en/copilot)
- [4DC Methodology](../README.md)
- [Example Workflows](../example/)

## Questions or Issues?

- **4DC Issues:** [github.com/co0p/4dc/issues](https://github.com/co0p/4dc/issues)
- **VS Code Copilot:** [VS Code Copilot Discussions](https://github.com/microsoft/vscode-discussions/discussions)
- **Documentation:** See main [README.md](../README.md) for 4DC methodology details
