# Assets Folder Setup - Ceylon Cabs Website

## 📁 Folder Structure Created

```
/Users/rasithabeywickrama/Documents/tours/
├── assets/
│   └── images/
│       ├── logo.svg              (Ceylon Cabs logo with palm tree)
│       ├── hero-background.png   (Sri Lankan tea plantation photo)
│       └── mini-car.png          (White compact car photo)
├── index.html
├── about.html
├── vehicles.html
├── tours.html
├── gallery.html
├── contact.html
├── styles.css
└── script.js
```

## ✅ What Was Done

### 1. Created Assets Folder
- Created `assets/images/` directory structure
- Organized all image assets in one location

### 2. Logo Creation
- **File**: `assets/images/logo.svg`
- **Type**: SVG vector graphic
- **Design**: Palm tree icon + "Ceylon Cabs" text + "Explore Sri Lanka" tagline
- **Colors**: Ocean blue (#0891b2) and palm green (#059669)
- **Usage**: Navigation bar and footer

### 3. Copied Images
- **Hero Background**: `hero-background.png` - Beautiful Sri Lankan tea plantation landscape
- **Mini Car**: `mini-car.png` - White compact car for fleet section

### 4. Updated index.html
All image references updated to use the new assets folder:
- Logo in navigation: `assets/images/logo.svg`
- Hero background: `assets/images/hero-background.png`
- Mini car image: `assets/images/mini-car.png`
- Logo in footer: `assets/images/logo.svg`

## 🎨 Logo Details

The SVG logo includes:
- **Palm tree icon** with green leaves and brown trunk
- **"Ceylon Cabs"** text in ocean blue (Outfit font)
- **"Explore Sri Lanka"** subtitle in gray (Poppins font)
- **Transparent background** for flexibility
- **Scalable** - looks sharp at any size

## 📝 How to Replace the Logo

To replace with your own logo:

1. **Option 1: Replace SVG file**
   ```bash
   # Replace the existing logo.svg with your own
   cp /path/to/your/logo.svg assets/images/logo.svg
   ```

2. **Option 2: Use PNG/JPG**
   ```bash
   # Add your logo to assets folder
   cp /path/to/your/logo.png assets/images/logo.png
   
   # Update index.html (line 381 and 676)
   # Change: src="assets/images/logo.svg"
   # To: src="assets/images/logo.png"
   ```

3. **Recommended Logo Specs**:
   - **Format**: SVG (preferred) or PNG with transparent background
   - **Dimensions**: 200x60px or similar aspect ratio
   - **Colors**: Should match your brand (currently ocean blue & green)

## 🖼️ How to Replace Other Images

### Hero Background
```bash
# Replace with your own Sri Lanka landscape photo
cp /path/to/your/hero-image.jpg assets/images/hero-background.jpg

# Update index.html (line 24)
# Change: url('assets/images/hero-background.png')
# To: url('assets/images/hero-background.jpg')
```

### Vehicle Images
```bash
# Add more vehicle photos
cp /path/to/sedan.jpg assets/images/sedan.jpg
cp /path/to/minivan.jpg assets/images/minivan.jpg
cp /path/to/van.jpg assets/images/van.jpg

# Update index.html vehicle sections with new image paths
```

## 🎯 Benefits of Assets Folder

✅ **Organized**: All images in one place  
✅ **Easy to manage**: Simple to add/replace images  
✅ **Professional**: Standard web development practice  
✅ **Portable**: Easy to move or backup the entire project  
✅ **Scalable**: Easy to add more assets as needed  

## 📸 Current Assets

| File | Size | Usage |
|------|------|-------|
| `logo.svg` | 1 KB | Navigation & Footer |
| `hero-background.png` | 107 KB | Hero section background |
| `mini-car.png` | 32 KB | Fleet section - Mini Car |

## 🔄 Next Steps

You can now:
1. Replace `logo.svg` with your actual company logo
2. Add more vehicle photos to the assets folder
3. Add destination photos for the tour highlights section
4. Add gallery images for the gallery page

All images should be placed in `assets/images/` and referenced using relative paths like `assets/images/filename.ext`.

---

**Project Location**: `/Users/rasithabeywickrama/Documents/tours/`  
**Assets Location**: `/Users/rasithabeywickrama/Documents/tours/assets/images/`
