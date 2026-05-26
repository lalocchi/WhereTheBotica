I am using ChatGPT for coding,and Gemini for documentation,planning etc.

Bunları AI_DIARY.md-ə rahatlıqla qoya bilərsən:

### [2026-05-26] - Player movement was too fast

**What I asked the AI:**
I asked how to create player movement using keyboard controls.

**What it gave me:**
The AI suggested movement inside a game loop using continuous key tracking.

**What was wrong:**
The player moved too fast and did not fit the grid-based level design.

**How I fixed it:**
I changed the movement system from continuous movement to tile-by-tile movement using keydown events and fixed movement distance to 40 pixels.

**Time lost:**
~20 minutes

---

### [2026-05-26] - Collision box did not match pixel art sprite

**What I asked the AI:**
I asked how to make collisions feel more natural with a 64x64 pixel art character.

**What it gave me:**
The AI suggested using a smaller collision hitbox instead of using the full sprite size.

**What was wrong:**
The player could not get close to walls because the collision area was larger than the visible body of the character.

**How I fixed it:**
I added custom hitbox offsets and reduced the collision size so only the lower body of the character interacts with walls.

**Time lost:**
~35 minutes

---

### [2026-05-26] - Invisible collision on top side of walls

**What I asked the AI:**
I asked why the player could not walk near the upper side of some walls.

**What it gave me:**
The AI explained that the wall collision area started too high compared to the visual sprite placement.

**What was wrong:**
There was an invisible collision area above the walls.

**How I fixed it:**
I added a hitbox offset to the walls so the collision starts slightly lower than the visible top of the wall.

**Time lost:**
~15 minutes

---

### [2026-05-26] - Electric hazard tiles had incorrect collision

**What I asked the AI:**
I asked why the player was taking damage before visually touching the electric tiles.

**What it gave me:**
The AI suggested creating custom hitboxes for the electric hazard tiles.

**What was wrong:**
The upper part of the electric tiles had invisible collision zones.

**How I fixed it:**
I reduced the collision area of the electric tiles using hitbox offsets and custom hitbox height values.

**Time lost:**
~15 minutes

---

### [2026-05-26] - Pixel art sprites looked blurry

**What I asked the AI:**
I asked how to keep 16x16 pixel art sprites sharp inside the browser.

**What it gave me:**
The AI suggested exporting sprites as PNG files and using pixelated image rendering.

**What was wrong:**
The browser was smoothing the sprites when scaling them up.

**How I fixed it:**
I exported the sprites in PNG format, scaled them properly, and added image-rendering: pixelated in CSS.

**Time lost:**
~10 minutes

---

### [2026-05-26] - Batberries used as both score and health

**What I asked the AI:**
I asked how to create a health system without adding extra collectible types.

**What it gave me:**
The AI suggested using Batberries as both score and player health.

**What was wrong:**
Initially I planned separate health and score systems, which complicated the gameplay logic.

**How I fixed it:**
I simplified the game by using the same Batberry count for score, health, and future boss attacks.

**Time lost:**
~20 minutes
