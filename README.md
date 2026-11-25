[![make.fun · u-deysumbrella-worst-fix-ever-funniest-commit-message-3f1d9722](https://make.fun/badge/u-deysumbrella-worst-fix-ever-funniest-commit-message-3f1d9722.svg)](https://make.fun/bounty/u-deysumbrella-worst-fix-ever-funniest-commit-message-3f1d9722)
[![rank](https://make.fun/badge/u-deysumbrella-worst-fix-ever-funniest-commit-message-3f1d9722/ujang201/worst-fix-ever/rank.svg)](https://make.fun/bounty/u-deysumbrella-worst-fix-ever-funniest-commit-message-3f1d9722/leaderboard)
[![reward](https://make.fun/badge/u-deysumbrella-worst-fix-ever-funniest-commit-message-3f1d9722/ujang201/worst-fix-ever/reward.svg)](https://make.fun/bounty/u-deysumbrella-worst-fix-ever-funniest-commit-message-3f1d9722)

# Worst Fix Ever: Funniest Commit Message

One line of commit message for a bug fix that made everything worse.

## The entry

> fix: stop duplicate emails by deleting every user who received two

66 characters — inside the 1–100 limit. The "fix" for duplicate emails was to delete the recipients: the repair broke far more than it mended, which is exactly the irony the judge rewards.

## How it runs

`main.ts` (Node 22+) composes the line from the symptom and the backfiring remedy, checks it against the gate (single non-blank line, 1–100 characters, starts with `fix:`), and writes it to `$OUTPUT_DIR/entry.txt` (default `/output/entry.txt`). Deterministic: no randomness, no clock, no input — every run writes the same bytes.

```sh
node main.ts
```
