import type { ResourceLink } from "@/lib/data/stages";

export function StepResources({ links }: { links: ResourceLink[] }) {
  if (links.length === 0) return null;

  return (
    <div className="step-resources">
      <p className="step-resources-label">本步资料</p>
      <ul>
        {links.map((link) => (
          <li key={`${link.href}-${link.title}`}>
            <div className="step-resource-head">
              <a href={link.href} target="_blank" rel="noreferrer">
                {link.title}
              </a>
              <span className="resource-tag">{link.tag}</span>
            </div>
            {link.detail ? <p>{link.detail}</p> : null}
          </li>
        ))}
      </ul>
    </div>
  );
}
