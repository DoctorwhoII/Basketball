# FATIMA #24

A cinematic pixel-art basketball experience starring Fatima (jersey number 24) in a comedic power fantasy where she humiliates opponents through spectacular moves, ankle-breakers, dunks, and full-court shots.

## Technology Used
- HTML5 Canvas 2D
- CSS3 (with Pixel Art styling & nearest-neighbor interpolation)
- Vanilla JavaScript (ES6+)
- Web Audio API (prepared for audio refinement)

## How to Run Locally
1. Start a local static HTTP server in the project directory:
   ```bash
   python3 -m http.server 8000
   ```
2. Open your web browser and navigate to:
   ```
   http://localhost:8000
   ```

## How to Deploy to GitHub Pages
1. Push this repository to GitHub.
2. In your GitHub repository settings, navigate to **Pages**.
3. Set the source branch to `main` (or `master`) and root `/`.
4. Save and access your deployed live site.

## Project Structure
- `index.html`: Main HTML document with game container, UI overlays, and canvas.
- `style.css`: Pixel-art styling, arcade UI, nearest-neighbor rendering rules.
- `script.js`: Core rendering engine, camera controller, world & court generator, character sprite system, physics, particle engine, sequence controller, and animation state machine.
- `README.md`: Project documentation and usage guide.

## Architecture
- **World & Camera**: World-space basketball court (2400x600 logical units) with smooth camera tracking, zoom control, and dynamic impact shake.
- **Entities & Animation**: Procedural pixel-art characters (Fatima with bobbing ponytail and #24 jersey, blue teammates, red opponents) supporting idle, run, crossover, jump, dunk, land, L-dance, stagger, and evaporation.
- **Sequence Orchestration**: Deterministic timeline controller executing three cinematic sequences: **1. DUNK**, **2. HALF COURT**, and **3. FULL COURT**, complete with ankle-breakers, ball physics, and synchronized mass opponent evaporation.
