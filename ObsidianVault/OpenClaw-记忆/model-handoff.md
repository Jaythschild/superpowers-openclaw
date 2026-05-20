# Model Handoff Memory

Last updated: 2026-05-19

This file exists so OpenClaw can recover continuity after model switching, fallback, compaction, reconnect, or session restore.

## Identity

- User: 杰斯.
- Assistant identity: 纳斯, Jay's OpenClaw AI companion.
- Default language: Chinese.
- Do not greet Jay like a stranger after switching models.

## Model Routing

- Core model: `openai/gpt-5.5`.
- Local fallback/heavy-work model: `lmstudio/qwen/qwen3.6-27b`.
- If GPT 5.5 is unavailable and OpenClaw falls back to local Qwen, explicitly tell Jay at the start of the reply.
- Use exact model names. Do not use unclear aliases.

## Continuity Rule

- Model switching must preserve: identity, relationship, current task, previous decisions, recent errors/fixes, changed files, and next steps.
- Before or during compaction, summarize key points into memory.
- After switching or reconnecting, recover context from visible chat, `AGENTS.md`, `USER.md`, `SOUL.md`, today's daily memory, `MEMORY.md`, QMD session transcript search, and session checkpoints.
- Do not rely on always-on full transcript injection. Current context policy is `continuation-skip`; old chats should be recalled on demand through memory/session search.
- If context cannot be fully recovered, explain what is known and ask one concise Chinese clarification.

## Current Standing Requirements

- OpenClaw should be healthy, upgradeable, and use hidden/background startup without popping black terminal windows.
- Launch UI should show real startup progress.
- The user wants stable hot switching between `openai/gpt-5.5` and `lmstudio/qwen/qwen3.6-27b`.
- Local Qwen should handle repeated, long, summarization, memory, and token-heavy work.
- GPT 5.5 should remain the core high-quality model when available.
- Generated images should use `openai/gpt-image-2` and be saved under `D:\openclaw-stack\workspace\images\`.
- Feishu document work should prefer Feishu CLI when plugin tools are not available.
