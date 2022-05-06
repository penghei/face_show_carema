import "./FeatureCard.scss";

export default function FeatureCard(params) {
  return (
    <a className="feature-card" href={params.cardItem.href}>
      <span className={`feature-icon iconfont ${params.cardItem.icon}`}></span>
      <h3 className="feature-name">{params.cardItem.name}</h3>
      <p className="feature-description">{params.cardItem.description}</p>
    </a>
  );
}
