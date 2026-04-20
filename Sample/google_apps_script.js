// ============================================================
// BLACKBUCKS QUIZ — GOOGLE APPS SCRIPT (Lead Collector)
// ============================================================
// GOOGLE SHEET HEADERS (Row 1) — paste exactly:
//
// Timestamp | Name | Phone | College | Qualification | City | Score | Result Type |
// Q1: Programming | Q2: Math | Q3: Project | Q4: Career Fear |
// Q5: Domain | Q6: Study Hours | Q7: ML Knowledge |
// Q8: Program Priority | Q9: Salary Goal
// ============================================================

function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = JSON.parse(e.postData.contents);

    sheet.appendRow([
      data.timestamp        || new Date().toLocaleString(),
      data.name             || '',
      data.phone            || '',
      data.college          || '',
      data.qualification    || '',
      data.city             || '',
      data.score            || '',
      data.resultType       || '',
      // Individual quiz answers
      data.q1               || '',   // Which programming language heard of?
      data.q2               || '',   // Math comfort level
      data.q3               || '',   // Built any project?
      data.q4               || '',   // Biggest career fear
      data.q5               || '',   // Domain interest
      data.q6               || '',   // Study hours per week
      data.q7               || '',   // Heard of ML?
      data.q8               || '',   // What matters most in a program?
      data.q9               || ''    // Expected first salary goal
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ status: 'success' }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch(err) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'error', message: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService
    .createTextOutput('Blackbucks Quiz Lead Collector is running.')
    .setMimeType(ContentService.MimeType.TEXT);
}
