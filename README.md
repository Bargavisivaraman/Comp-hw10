# Giga Pet - Chrome DevTools Demo

## Quick Start
1. Open `index.html` in Chrome
2. Press F12 to open DevTools
3. Check Console tab for all logging examples

## DevTools Features Included

### Console Logging
- Log Info (page load messages)
- Log Warning (weight > 25)
- Log Error (click "Trigger TypeError")
- Log Table (click "Show Stats Table")
- Log Group (all button clicks)
- Log Custom (styled messages with colors)

### Browser Messages
- 404 Error (nonexistent-file.js loads on page)
- TypeError (click "Trigger TypeError" button)
- Violation (click "Trigger Violation" button)

### Filtering
- Filter by level (Info/Warning/Error buttons)
- Filter by text (type in search box)
- Filter by regex (enable .* button, try /pet|stat/)
- Filter by source (click script.js links)
- User vs Browser (sidebar menu)

### Debugging
- Set breakpoints in Sources tab on:
  - Line 70: clickedTreatButton()
  - Line 93: clickedPlayButton()
  - Line 251: checkWeightAndHappinessBeforeUpdating()
- Inspect variables in Scope pane
- Add Watch Expressions: pet_info.happiness, pet_info.weight
- Use Console to type: pet_info

### Bug Demo
1. Click Sleep 3+ times
2. Energy goes over 100% (BUG!)
3. Fix by adding cap in checkWeightAndHappinessBeforeUpdating():
```javascript
if (pet_info.energy > 100) {
  pet_info.energy = 100;
}
```

## Screenshot Checklist
- [ ] Log messages (info, warning, error, table, group, custom)
- [ ] 404 in Console and Network tab
- [ ] TypeError with stack trace
- [ ] Violation warning
- [ ] Filtering examples (by level, text, regex, source)
- [ ] Sources UI with breakpoint
- [ ] Scope pane with pet_info expanded
- [ ] Watch expressions
- [ ] Console variable inspection
- [ ] Bug: energy > 100%
- [ ] Fix applied

## File Structure
```
project-2-devtools/
├── index.html
├── script.js
├── style.css
├── README.md
└── screenshots/ (create this folder for your screenshots)
```
