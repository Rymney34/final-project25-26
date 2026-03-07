

import "./splitVisualSection.css";

const SplitVisualSection = ({ sections = [],styles,  }) => {
  console.log(sections)
  return (
    <section className="split-section">
      {sections.map((section, index) => {
        const isReversed = section.imagePosition === "left";

        return (
          <div
            key={index}
            className={`split-row ${isReversed ? "reverse" : ""}`}
          >
            <div className="split-text">
              <h2>{section.title}</h2>

              {section.paragraphs.map((text, i) => (
                <p key={i}>{text}</p>
              ))}

              
            </div>

            <div
              className={`split-image ${
                isReversed ? "split-image-bottom" : "split-image-top"
              }`}
            >
              
              <img className="imageSection" tabindex="0" style={styles} src={section.image} alt={section.title} />
            </div>
          </div>
        );
      })}
    </section>
  );
};

export default SplitVisualSection;

