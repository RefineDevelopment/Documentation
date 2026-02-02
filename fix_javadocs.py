import os
import re

ROOT_DIR = r"c:\Users\ddeni\Desktop\Refine\RefineDocumentation\static\carbon\javadocs"
WEB_ROOT = "/carbon/javadocs"

def resolve_link(base_url, relative_link):
    if relative_link.startswith(('/', 'http:', 'https:', '#', 'javascript:', 'mailto:')):
        return relative_link
    
    # Simple resolution for .. 
    parts = base_url.strip('/').split('/')
    link_parts = relative_link.split('/')
    
    for part in link_parts:
        if part == '..':
            if parts:
                parts.pop()
        elif part == '.':
            continue
        else:
            parts.append(part)
            
    return '/' + '/'.join(parts)

def process_file(file_path):
    rel_path = os.path.relpath(file_path, ROOT_DIR)
    # Convert windows path to web path
    web_dir = os.path.dirname(rel_path).replace('\\', '/')
    base_url = f"{WEB_ROOT}/{web_dir}".replace('//', '/')
    
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
        
    # Regex to find hrefs and srcs
    # Catching: href="...", src="..."
    # Only for relative paths
    
    def replacer(match):
        attr = match.group(1) # href or src
        original_link = match.group(2)
        
        if original_link.startswith(('http', '/', '#', 'javascript:', 'mailto:')):
            return match.group(0)
            
        # We only want to resolve files that look like assets or html
        # (.html, .css, .js, .png, .gif, .svg, .ico)
        if not any(original_link.lower().endswith(ext) for ext in ['.html', '.css', '.js', '.png', '.gif', '.svg', '.ico']):
            # If it's a directory link or something else, still try to resolve it if it contains / or ..
            if not ('/' in original_link or '..' in original_link):
                return match.group(0)

        resolved = resolve_link(base_url, original_link)
        return f'{attr}="{resolved}"'

    # Catch href="..." and src="..."
    new_content = re.sub(r'(href|src)="([^"]+?)"', replacer, content)
    
    if new_content != content:
        print(f"Fixed: {rel_path}")
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(new_content)

def main():
    print(f"Scanning {ROOT_DIR}...")
    for root, dirs, files in os.walk(ROOT_DIR):
        for file in files:
            if file.endswith(".html"):
                process_file(os.path.join(root, file))
    print("Done.")

if __name__ == "__main__":
    main()
