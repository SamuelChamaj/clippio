/**
 * Clippio – fotky z Google Drive (live)
 *
 * ?source=home      → hlavná stránka (galéria)
 * ?source=portfolio → /portfolio/fotenie (fotografie)
 * ?source=video     → /portfolio/natacanie-videi
 *
 * Deploy: Web app → Me → Anyone
 * Po úprave: Manage deployments → Edit → New version
 */

var HOME_FOLDERS = [
  { id: '1fHtT6P9_YekZPNE89sCCxIOCo0xqJrs4', category: 'home' }
];

var PORTFOLIO_FOLDERS = [
  { id: '1fHtT6P9_YekZPNE89sCCxIOCo0xqJrs4', category: 'galeria' }
];

var VIDEO_FOLDERS = [
  { id: '1WHV9yLnWAbPvmB_w8Y58e6vrB_2BmtYJ', category: 'video' }
];

function doGet(e) {
  try {
    var source = 'portfolio';
    try {
      if (e && e.parameter && e.parameter.source) {
        source = String(e.parameter.source).toLowerCase();
      }
    } catch (ignore) {}

    var folders = PORTFOLIO_FOLDERS;
    if (source === 'home') folders = HOME_FOLDERS;
    else if (source === 'video') folders = VIDEO_FOLDERS;

    var items = [];
    var seen = {};

    folders.forEach(function (folderConfig) {
      var folder;
      try {
        folder = DriveApp.getFolderById(folderConfig.id);
      } catch (err) {
        return;
      }

      var files = folder.getFiles();
      while (files.hasNext()) {
        var file = files.next();
        var id = file.getId();
        if (seen[id]) continue;

        var mime = String(file.getMimeType() || '');
        if (mime.indexOf('image/') !== 0) continue;

        seen[id] = true;
        var name = file.getName() || 'Fotka';
        var title = name.replace(/\.[^.]+$/, '');

        items.push({
          title: title,
          type: 'image',
          category: folderConfig.category,
          id: id,
          modified: file.getLastUpdated() ? file.getLastUpdated().toISOString() : '',
          image: 'https://lh3.googleusercontent.com/d/' + id + '=w1600'
        });
      }
    });

    items.sort(function (a, b) {
      return String(b.modified).localeCompare(String(a.modified));
    });

    var sourceLabel = 'google-drive-portfolio';
    if (source === 'home') sourceLabel = 'google-drive-home';
    else if (source === 'video') sourceLabel = 'google-drive-video';

    return ContentService
      .createTextOutput(JSON.stringify({
        items: items,
        source: sourceLabel,
        count: items.length
      }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({
        items: [],
        error: String(error && error.message ? error.message : error)
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
