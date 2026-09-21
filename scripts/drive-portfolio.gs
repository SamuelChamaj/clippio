/**
 * Clippio – fotky z 2 Drive priečinkov (live)
 * Deploy: Web app → Execute as: Me → Who has access: Anyone
 * Po úprave: Manage deployments → Edit → New version
 */

var FOLDERS = [
  { id: '1VEKAMonI08t7Yo_fKRAgoce0XF49qAh0', category: 'grafika' },
  { id: '1WHV9yLnWAbPvmB_w8Y58e6vrB_2BmtYJ', category: 'foto' }
];

function doGet() {
  try {
    var items = [];
    var seen = {};

    FOLDERS.forEach(function (folderConfig) {
      var folder;
      try {
        folder = DriveApp.getFolderById(folderConfig.id);
      } catch (e) {
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
          image: 'https://drive.google.com/thumbnail?id=' + id + '&sz=w1600'
        });
      }
    });

    items.sort(function (a, b) {
      return String(b.modified).localeCompare(String(a.modified));
    });

    return ContentService
      .createTextOutput(JSON.stringify({
        items: items,
        source: 'google-drive',
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
