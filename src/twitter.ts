import URLFetchRequestOptions = GoogleAppsScript.URL_Fetch.URLFetchRequestOptions;

function getTwitterFollowers(accoutName: string): number {
  const url: string = `https://mobile.twitter.com/${accoutName}`;
  const postheader: Object = {
    timeout: "50000",
  };
  const parameters: URLFetchRequestOptions = {
    headers: postheader,
    method: "get",
    muteHttpExceptions: true,
  };
  let html: string = UrlFetchApp.fetch(url, parameters).getContentText("UTF-8");
  // curlで取得したHTMLの中から文字列を取得。その文字列をChrome Dev toolsでこねこねして考えた正規表現。
  const counts = html.match(
    /\/followers\">[<>\w\s=/"]*statnum\">([\d,]+)<\/div>/
  );
  if (counts === null) {
    Logger.log("cannot parse twitter follower");
    return -1;
  } else if (counts.length < 2) {
    Logger.log("unexpected parse result on twitter %s", counts);
    return -1;
  }
  return Number(counts[1].replace(/,/g, ""));
}
