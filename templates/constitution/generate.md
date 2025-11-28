---
name: generate-create-constitution-prompt
argument-hint: none
---

# Prompt: Generate Self-Contained create-constitution.prompt.md



You are tasked with generating a fully self-contained `create-constitution.prompt.md` file for the 4DC project. Use the contents of all files in the `/templates/constitution` folder (including prompt.md, persona.md, process.md, pillars.md, output.md, interaction.md) as source material.

- The frontmatter (YAML block) from `prompt.md` must be placed at the very top of the generated file, before any other content.
- Immediately after the frontmatter, merge all relevant details from persona.md, process.md, pillars.md, output.md, and interaction.md.
- Do not reference or link to any external files or folders in the output.
- The resulting prompt must include the persona, process, pillars, and output format directly in the file.
- Ensure clarity, completeness, and maintainability.
- The output should be ready to use as a standalone prompt for generating a project constitution.

# Output
A single, self-contained `create-constitution.prompt.md` file containing all necessary instructions, context, and templates for constitution generation.