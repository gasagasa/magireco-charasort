const tables = document.querySelectorAll('table');
const charactorsByTable = [...tables].map((table) => {
  const keys = [...table.querySelectorAll('tr:first-of-type th')].map((th) => th.textContent);
  const charactors = [...table.querySelectorAll('tr:not(:first-of-type)')].map((tr) => [...tr.querySelectorAll('th, td')].map((cell) => cell.textContent));
  return charactors.reduce((acc, cur) => {
    const temp = {};
    cur.forEach((attr, index) => {
      temp[keys[index]] = attr;
    });
    acc.push(temp);
    return acc;
  }, []);
});
const flattenCharactors = charactorsByTable.flatMap((chrGrp, index) => chrGrp.flatMap((chr) => {
  chr['グループ'] = index;
  return chr;
}));
console.log(JSON.stringify({ data: flattenCharactors }));
