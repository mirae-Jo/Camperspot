type Props = {
  hashTag: {
    id: string;
    post_id: string;
    tag: string;
  }[];
};

export default function CommHashTag({ hashTag }: Props) {
  return (
    <ul>
      {hashTag.map((tag) => {
        return <li key={tag.id}>#{tag.tag}</li>;
      })}
    </ul>
  );
}
