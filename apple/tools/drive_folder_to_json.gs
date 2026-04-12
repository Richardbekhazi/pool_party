/**
 * Export JSON for all images in a Drive folder.
 * 1. Open script.google.com and create a project.
 * 2. Paste this code. Replace FOLDER_ID.
 * 3. Run function exportFolder(). Approve the permissions.
 * 4. Copy the JSON from the Logs and paste into data/pictures.json
 */
function exportFolder() {
  const FOLDER_ID = '1Y_hE1P2rZa8bslTqSFk1eSrRBOKDW6rR'; // your folder
  const folder = DriveApp.getFolderById(FOLDER_ID);
  const files = folder.getFiles();
  const results = [];
  let i = 1;
  while (files.hasNext()) {
    const f = files.next();
    const mime = f.getMimeType();
    if (!mime.startsWith('image/')) continue; // pictures only
    results.push({
      id: f.getId(),
      title: f.getName() || `Photo ${i++}`
    });
  }
  // sort by name to keep your numeric order if names have numbers
  results.sort((a,b) => a.title.localeCompare(b.title, 'en', {numeric:true, sensitivity:'base'}));
  const json = JSON.stringify(results, null, 2);
  Logger.log(json);
}
