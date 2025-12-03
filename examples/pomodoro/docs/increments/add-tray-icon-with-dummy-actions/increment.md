 # Add tray icon with three dummy actions and a working Quit

 ## Job Story
 **When** I have the Pomodoro app running on my macOS machine  
 **I want to** see a menu-bar (tray) icon that exposes three simple actions and a `Quit` item  
 **So I can** interact with the app quickly (exercise the UI glue) and verify the `Quit` action cleanly exits the app

 **Assumption Being Tested:** Adding small, platform-specific menu-bar UI (three placeholder actions and `Quit`) is straightforward, observable, and does not require changes to core timer logic; the team can verify UI glue via logs and the app process lifecycle.

 ## Acceptance Criteria
- **Given** the app is running in the background  
  **When** the user clicks the menu-bar icon  
  **Then** a menu appears listing three action items and a `Quit` item

- **Given** the menu is visible  
  **When** the user selects any of the three dummy actions  
  **Then** the app writes a timestamped, human-readable log to stdout indicating which action was invoked

- **Given** the app is running  
  **When** the user selects `Quit` from the menu  
  **Then** the app terminates and the menu-bar icon is removed from the system menu bar

- **Given** the app cannot create a menu-bar icon (startup error)  
  **When** that error occurs  
  **Then** the app logs an error message to stdout/stderr describing the failure and exits with a non-zero status

 ## Success Signal
- Manual verification: the menu-bar icon appears and shows the expected items; selecting any dummy action produces a timestamped log line in the app's console; selecting `Quit` immediately ends the process and removes the icon.  
- Observable metric: when running the app and invoking each dummy action once, there are exactly three corresponding log lines and one process exit recorded.

 ## Out of Scope
- Implementing or wiring any real Pomodoro timer semantics (start/stop/persisting timer state) beyond the small UI logs required for this increment.  
- Desktop notifications, preferences UI, or polished icon production beyond a single small icon used for this increment.  
- Cross-platform support — this increment is macOS-only.  
- Automated UI tests for platform menu-bar interactions (manual verification is acceptable for this increment).  
- Any changes that alter core timer behavior or configuration formats.

 ## Implementation Guardrails

 **Scope discipline:** Keep this change limited to menu-bar UI glue and short-lived placeholder handlers that only log to stdout. If implementing the menu requires touching core timer logic, pause and propose either narrowing the change or creating a follow-up increment.

 **Minimal dependencies:** Prefer using small, actively maintained libraries if a third-party helper is necessary for menu-bar integration. Avoid large cross-platform UI frameworks that conflict with the single-binary, minimal philosophy.

 **Respect single-binary goal:** Any implementation choices must not introduce heavyweight runtime or packaging requirements that contradict the project’s distribution expectations.

 **Traceability:** All UI handlers must map back to this job story and acceptance criteria — each dummy action should clearly log which action ran and when, so acceptance criteria can be verified.

 **Validation-first mindset:** Favor approaches that make it easy to observe whether the assumption holds (e.g., clear console logs and immediate app exit on Quit). Add unit tests only for extracted core logic; manual verification is acceptable for the menu-bar glue.
