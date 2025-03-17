import { helper } from '@ember/component/helper';
import { capitalize as emberCapitalize } from '@ember/string';
//we import as emberCapitalize to avoid clashing with ember's capitalize export

//splitting all words in title on whitespace
//capitalizing first word of each word
//rejoining all word and separating by one whitespace
export function capitalize(input) {
  let words = input[0].split(/\s+/).map((word) => {
    return emberCapitalize(word.charAt(0)) + word.slice(1);
  });
  return words.join(' ');
}

export default helper(capitalize);
