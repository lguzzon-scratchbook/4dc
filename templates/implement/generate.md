---
name: generate-implementation-prompt
argument-hint: none
---

# Prompt: Generate Self-Contained implementation.prompt.md



You are tasked with generating a fully self-contained `implementation.prompt.md` file for the 4DC project. Use the contents of all files in the `/templates/implement` folder (including prompt.md, persona.md, process.md, interaction.md, output.md) as source material.

- The frontmatter (YAML block) from `prompt.md` must be placed at the very top of the generated file, before any other content.
- Immediately after the frontmatter, merge all relevant details from persona.md, process.md, interaction.md, and output.md.
- Do not reference or link to any external files or folders in the output.
- The resulting prompt must include the persona, process, interaction style, and output format directly in the file.
- Ensure clarity, completeness, and maintainability.
- The output should be ready to use as a standalone prompt for generating an implementation plan and code for an increment.

# Output
A single, self-contained `implement.prompt.md` file containing all necessary instructions, context, and templates for implementation generation. The file should be created at the top level of the repository (e.g., `/implement.prompt.md`).
