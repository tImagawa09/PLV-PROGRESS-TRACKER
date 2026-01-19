function LineController_handleEvent(e) {
  const json = JSON.parse(e.postData.contents);
  const event = json.events && json.events[0];
  if (!event || !event.message || !event.message.text) return;

  MessageRouter_route(event);
}
