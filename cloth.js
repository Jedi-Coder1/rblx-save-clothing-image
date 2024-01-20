console.log("Save Clothing Image Injected Into Roblox")
// Functions
function ParseXML(data) {
    var parser = new DOMParser();
    var xmlDoc = parser.parseFromString(data, "text/xml");
    var roblox = xmlDoc.getElementsByTagName("roblox")[0]
    var Item = roblox.getElementsByTagName("Item")[0]
    var Properties = Item.getElementsByTagName("Properties")[0]
    var Content = Properties.getElementsByTagName("Content")[0]
    var url = Content.getElementsByTagName("url")[0]
    return String(url.childNodes[0].nodeValue)
}
async function getAssetJson(url) {
    // Json Response
    const JSONresponse = await fetch(url)
    var JSONdata = await JSONresponse.json()
    var JsonLocation = JSONdata["location"]
    // console.log(JsonLocation)
    // XML Response
    const XMLresponse = await fetch(JsonLocation)
    var XMLdata = await XMLresponse.text()
    // Parse XML
    var parXML = ParseXML(XMLdata)
    var assetId = parXML.split("?id=").pop()
    var libraryUrl = "https://www.roblox.com/library/" + assetId
    console.log(libraryUrl)
}
// Getting Asset ID
var step1 = window.location.href.split('catalog/').pop()
if (step1) {
    // Can Continue
    var assetLocation = step1.split("/")[0]
    if (!isNaN(assetLocation)) { getAssetJson("https://assetdelivery.roblox.com/v1/assetId/" + assetLocation)
    } else { console.log("Not On Catalog Item") }
}