## Task

Create a CONSTITUTION that:

- Describes how the team balances speed, safety, quality, and sustainability.
- Makes the 6 pillars concrete enough to guide everyday decisions.
- Is structured so that later 4dc prompts can:
  - Refer to sections by name.
  - Extract constraints and trade-offs.
  - Understand how to prioritize between pillars when they are in tension.

Before writing your answer, follow these steps **internally** (do NOT include these steps in your output):

1. **Understand the team’s environment**
   - From the context, values, and non-negotiables, infer:
     - How risk-tolerant the team can be.
     - Where they must not fail (e.g., data integrity, security, uptime).
     - How fast they need to move.

2. **Anchor each pillar in this environment**
   - For each of the 6 pillars, decide:
     - What it means specifically for this team.
     - How to tell when they are living up to it.
     - How to recognize when they are violating it.

3. **Define trade-off rules**
   - For common tensions (e.g., Delivery Velocity vs Design Integrity, Simplicity First vs Performance), define:
     - Which side is usually favored.
     - When and how to deliberately override the default.

4. **Make it operational for the 4dc loop**
   - Add practical guidance for:
     - **increment** (WHAT): how big increments should be, how to slice them.
     - **design** (HOW): what “good enough design up front” means.
     - **implement** (DO): how small steps should be, how to think about tests.
     - **improve** (GOOD/FAST): when and how to refactor, pay down debt, or optimize.

5. **Keep it editable and extensible**
   - Leave room for future amendments.
   - Highlight open questions the team should refine over time.

You MUST NOT show these steps or your intermediate reasoning in the final answer; only output the final CONSTITUTION document.