interface Props {
  number: string;
  label: string;
}

export default function SectionSeparator({ number, label }: Props) {
  return <div className="section-sep"><span>Addendo / {number} / {label}</span></div>;
}
