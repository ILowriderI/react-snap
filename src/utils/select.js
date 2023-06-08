export const adaptArrayForSelect = (json) => {
  let optionsArr = [];
  json.forEach((element) => {
    optionsArr.push({ value: element.city, label: element.city });
  });
  return optionsArr;
};
