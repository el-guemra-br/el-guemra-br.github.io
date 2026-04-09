# SEO Audit Issues (Organized)

Source: [e.txt](e.txt)

## 1. Non-canonical pages in XML sitemap

### Issue description
Non-canonical pages have been found in the XML sitemap file. All pages listed in the sitemap should be suggested as canonicals for search engines.

### How to fix
- Make sure your XML sitemap only contains canonical URLs.

### Notes
- Available by subscription.

## 2. WWW and non-WWW duplicate access (redirect consistency)

### Issue description
This check analyzes to see if you have set up a www to non-www redirect and vice versa on your website. Having your website load with and without www can lead to duplicate content issues.

### How to fix
- If necessary, redirect all non-www URLs on your website to www.

## 3. H1 tag missing

### Issue description
The `<h1>` tag is the top-level page heading, which is the most important `<h>` tag. People usually see the `<h1>` tag as the title of the text, and search engines use it to understand what the page is about. Keep in mind that from the SEO perspective, the `<h1>` tag is the second most important tag after the `<title>` tag.

### How to fix
- Make sure all of your web pages have a unique `<h1>` header tag.
- Depending on the website type and page structure, there may be more than one `<h1>` tag, but it is highly recommended to use only one `<h1>` tag per page.
- Keep your page heading structure logical.

## 4. Multiple H1 tags

### Issue description
Technically, you can use multiple `<h1>` tags on a page, and Google will consider both tags. But if the structure of the page allows you to use a single `<h1>` tag, it is strongly recommended to do so.

### How to fix
- If possible, use a single `<h1>` tag on a page.
- Keep heading structure clear for search engines.

## 5. Image too big

### Issue description
This issue is triggered when image file sizes exceed the allowed limit. Since images are often the heaviest page elements, large files can negatively affect page load speed. The maximum allowed size is 1 MB per image.

### How to fix
- Check whether the images in the report can be optimized.
- Reduce image size without noticeable quality loss.

### Notes
- Available by subscription.

## 6. Untitled issue in source file (internal orphan pages)

### Issue description
Some pages of the website do not have any internal links pointing to them.
Search engines can only find and index such pages if they are indicated in the XML sitemap or via external links.
Your website visitors cannot access such pages from other pages of the site.

### How to fix
- Check internal linking and ensure visitors and search robots can access every important page.

### Notes
- The source text does not include an explicit issue title for this section.

## 7. One inbound internal link

### Issue description
Some pages of your website have only one internal link pointing to them.
Internal links increase the importance of the page from the perspective of search engines.

### How to fix
- Ensure important pages have at least a couple of internal links.
- Keep internal links as link-juice passing links (avoid unnecessary `rel="nofollow"`).

## 8. Internal links missing anchor

### Issue description
Some internal links on your website have an empty or naked anchor (i.e., anchor that uses a raw URL), or the anchor text only contains symbols. When clicking on links without anchors, it may be difficult for both website visitors and search engines to understand what to expect to see on the page that you link to.

### How to fix
- Review links in the report.
- Add meaningful anchor texts or descriptive in-copy text around links.
- Use concise phrasing in anchor texts.

## 9. External links to 3XX

### Issue description
Some pages that you link to from your website redirect visitors to a different page. Perhaps the redirect was set up after you created the link, and now the link may lead visitors to another page that does not contain the information they need.

### How to fix
- Review every external 3XX link.
- If the redirected page is correct, replace old URLs with final destination URLs.
- If the required information is no longer available, replace or remove the link.

## 10. External links to 4XX

### Issue description
Some external links on your site lead to pages with a 4XX response code. Such links are often referred to as broken links. Broken links send website visitors to unavailable resources and have a negative impact on overall quality of the site.

### How to fix
- Remove or replace all broken external links.
- Ensure external links resolve to `200 OK` pages.

## 11. External links missing anchor

### Issue description
Some external links on your website have an empty or naked anchor (i.e., anchor that uses a raw URL), or the anchor text only contains symbols. When clicking on links without anchors, it may be difficult for both website visitors and search engines to understand what to expect to see on the page that you link to.

### How to fix
- Review links in the report.
- Add meaningful anchor texts or descriptive in-copy text around links.
- Keep anchor texts concise and clear.

### Notes
- Available by subscription.

## 12. Favicon missing

### Issue description
Your website does not have a favicon, which is an icon that represents your website and is displayed before the page name in browser tabs, bookmarks, and search results. Without a favicon, it is harder for people to distinguish your site from other open tabs.

### How to fix
- Add a favicon to your website.

## 13. X (ex-Twitter) Card tag missing

### Issue description
Some pages of your website do not have the X Card tag. Without this tag, page title, description, image, and similar metadata may not display as expected in X posts. X may fall back to Open Graph tags when available.

### How to fix
- Add X Card tags to pages you share on X.
- Use absolute URLs with `http://` or `https://` in X card metadata.

## Quick Priority Checklist

- [ ] Keep only canonical URLs in [sitemap.xml](sitemap.xml).
- [ ] Enforce one hostname format (`www` or `non-www`) via redirect.
- [ ] Ensure exactly one clear `<h1>` on each page.
- [ ] Compress large images to under 1 MB where possible.
- [ ] Fix orphan pages and add internal links to key pages.
- [ ] Replace broken or redirected external links with final valid URLs.
- [ ] Add descriptive anchor text to internal and external links.
- [ ] Add favicon assets and `<link rel="icon">` markup.
- [ ] Add X Card meta tags (with absolute URLs) to shareable pages.
