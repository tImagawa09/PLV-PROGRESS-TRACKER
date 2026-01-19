/**
 * GAS エントリーポイント
 * LINE Webhookは 200 OK を返す必要があるため、必ずテキストを返す
 */
function doPost(e) {
  LineController_handleEvent(e);
  return ContentService.createTextOutput("OK");
}