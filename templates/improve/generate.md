---
name: generate-improve-prompt
argument-hint: none
---

# Prompt: Generate Self-Contained improve.prompt.md


You are tasked with generating a fully self-contained `improve.prompt.md` file for the 4DC project. Use the contents of all files in the `/templates/improve` folder (including frontmatter.md, persona.md, process.md, lenses.md and adr.md) as source material. Also use the ..implement/output.md file as context.

- Only merge content from the specified template files. Do not add extra summary or instructional lines unless they are present in the templates.
- Do not append commentary like "This file is now ready to use..." unless it is explicitly included in the template files.
- The frontmatter (YAML block) from `frontmatter.md` must be placed at the very top of the generated file, before any other content.
- Immediately after the frontmatter, merge all relevant details from persona.md, process.md, lenses.md, adr.md and the external output.md.
- Do not reference or link to any external files or folders in the output.
- The resulting prompt must include the persona, process, interaction style, and output format directly in the file.
- Ensure clarity, completeness, and maintainability.
- The output should be ready to use as a standalone prompt for generating an improvement plan and actionable code for an increment.

# Output
A single, self-contained `improve.prompt.md` file containing all necessary instructions, context, and templates for improvment generation. The file should be created at the top level of the repository (e.g., `/improve.prompt.md`).
