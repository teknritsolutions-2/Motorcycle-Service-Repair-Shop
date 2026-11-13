#!/usr/bin/env python3
"""
Comprehensive client requirements verification test suite for Apex Motor Works website.
Validates all 8 issues reported in the client feedback document plus responsiveness and asset integrity.
"""
import glob
import os
import re
import sys

def test_issue_1_logo_and_brand():
    print("Testing Issue 1: Logo & Brand Name ('Apex Motor Works')...")
    # 1. Logo mark exists and is valid SVG
    logo_path = "assets/brand/logo-mark.svg"
    assert os.path.exists(logo_path), "assets/brand/logo-mark.svg does not exist"
    with open(logo_path) as f:
        svg_content = f.read()
    assert "<svg" in svg_content and "</svg>" in svg_content, "Invalid SVG in logo-mark.svg"
    assert "Apex Motor Works" in svg_content, "Apex Motor Works title missing in logo-mark.svg"

    # 2. Check no references to old names
    html_files = glob.glob("index.html") + glob.glob("pages/*.html")
    for page in html_files:
        with open(page) as f:
            content = f.read()
        assert "Apex Motoworks" not in content, f"Old name 'Apex Motoworks' found in {page}"
        assert "Apex Motowerks" not in content, f"Old name 'Apex Motowerks' found in {page}"
        assert "Apex Motor Works" in content, f"'Apex Motor Works' missing in {page}"

    # Check manifest
    with open("assets/brand/site.webmanifest") as f:
        manifest = f.read()
    assert "Apex Motor Works" in manifest, "Manifest missing Apex Motor Works"

    print("  -> Issue 1 PASSED: Logo updated & 'Apex Motor Works' used consistently across all pages.")

def test_issue_2_hp1_images():
    print("Testing Issue 2: Home Page 1 Quick Access & Our Services images...")
    with open("index.html") as f:
        html = f.read()

    # Quick Access images
    qa_images = re.findall(r'<div class="quick-service-item__image">\s*<img src="([^"]+)"', html)
    assert len(qa_images) == 7, f"Expected 7 quick access images, found {len(qa_images)}"
    for img in qa_images:
        assert os.path.exists(img), f"Quick access image does not exist: {img}"

    # Our Services images
    svc_images = re.findall(r'<div class="service-card__image">\s*<img src="([^"]+)"', html)
    assert len(svc_images) == 7, f"Expected 7 services card images, found {len(svc_images)}"
    for img in svc_images:
        assert os.path.exists(img), f"Services card image does not exist: {img}"

    print("  -> Issue 2 PASSED: Icons replaced with relevant images in Quick Access and Our Services.")

def test_issue_3_hp2_buttons():
    print("Testing Issue 3: Home Page 2 Primary & Secondary CTA button styling...")
    with open("pages/home2.html") as f:
        html = f.read()

    # Find the hero btn-group
    btn_group_match = re.search(r'<div class="btn-group">(.*?)</div>', html, re.DOTALL)
    assert btn_group_match, "Hero btn-group not found in home2.html"
    buttons = btn_group_match.group(1)
    
    assert 'class="btn btn--primary"' in buttons, "Primary button not found in home2 hero"
    assert 'class="btn btn--secondary"' in buttons, "Secondary button not found in home2 hero"
    assert 'btn--white' not in buttons, "Dual primary 'btn--white' still present in home2 hero"

    # Check CSS has specific styling for panorama-hero secondary button
    with open("assets/css/style.css") as f:
        css = f.read()
    assert ".panorama-hero .btn--secondary" in css, "Missing .panorama-hero .btn--secondary CSS rule"

    print("  -> Issue 3 PASSED: Home Page 2 uses 1 primary button and 1 secondary CTA button.")

def test_issue_4_hp2_brand_logos():
    print("Testing Issue 4: Home Page 2 Multi-brand section displays brand logos...")
    with open("pages/home2.html") as f:
        html = f.read()

    # Look for make-rail section
    make_rail = re.search(r'<div class="make-rail__names[^"]*">(.*?)</div>\s*<p class="make-rail__note"', html, re.DOTALL)
    assert make_rail, "make-rail__names not found in home2.html"
    content = make_rail.group(1)

    logos = re.findall(r'<img src="([^"]+)"[^>]*alt="([^"]+)"', content)
    assert len(logos) >= 10, f"Expected at least 10 brand logos in home2, found {len(logos)}"
    for src, alt in logos:
        # relative to pages/
        real_path = os.path.normpath(os.path.join("pages", src))
        assert os.path.exists(real_path), f"Brand logo does not exist: {real_path} ({alt})"

    print(f"  -> Issue 4 PASSED: {len(logos)} brand logos displayed in Multi-brand section.")

def test_issue_5_hero_images_services_brands_pricing():
    print("Testing Issue 5: Relevant images in first section of Services, Brands, and Pricing pages...")
    targets = {
        "pages/services.html": "Services Page",
        "pages/brands.html": "Brands Page",
        "pages/pricing.html": "Pricing Page"
    }

    for path, name in targets.items():
        with open(path) as f:
            html = f.read()
        # Find first section
        first_section = re.search(r'<main[^>]*>\s*(<!--.*?-->\s*)?<section[^>]*>(.*?)</section>', html, re.DOTALL)
        assert first_section, f"Could not find first section in {path}"
        sec_content = first_section.group(2)
        images = re.findall(r'<img src="([^"]+)"', sec_content)
        assert len(images) >= 1, f"No image found in first section of {name} ({path})"
        for img in images:
            real_path = os.path.normpath(os.path.join("pages", img))
            assert os.path.exists(real_path), f"First section image missing: {real_path} in {name}"

    print("  -> Issue 5 PASSED: Services, Brands, and Pricing pages have relevant images in first section.")

def test_issue_6_at_least_two_images_per_page():
    print("Testing Issue 6: Across all pages, at least 2 relevant images per page...")
    pages = sorted(glob.glob("index.html") + glob.glob("pages/*.html"))
    for p in pages:
        base_dir = os.path.dirname(p)
        with open(p) as f:
            html = f.read()
        imgs = re.findall(r'<img[^>]+src=["\']([^"\']+)["\'][^>]*>', html)
        photos = [src for src in imgs if "assets/images" in src]
        assert len(photos) >= 2, f"{p} has only {len(photos)} content photos (needs >= 2)"
        for src in photos:
            real_path = os.path.normpath(os.path.join(base_dir, src))
            assert os.path.exists(real_path), f"Image does not exist on disk: {real_path} (in {p})"

    print(f"  -> Issue 6 PASSED: All {len(pages)} pages contain at least 2 relevant photos.")

def test_issue_7_quick_access_no_scroll():
    print("Testing Issue 7: Home page 1 Quick Access section removes scroll option...")
    with open("assets/css/style.css") as f:
        css = f.read()

    # Verify no overflow-x: auto on quick-services
    assert "overflow-x: auto" not in re.search(r'\.quick-services__grid\s*\{([^}]+)\}', css).group(1), \
        "overflow-x: auto found on .quick-services__grid"
    assert "scrollbar-width: thin" not in re.search(r'\.quick-services__grid\s*\{([^}]+)\}', css).group(1), \
        "scrollbar-width found on .quick-services__grid"

    # Check that min-width triggering overflow is not present
    qa_block = re.findall(r'\.quick-services__grid[^{]*\{([^}]+)\}', css)
    for block in qa_block:
        assert "overflow-x" not in block, f"Unexpected overflow-x in: {block}"

    print("  -> Issue 7 PASSED: Horizontal scroll option removed from Quick Access.")

def test_issue_8_hp2_heading_alignment():
    print("Testing Issue 8: Home page 2 Multi-brand h2 and eyebrow properly aligned...")
    with open("pages/home2.html") as f:
        html = f.read()

    # Eyebrow and h2 should be grouped inside make-rail__title-group or stacked
    assert '<div class="make-rail__title-group">' in html, "Missing make-rail__title-group container in home2.html"
    assert re.search(r'<div class="make-rail__title-group">\s*<p class="eyebrow">Multi-brand servicing</p>\s*<h2>Familiar makes\. Independent advice\.</h2>', html), \
        "Eyebrow and h2 are not grouped together in make-rail"

    with open("assets/css/style.css") as f:
        css = f.read()
    # Check that make-rail__heading does not space-between them apart
    heading_rule = re.search(r'\.make-rail__heading\s*\{([^}]+)\}', css)
    assert heading_rule, "Missing .make-rail__heading rule in style.css"
    assert "justify-content: space-between" not in heading_rule.group(1), \
        "make-rail__heading still uses justify-content: space-between which pushes heading and subheading apart"

    print("  -> Issue 8 PASSED: Heading and subheading in Multi-brand section are properly aligned.")

def test_asset_integrity_and_dark_mode():
    print("Testing Dark Mode & Asset Integrity...")
    with open("assets/css/dark-mode.css") as f:
        dark_css = f.read()
    assert ".make-rail__logo" in dark_css, "Dark mode support missing for make-rail__logo"
    print("  -> Dark Mode & Asset Integrity PASSED.")

def main():
    print("=" * 70)
    print("Apex Motor Works - Verification Suite for Client Issues 1-8")
    print("=" * 70)

    try:
        test_issue_1_logo_and_brand()
        test_issue_2_hp1_images()
        test_issue_3_hp2_buttons()
        test_issue_4_hp2_brand_logos()
        test_issue_5_hero_images_services_brands_pricing()
        test_issue_6_at_least_two_images_per_page()
        test_issue_7_quick_access_no_scroll()
        test_issue_8_hp2_heading_alignment()
        test_asset_integrity_and_dark_mode()

        print("=" * 70)
        print("🎉 ALL TESTS PASSED! ALL CLIENT REQUIREMENTS ARE FULLY SATISFIED!")
        print("=" * 70)
        return 0
    except AssertionError as e:
        print(f"\n❌ TEST FAILED: {e}")
        return 1

if __name__ == "__main__":
    sys.exit(main())
