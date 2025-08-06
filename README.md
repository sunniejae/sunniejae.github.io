Y2K Portfolio Website
A retro-futuristic portfolio website with Y2K aesthetic, featuring a colorful cursor trail, Pinterest integration, and nostalgic design elements.

Files Structure
index.html - Main HTML structure
styles.css - All Y2K styling and responsive design
script.js - Interactive features and cursor trail
README.md - This file
Features
Y2K Aesthetic: Retro color scheme with gradients and neon effects
Cursor Trail: Colorful dots that follow your mouse movement
Responsive Design: Works on desktop, tablet, and mobile
Pinterest Integration: Embedded portfolio board in computer frame
Interactive Navigation: Dropdown menus and smooth scrolling
Custom Icons: Desktop-style icon layout with hover effects
How to Use on GitHub Pages
Option 1: Direct Upload
Create a new GitHub repository
Upload these 3 files: index.html, styles.css, script.js
Go to Settings → Pages
Select "Deploy from a branch" and choose "main"
Your site will be live at: https://yourusername.github.io/repository-name/
Option 2: GitHub Desktop
Clone or download this folder
Create new repository on GitHub
Upload files using GitHub Desktop
Enable GitHub Pages in repository settings
Customization
Colors
Edit the CSS variables in styles.css:

:root {
    --y2k-primary: #d2baff;    /* Main purple */
    --y2k-secondary: #ff68b5;  /* Pink accent */
    --y2k-bg: #130d16;         /* Dark background */
}
Images
Replace these URLs in index.html and styles.css:

Hero background: https://i.imgur.com/yf3WNpp.png
Computer frame: https://i.imgur.com/RGtkuJc.png
Icons: https://i.imgur.com/XRXG5tA.png, etc.
Pinterest Board
Update the Pinterest embed in index.html:

<a data-pin-do="embedBoard" href="https://www.pinterest.com/YOUR-USERNAME/YOUR-BOARD/"></a>
Navigation
Edit the menu items in index.html under the <nav class="nav-menu"> section.

Browser Support
Chrome/Edge: Full support
Firefox: Full support
Safari: Full support
Mobile browsers: Responsive design included
Performance
Optimized images (use WebP format for better compression)
Minimal JavaScript for fast loading
CSS animations use GPU acceleration
Font loading optimized with Google Fonts
License
Free to use and modify for personal and commercial projects.
