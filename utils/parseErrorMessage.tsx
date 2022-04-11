export const parseErrorMessage = (message: string) => {
  // Look for telephone number regex in error message and replace with anchor tag
  // [+1-888-561-4748|tel:+18885614748]
  const telephoneRegex = /\[\+\d-\d{3}-\d{3}-\d{4}\|tel:\+\d{11}]/;

  // Get strings that match telephoneRegex
  const matches = message.match(telephoneRegex);
  if (!matches) return message;

  // Get strings around the telephoneRegex matches
  const splitMessages = message.split(telephoneRegex);

  // Map telephoneRegex matches to anchor tags
  const links = matches.map((match: string, i: number) => {
    const text = match.slice(1, 16);
    const href = match.slice(22, 33);
    const key = `${i}#${text}`;

    return (
      <a key={key} href={`tel:${href}`}>
        {text}
      </a>
    );
  });

  // Splice back together
  const joined: (string | JSX.Element)[] = [];
  splitMessages.forEach((str: string, i: number) => {
    joined.push(str);
    if (i < links.length) joined.push(links[i]); // length of `links` will be one less than `splitMessages`
  });

  return <>{joined}</>;
};
