
function correctTitle(title, prefix, knownPrefixes) {

   if (knownPrefixes) {
     knownPrefixes.forEach(p => {
        if (title.startsWith(p)) {
           title = title.slice(p.length).trimStart();
        }
     });
   }
   return prefix + " " + title;
}

function parsePrefixMapping(input) {
   const retVal = {};
   input.split("\n").forEach( item => {
       const pieces = item.split("=");
       retVal[pieces[0]] = pieces[1];
   });
   return retVal;
}

function extractKnownPrefixes(mappings) {
  return Object.keys(mappings).map(function(key){
      return mappings[key];
  });
}

module.exports = { correctTitle, parsePrefixMapping, extractKnownPrefixes };
