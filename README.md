# Personal Portfolio Website

A modern, responsive portfolio website built with HTML, CSS, and JavaScript. Features a clean, minimalist design with smooth animations and mobile-friendly layout.

## Features

- ✨ **Modern Design**: Clean, minimalist aesthetic with subtle animations
- 📱 **Responsive**: Fully responsive design that works on all devices
- 🎨 **Customizable**: Easy to customize colors, content, and styling
- ⚡ **Fast**: Lightweight and optimized for performance
- 📧 **Contact Form**: Functional contact form with validation
- 🌊 **Smooth Animations**: Subtle animations and parallax effects

## Getting Started

### 1. Customize Your Content

#### Update Personal Information

Edit `index.html` to replace placeholder content:

```html
<!-- Update your name -->
<h1 class="hero-title">Hello, I'm <span class="highlight">Your Name</span></h1>

<!-- Update your tagline -->
<p class="hero-subtitle">
  I create digital experiences that blend functionality with creative expression
</p>

<!-- Update about section -->
<p>I'm a passionate creator who designs fluid interfaces...</p>

<!-- Update skills -->
<div class="skill-tags">
  <span class="skill-tag">Your Skill 1</span>
  <span class="skill-tag">Your Skill 2</span>
  <!-- Add more skills -->
</div>

<!-- Update contact information -->
<a href="mailto:your.email@example.com">your.email@example.com</a>
<a href="https://twitter.com/yourusername">@yourusername</a>
<a href="https://github.com/yourusername">github.com/yourusername</a>
```

#### Add Your Projects

Replace the placeholder projects in the work section:

```html
<article class="work-item">
  <div class="work-image">
    <!-- Add your project image here -->
    <img src="path/to/your/project-image.jpg" alt="Project Name" />
  </div>
  <div class="work-content">
    <h3>Your Project Name</h3>
    <p>Description of your amazing project...</p>
    <div class="work-tags">
      <span class="work-tag">Technology Used</span>
    </div>
    <div class="work-links">
      <a href="your-project-url" class="work-link">View Project</a>
      <a href="your-source-code-url" class="work-link">Source Code</a>
    </div>
  </div>
</article>
```

#### Add Your Photo

Replace the profile placeholder:

```html
<div class="about-image">
  <img src="path/to/your/photo.jpg" alt="Your Name" class="profile-image" />
</div>
```

### 2. Customize Colors and Styling

Edit `styles.css` to match your brand colors:

```css
/* Primary colors */
:root {
  --primary-color: #6366f1;
  --secondary-color: #8b5cf6;
  --accent-color: #ec4899;
  --text-color: #333;
  --text-light: #666;
  --background: #ffffff;
}
```

### 3. Add Your Images

1. Create an `images` folder in your project
2. Add your project screenshots and profile photo
3. Update the image paths in your HTML

## Project Structure

```
portfolio/
├── index.html          # Main HTML file
├── styles.css          # CSS styles
├── script.js           # JavaScript functionality
├── README.md           # This file
└── images/             # Your images (create this folder)
    ├── profile.jpg
    ├── project1.jpg
    ├── project2.jpg
    └── project3.jpg
```

## Deployment Options

### Option 1: GitHub Pages (Free)

1. Create a GitHub repository
2. Upload your files
3. Go to Settings > Pages
4. Select source branch (usually `main`)
5. Your site will be available at `https://yourusername.github.io/repository-name`

### Option 2: Netlify (Free)

1. Go to [netlify.com](https://netlify.com)
2. Drag and drop your project folder
3. Your site will be deployed instantly
4. You can add a custom domain later

### Option 3: Vercel (Free)

1. Go to [vercel.com](https://vercel.com)
2. Connect your GitHub repository
3. Deploy automatically on every push

### Option 4: Local Development

Simply open `index.html` in your browser to view locally.

## Customization Tips

### Adding More Sections

You can easily add new sections by following the existing pattern:

```html
<section id="new-section" class="new-section">
  <div class="container">
    <h2 class="section-title">Section Title</h2>
    <!-- Your content here -->
  </div>
</section>
```

### Adding Animations

The site includes smooth animations. You can add more by:

1. Adding CSS animations to `styles.css`
2. Using the existing Intersection Observer in `script.js`

### Adding a Blog Section

Consider adding a blog section to showcase your thoughts and expertise:

```html
<section id="blog" class="blog">
  <div class="container">
    <h2 class="section-title">Latest Posts</h2>
    <div class="blog-grid">
      <!-- Blog post items -->
    </div>
  </div>
</section>
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance Tips

1. **Optimize Images**: Compress your images before uploading
2. **Minimize HTTP Requests**: Combine CSS and JS files for production
3. **Use CDN**: Consider using a CDN for faster loading
4. **Lazy Loading**: Implement lazy loading for images if you have many

## SEO Optimization

1. Update the `<title>` tag with your name
2. Add meta descriptions
3. Include Open Graph tags for social sharing
4. Add structured data for better search results

## Contact Form Setup

The contact form currently shows a success message. To make it functional:

1. **Netlify Forms**: If using Netlify, add `netlify` attribute to the form
2. **Formspree**: Use Formspree service for form handling
3. **Custom Backend**: Set up your own backend to handle form submissions

## License

This project is open source and available under the [MIT License](LICENSE).

## Support

If you need help customizing your portfolio, feel free to:

- Check the code comments for guidance
- Modify the CSS variables for easy color changes
- Add your own sections following the existing patterns

Happy coding! 🚀
