---
name: sync-events
description: Sync cal.com event data (prices, durations, descriptions, new event types) into src/data/events.ts and sanity-check the diff. Use when the user asks to sync events, pull price updates, refresh cal.com data, or add new event types.
user-invocable: true
allowed-tools:
  - Read
  - Edit
  - Write
  - Bash(node scripts/sync-events.js*)
  - Bash(git diff*)
  - Bash(git status*)
  - Bash(mv src/data/events2.ts src/data/events.ts)
  - Bash(rm src/data/events2.ts)
  - Bash(npx tsc*)
---

# /sync-events — Cal.com event sync + sanity check

Syncs event data from the cal.com API into `src/data/events.ts` and reviews
the diff before committing. Most real-world changes are **price increases**
or **new event types** — flag anything that doesn't fit that pattern.

## How to run

```
node scripts/sync-events.js --auto
```

This writes the result to `src/data/events2.ts` (the original is preserved).
`--auto` accepts all updates and new events, never removes events, and
auto-assigns categories for new events using the override map in the script.

## Step 1 — run and capture the diff

1. Run `node scripts/sync-events.js --auto`. The script prints a structured
   summary of new / updated / removed events.
2. Run `git diff --no-index src/data/events.ts src/data/events2.ts` to
   confirm the actual file diff matches the script's reported changes.

## Step 2 — sanity check

The rule of thumb: **most updates should be price increases, and most new
entries should be new event types.** Anything else deserves a callout.

### New events — pick the category

The script has a hard-coded override map for known tricky cases. If a new
event lands in `További szolgáltatások` or `Kistestűek` by default and that
looks wrong, ask the user for the category before proceeding. As a reference
the user has previously used:

- münsterlandi vizsla → Közepes testűek
- pincser → Kistestűek
- dalmata → Rövidszőrűek
- basset hound → Rövidszőrűek
- közép spicc → Közepes testűek
- nyuszi → További szolgáltatások (egyéb)

If the diff includes a new event that isn't covered by the override map and
isn't obvious from the breed name, **add a new entry to `CATEGORY_OVERRIDES`
in `scripts/sync-events.js`** before finalizing, so the next run gets it
right automatically.

### Updates — flag anything non-price

For each updated event, classify the change as one of:

- **price increase** (typical: 500–3000 Ft) — fine, expected.
- **price decrease** — unusual, call out.
- **price format change** (e.g. tiered pricing collapsed to flat, or tier
  labels reworded) — call out with the before/after.
- **duration change** — call out; durations rarely change.
- **description change** — call out if it's more than a cosmetic
  whitespace/punctuation tweak.
- **name change** — call out.

Present the callouts as a short bulleted list in the chat. Don't bury them.

### Removed events

Auto mode never removes events. If the script reports any "would-be-removed"
entries, list them and ask the user whether to drop them — usually they
should stay (cal.com might be temporarily hiding them, or it's a manual
entry the diff generator didn't recognize).

## Step 3 — finalize

Only after the user confirms the diff looks good:

```
mv src/data/events2.ts src/data/events.ts
```

Then offer to commit. The user typically uses short Hungarian commit
messages like "price updates", "new event types", "better text".

## Known parser quirks

The cal.com description field mixes `<br>` and `\n\n` as line separators.
The parser in `scripts/lib/event-parser.js` splits on both. If you see
description text bleeding into the `price` field (or vice versa), or
unterminated string literals when prettier runs, that's the symptom — the
parser's line-classification regex is wrong. Price lines match
`/\d{1,2}\.\d{3}\s+Ft-tól/i`; everything else is description.

## Manual events that must be preserved

These IDs are flagged in `scripts/lib/diff-generator.js` as `MANUAL_EVENT_IDS`
and are never touched by sync: `fogtisztitas`, `karomvagas`, `egeszsegugyi`,
`buzmirigy`. If the user adds a new manual (non-cal.com) event, remind them
to add its id there.
