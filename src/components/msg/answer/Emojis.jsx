import { Emoji } from "emoji-picker-react";

const Emojis = ({ data = "", theme }) => {
  const smiles = data.split("");

  return (
    <div>
      {smiles.map((_e, i) => (
        <Emoji
          key={`e${i}`}
          unified={data.codePointAt(i).toString(16)}
          size={theme.smileSize.slice(0, -2)}
        />
      ))}
    </div>
  );
};

export default Emojis;
